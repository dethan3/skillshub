#!/usr/bin/env tsx

/**
 * Bulk Skill Sync Script
 *
 * Crawls GitHub for repos containing SKILL.md files and generates
 * an updated src/data/skills.ts with discovered skills.
 *
 * Usage:
 *   pnpm sync-skills              # Full sync
 *   pnpm sync-skills --dry-run    # Preview without writing
 *   pnpm sync-skills --limit 50   # Cap at 50 repos
 *
 * Requires GITHUB_TOKEN in .env or env var for higher rate limits.
 */

import "./lib/env.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { getGithubToken } from "./lib/env.js";
import {
  fetchGitHubFile,
  fetchRepoInfo,
  listDirectory,
  searchCode,
  searchRepos,
  fetchStarredRepos,
  fetchRepoStats,
  sleep,
  type SearchResult,
} from "./lib/github.js";

interface KolSource {
  name: string;
  github: string;
  twitter?: string;
  repos: string[];
  note: string;
  autoStarred?: boolean;
}
import {
  parseSkillMd,
  parseShellSkill,
  parseJsonSkill,
  parseReadme,
  detectCategory,
  detectPlatforms,
  extractTags,
  generateId,
  formatSkillAsTS,
  type SkillData,
} from "./lib/skill-parser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Curated seed repos to guarantee baseline coverage
const SEED_REPOS: SearchResult[] = [
  // anthropics/skills sub-skills
  { owner: "anthropics", repo: "skills", path: "skills/pdf" },
  { owner: "anthropics", repo: "skills", path: "skills/docx" },
  { owner: "anthropics", repo: "skills", path: "skills/xlsx" },
  { owner: "anthropics", repo: "skills", path: "skills/pptx" },
  { owner: "anthropics", repo: "skills", path: "skills/frontend-design" },
  { owner: "anthropics", repo: "skills", path: "skills/mcp-builder" },
  { owner: "anthropics", repo: "skills", path: "skills/skill-creator" },
  { owner: "anthropics", repo: "skills", path: "skills/webapp-testing" },
  { owner: "anthropics", repo: "skills", path: "skills/algorithmic-art" },
  { owner: "anthropics", repo: "skills", path: "skills/canvas-design" },
  { owner: "anthropics", repo: "skills", path: "skills/brand-guidelines" },
  { owner: "anthropics", repo: "skills", path: "skills/theme-factory" },
  { owner: "anthropics", repo: "skills", path: "skills/doc-coauthoring" },
  { owner: "anthropics", repo: "skills", path: "skills/internal-comms" },
  { owner: "anthropics", repo: "skills", path: "skills/slack-gif-creator" },
  { owner: "anthropics", repo: "skills", path: "skills/web-artifacts-builder" },
  // Known community skill repos (from awesome-claude-skills)
  { owner: "obra", repo: "superpowers", path: "" },
  { owner: "obra", repo: "superpowers-lab", path: "" },
  { owner: "yusufkaraaslan", repo: "Skill_Seekers", path: "" },
  { owner: "conorluddy", repo: "ios-simulator-skill", path: "" },
  { owner: "jthack", repo: "ffuf_claude_skill", path: "" },
  { owner: "lackeyjb", repo: "playwright-skill", path: "" },
  { owner: "chrisvoncsefalvay", repo: "claude-d3js-skill", path: "" },
  { owner: "K-Dense-AI", repo: "claude-scientific-skills", path: "" },
  { owner: "alonw0", repo: "web-asset-generator", path: "" },
  { owner: "asklokesh", repo: "claudeskill-loki-mode", path: "" },
  { owner: "trailofbits", repo: "skills", path: "" },
  { owner: "zarazhangrui", repo: "frontend-slides", path: "" },
  { owner: "expo", repo: "skills", path: "" },
  { owner: "gsd-build", repo: "get-shit-done", path: "" },
  { owner: "anthropics", repo: "claude-cookbooks", path: "skills" },
  // MCP servers (many double as skills)
  { owner: "modelcontextprotocol", repo: "servers", path: "" },
  { owner: "punkpeye", repo: "awesome-mcp-servers", path: "" },
];

// Build a map of repo -> KOL IDs who recommended it
const kolRepoMap = new Map<string, string[]>();

function loadKolSources(): KolSource[] {
  const kolPath = path.join(__dirname, "kol-sources.json");
  if (!fs.existsSync(kolPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(kolPath, "utf-8"));
  } catch {
    return [];
  }
}

// Discover repos from KOL sources
async function discoverKolSkills(
  kolSources: KolSource[],
  token?: string
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  for (const kol of kolSources) {
    const kolId = kol.github.toLowerCase();

    // Add manually specified repos
    for (const repoPath of kol.repos) {
      const [owner, repo] = repoPath.split("/");
      if (owner && repo) {
        results.push({ owner, repo, path: "" });
        const key = `${owner}/${repo}`;
        const existing = kolRepoMap.get(key) || [];
        if (!existing.includes(kolId)) {
          existing.push(kolId);
          kolRepoMap.set(key, existing);
        }
      }
    }

    // Auto-fetch starred repos
    if (kol.autoStarred) {
      console.log(`  ⭐ Fetching starred repos for ${kol.name} (@${kol.github})...`);
      const starred = await fetchStarredRepos(kol.github, token);
      const skillKeywords = /skill|claude|agent|mcp|prompt|llm|gpt|openai|anthropic/;

      for (const repo of starred) {
        if (skillKeywords.test(repo.repo.toLowerCase())) {
          results.push(repo);
          const key = `${repo.owner}/${repo.repo}`;
          const existing = kolRepoMap.get(key) || [];
          if (!existing.includes(kolId)) {
            existing.push(kolId);
            kolRepoMap.set(key, existing);
          }
        }
      }
      await sleep(2000);
    }
  }

  return results;
}

// Discover repos with skill-related files
async function discoverSkills(token?: string): Promise<SearchResult[]> {
  const discovered = new Map<string, SearchResult>();

  // Add seed repos first
  for (const seed of SEED_REPOS) {
    const key = `${seed.owner}/${seed.repo}/${seed.path}`;
    discovered.set(key, seed);
  }

  console.log(`  Seed repos: ${SEED_REPOS.length}`);

  // Targeted code search queries — more specific to find actual skills
  const codeQueries = [
    "filename:SKILL.md name: description:",
    "filename:SKILL.md frontmatter",
    "filename:CLAUDE.md path:.claude",
    "filename:CLAUDE.md skills",
  ];

  for (const query of codeQueries) {
    console.log(`  Searching code: "${query}"`);
    const { items, total } = await searchCode(query, token, 1, 100);
    console.log(`    Found ${total} results, processing ${items.length}`);

    for (const item of items) {
      const key = `${item.owner}/${item.repo}/${item.path}`;
      if (!discovered.has(key)) {
        discovered.set(key, item);
      }
    }

    await sleep(3000);
  }

  // Search for repos by topic/name — higher quality results
  const repoQueries = [
    "claude-skill in:name,description",
    "claude skill in:name",
    "agent-skill in:name,description",
    "SKILL.md in:readme",
    "awesome claude skills",
    "claude code skills",
  ];

  for (const query of repoQueries) {
    console.log(`  Searching repos: "${query}"`);
    const { items } = await searchRepos(query, token, 1, 50);
    for (const item of items) {
      const key = `${item.owner}/${item.repo}/`;
      if (!discovered.has(key)) {
        discovered.set(key, item);
      }
    }
    await sleep(3000);
  }

  return Array.from(discovered.values());
}

// Parse a single repo into a SkillData
async function parseRepo(
  result: SearchResult,
  token?: string
): Promise<SkillData | null> {
  const { owner, repo, path: subPath } = result;
  const basePath = subPath || "";

  const repoInfo = await fetchRepoInfo(owner, repo, token);
  if (!repoInfo) return null;

  // Skip forks
  if (repoInfo.fork) return null;

  // Skip repos with 0 stars unless they have a skill-related description
  const stars = repoInfo.stargazers_count || 0;
  const desc = (repoInfo.description || "").toLowerCase();
  const isSkillRelated = /skill|claude|agent|mcp/.test(desc);
  if (stars === 0 && !isSkillRelated && !subPath) return null;

  const files = await listDirectory(owner, repo, basePath, token);
  if (files.length === 0) return null;

  let skillData: Partial<SkillData> = {};

  // Try skill files in priority order
  const skillFiles = [
    "SKILL.md",
    "skill.md",
    "CLAUDE.md",
    "claude.md",
    "skill.json",
    "config.json",
  ];

  for (const filename of skillFiles) {
    if (files.includes(filename)) {
      const filePath = basePath ? `${basePath}/${filename}` : filename;
      const content = await fetchGitHubFile(owner, repo, filePath, token);
      if (content) {
        if (filename.endsWith(".md")) {
          skillData = { ...skillData, ...parseSkillMd(content) };
        } else if (filename.endsWith(".json")) {
          skillData = { ...skillData, ...parseJsonSkill(content) };
        }
        break;
      }
    }
  }

  // Try shell scripts
  const shellFiles = files.filter(
    (f) => f.endsWith(".sh") || f.endsWith(".bash")
  );
  if (!skillData.skillMd && shellFiles.length > 0) {
    const filePath = basePath
      ? `${basePath}/${shellFiles[0]}`
      : shellFiles[0];
    const content = await fetchGitHubFile(owner, repo, filePath, token);
    if (content) {
      skillData = { ...skillData, ...parseShellSkill(content, shellFiles[0]) };
    }
  }

  // Fallback to README — but only if it looks skill-related
  if (!skillData.skillMd) {
    for (const readme of ["README.md", "readme.md"]) {
      if (files.includes(readme)) {
        const filePath = basePath ? `${basePath}/${readme}` : readme;
        const content = await fetchGitHubFile(owner, repo, filePath, token);
        if (content) {
          const lower = content.toLowerCase();
          // Only use README if it mentions skills/claude/agent
          if (/skill|claude|agent|mcp|SKILL\.md/.test(lower)) {
            skillData = { ...skillData, ...parseReadme(content) };
          }
          break;
        }
      }
    }
  }

  // Must have extracted some skill content
  if (!skillData.skillMd && !skillData.description) return null;

  if (!skillData.name) {
    skillData.name = repoInfo.name?.replace(/[-_]/g, " ") || repo;
    skillData.name =
      skillData.name.charAt(0).toUpperCase() + skillData.name.slice(1);
  }
  if (!skillData.description) {
    skillData.description = repoInfo.description || "No description available";
  }

  // Reject names that contain JSON/XML artifacts or are too long
  if (
    skillData.name.length > 100 ||
    /[{}<>"]/.test(skillData.name) ||
    /basedOn|quickFormat|paragraphStyle/.test(skillData.name)
  ) {
    return null;
  }

  // Reject common non-skill names from code examples
  const lowerName = skillData.name.toLowerCase();
  if (/^(heading|normal|table|title|subtitle|caption|list|quote)\b/.test(lowerName)) {
    return null;
  }

  // Truncate skillMd to keep file size manageable
  const maxSkillMdLen = 5000;
  if (skillData.skillMd && skillData.skillMd.length > maxSkillMdLen) {
    skillData.skillMd =
      skillData.skillMd.substring(0, maxSkillMdLen) + "\n\n<!-- Content truncated -->";
  }

  // Fetch repo stats
  let commitFrequency: string | undefined;
  let contributorCount: number | undefined;
  try {
    const stats = await fetchRepoStats(owner, repo, token);
    commitFrequency = stats.commitFrequency;
    contributorCount = stats.contributorCount;
  } catch {
    // Ignore stats errors
  }

  // Check KOL recommendations
  const repoKey = `${owner}/${repo}`;
  const recommendedBy = kolRepoMap.get(repoKey) || [];

  return {
    id: generateId(skillData.name || repo),
    name: skillData.name || repo,
    description: (skillData.description || "").replace(/"/g, '\\"').substring(0, 300),
    category: detectCategory(skillData),
    tags: skillData.tags?.length ? skillData.tags : extractTags(skillData),
    platforms: detectPlatforms(skillData),
    source: {
      kind: "github",
      label: `${owner}/${repo}`,
      url: `https://github.com/${owner}/${repo}`,
    },
    popularity: {
      stars,
      installs: 0,
    },
    updatedAt: new Date().toISOString().split("T")[0],
    authors: [repoInfo.owner?.login || owner],
    version: "1.0.0",
    license: repoInfo.license?.spdx_id || "Unknown",
    files: files.filter(
      (f) => f.endsWith(".md") || f.endsWith(".json") || f.endsWith(".sh")
    ),
    skillMd:
      skillData.skillMd ||
      `# ${skillData.name}\n\n${skillData.description}`,
    recommendedBy: recommendedBy.length > 0 ? recommendedBy : undefined,
    commitFrequency,
    contributorCount: contributorCount || undefined,
  };
}

// Generate the full skills.ts file content
function generateSkillsFile(skills: SkillData[], kolSources: KolSource[]): string {
  // Sort by ID for deterministic output
  const sorted = [...skills].sort((a, b) => a.id.localeCompare(b.id));

  const skillsEntries = sorted.map((s) => formatSkillAsTS(s)).join(",\n");

  // Aggregate authors from all skills
  const authorMap = new Map<string, { skillCount: number; kolSource?: KolSource }>();
  for (const skill of sorted) {
    for (const authorId of skill.authors || []) {
      const key = authorId.toLowerCase();
      const existing = authorMap.get(key) || { skillCount: 0 };
      existing.skillCount++;
      authorMap.set(key, existing);
    }
  }

  // Enrich with KOL data
  for (const kol of kolSources) {
    const key = kol.github.toLowerCase();
    const existing = authorMap.get(key) || { skillCount: 0 };
    existing.kolSource = kol;
    authorMap.set(key, existing);
  }

  // Sort authors by skill count descending
  const sortedAuthors = Array.from(authorMap.entries())
    .sort((a, b) => b[1].skillCount - a[1].skillCount);

  const authorsEntries = sortedAuthors.map(([id, data]) => {
    const kol = data.kolSource;
    const name = kol?.name || id;
    const escapedNote = (kol?.note || "").replace(/"/g, '\\"');
    return `  {
    id: "${id}",
    name: "${name}",
    avatarUrl: "https://github.com/${id}.png",
    githubUrl: "https://github.com/${id}"${kol?.twitter ? `,\n    twitterHandle: "${kol.twitter}"` : ""}${kol ? `,\n    isKol: true,\n    kolNote: "${escapedNote}"` : ""},
    skillCount: ${data.skillCount}
  }`;
  }).join(",\n");

  // Default collections
  const collectionsCode = `  {
    id: "office-docs",
    name: "Office Docs Toolkit",
    description: "Essential skills for working with office documents — PDF, Word, Excel, and PowerPoint",
    icon: "FileText",
    skillIds: ["pdf", "docx", "xlsx", "pptx"],
    color: "bg-blue-500",
  },
  {
    id: "design-creative",
    name: "Design & Creative",
    description: "Skills for visual design, generative art, and creative coding",
    icon: "Palette",
    skillIds: ["frontend-design", "algorithmic-art", "canvas-design", "slack-gif-creator"],
    color: "bg-purple-500",
  },
  {
    id: "styling-theming",
    name: "Styling & Theming",
    description: "Skills for building consistent design systems and brand guidelines",
    icon: "Paintbrush",
    skillIds: ["brand-guidelines", "theme-factory", "frontend-design"],
    color: "bg-pink-500",
  },
  {
    id: "documentation",
    name: "Documentation & Writing",
    description: "Skills for writing, editing, and collaborating on documents",
    icon: "PenTool",
    skillIds: ["doc-coauthoring", "internal-comms"],
    color: "bg-green-500",
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    description: "Skills for building, testing, and debugging software",
    icon: "Code",
    skillIds: ["mcp-builder", "webapp-testing", "skill-creator", "web-artifacts-builder"],
    color: "bg-orange-500",
  }`;

  return `// Auto-generated by sync-skills.ts — do not edit manually
// Last synced: ${new Date().toISOString()}
// Total skills: ${sorted.length}

import type { Skill, Collection, Author } from "./types";

export const skills: Skill[] = [
${skillsEntries}
];

export const authors: Author[] = [
${authorsEntries}
];

export const collections: Collection[] = [
${collectionsCode}
];

export function getSkillById(id: string): Skill | undefined {
  return skills.find((skill) => skill.id === id);
}

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter((skill) => skill.category === category);
}

export function getSkillsByIds(ids: string[]): Skill[] {
  return ids.map((id) => skills.find((s) => s.id === id)).filter(Boolean) as Skill[];
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((collection) => collection.id === id);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getSkillsByAuthor(authorId: string): Skill[] {
  return skills.filter((s) => s.authors?.some((a) => a.toLowerCase() === authorId));
}

export function searchSkills(query: string): Skill[] {
  const lowerQuery = query.toLowerCase();
  return skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.description.toLowerCase().includes(lowerQuery) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      skill.authors?.some((a) => a.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedSkills(skill: Skill, limit = 6): Skill[] {
  return skills
    .filter((s) => s.id !== skill.id)
    .map((s) => ({
      skill: s,
      score:
        (s.category === skill.category ? 2 : 0) +
        s.tags.filter((t) => skill.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.skill);
}
`;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const limitArg = args.find((a) => a.startsWith("--limit"));
  const limit = limitArg ? parseInt(args[args.indexOf(limitArg) + 1] || "50") : 200;
  const token = getGithubToken();

  console.log("\n🔄 SkillsHub Sync\n");
  console.log(`  Mode: ${dryRun ? "DRY RUN" : "LIVE"}`);
  console.log(`  Limit: ${limit} repos`);
  console.log(`  Token: ${token ? "✅ Set" : "❌ Not set (lower rate limits)"}`);
  console.log("");

  // Phase A: Discovery
  console.log("📡 Phase A: Discovering skill repos...");
  const kolSources = loadKolSources();
  console.log(`  KOL sources: ${kolSources.length}`);

  const kolResults = await discoverKolSkills(kolSources, token);
  console.log(`  KOL repos: ${kolResults.length}`);

  const allResults = await discoverSkills(token);

  // Merge KOL results into all results
  const merged = new Map<string, SearchResult>();
  for (const r of [...allResults, ...kolResults]) {
    const key = `${r.owner}/${r.repo}/${r.path}`;
    if (!merged.has(key)) merged.set(key, r);
  }
  const finalResults = Array.from(merged.values());
  console.log(`  Total discovered: ${finalResults.length}\n`);

  // Phase B: Fetch and Parse
  console.log("📥 Phase B: Fetching and parsing skills...");
  const skills: SkillData[] = [];
  const seen = new Set<string>();
  let processed = 0;
  let skipped = 0;
  let failed = 0;

  const toProcess = finalResults.slice(0, limit);
  let noContent = 0;

  for (const result of toProcess) {
    processed++;
    const key = `${result.owner}/${result.repo}/${result.path}`;

    if (seen.has(key)) {
      skipped++;
      continue;
    }
    seen.add(key);

    process.stdout.write(
      `\r  Processing ${processed}/${toProcess.length}: ${result.owner}/${result.repo}...           `
    );

    try {
      const skill = await parseRepo(result, token);
      if (skill) {
        // Deduplicate by ID
        if (!skills.find((s) => s.id === skill.id)) {
          skills.push(skill);
        }
      } else {
        noContent++;
      }
    } catch {
      failed++;
    }

    // Rate limit: pause between repos
    if (processed % 5 === 0) {
      await sleep(1000);
    }
  }

  console.log("\n");
  console.log(`  Results:`);
  console.log(`    ✅ Parsed: ${skills.length} skills`);
  console.log(`    ⏭️  Skipped: ${skipped} (duplicates)`);
  console.log(`    📭 No content: ${noContent} (not skill repos)`);
  console.log(`    ❌ Failed: ${failed}`);
  console.log("");

  // Phase C: Generate output
  console.log("📝 Phase C: Generating skills.ts...");
  const output = generateSkillsFile(skills, kolSources);

  if (dryRun) {
    console.log("\n--- DRY RUN OUTPUT (first 2000 chars) ---\n");
    console.log(output.substring(0, 2000));
    console.log("\n--- END DRY RUN ---\n");
    console.log(`Would write ${output.length} bytes to src/data/skills.ts`);
  } else {
    const outputPath = path.join(__dirname, "../src/data/skills.ts");
    fs.writeFileSync(outputPath, output, "utf-8");
    console.log(`\n✅ Wrote ${skills.length} skills to ${outputPath}`);
  }

  console.log("\n🎉 Sync complete!\n");
}

main().catch((err) => {
  console.error("❌ Sync failed:", err);
  process.exit(1);
});

#!/usr/bin/env tsx

/**
 * Skill Import Script
 *
 * Usage: pnpm import-skill <repo-url>
 *
 * Supports:
 * - Standard SKILL.md files
 * - CLAUDE.md files
 * - Shell scripts with skill definitions
 * - JSON/YAML config files
 * - Auto-extraction from README.md
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
} from "./lib/github.js";
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

// Parse GitHub URL
function parseGitHubUrl(
  url: string
): { owner: string; repo: string; path?: string } | null {
  const patterns = [
    /github\.com\/([^\/]+)\/([^\/]+)\/tree\/[^\/]+\/(.+)/,
    /github\.com\/([^\/]+)\/([^\/]+)\/?$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return { owner: match[1], repo: match[2], path: match[3] };
    }
  }
  return null;
}

// Main import function
async function importSkill(repoUrl: string): Promise<SkillData | null> {
  console.log(`\n📦 Importing skill from: ${repoUrl}\n`);

  const parsed = parseGitHubUrl(repoUrl);
  if (!parsed) {
    console.error("❌ Invalid GitHub URL");
    return null;
  }

  const { owner, repo, path: subPath } = parsed;
  const basePath = subPath || "";

  console.log(`📂 Repository: ${owner}/${repo}`);
  if (basePath) console.log(`📁 Path: ${basePath}`);

  const token = getGithubToken();

  // Fetch repo info
  const repoInfo = await fetchRepoInfo(owner, repo, token);
  console.log(`⭐ Stars: ${repoInfo?.stargazers_count || 0}`);

  // List files in directory
  const files = await listDirectory(owner, repo, basePath, token);
  console.log(`📄 Files found: ${files.join(", ")}`);

  let skillData: Partial<SkillData> = {};

  // Priority order for skill files
  const skillFiles = [
    "SKILL.md",
    "skill.md",
    "CLAUDE.md",
    "claude.md",
    ".claude",
    "skill.json",
    "config.json",
  ];

  // Try to find and parse skill file
  for (const filename of skillFiles) {
    if (files.includes(filename)) {
      const filePath = basePath ? `${basePath}/${filename}` : filename;
      const content = await fetchGitHubFile(owner, repo, filePath, token);
      if (content) {
        console.log(`✅ Found skill file: ${filename}`);
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
      console.log(`✅ Found shell skill: ${shellFiles[0]}`);
      skillData = { ...skillData, ...parseShellSkill(content, shellFiles[0]) };
    }
  }

  // Fallback to README
  if (!skillData.skillMd) {
    for (const readme of ["README.md", "readme.md", "Readme.md"]) {
      if (files.includes(readme)) {
        const filePath = basePath ? `${basePath}/${readme}` : readme;
        const content = await fetchGitHubFile(owner, repo, filePath, token);
        if (content) {
          console.log(`📖 Using README as skill content`);
          skillData = { ...skillData, ...parseReadme(content) };
          break;
        }
      }
    }
  }

  // Use repo info as fallback
  if (!skillData.name) {
    skillData.name =
      repoInfo?.name?.replace(/[-_]/g, " ") || repo;
    skillData.name =
      skillData.name.charAt(0).toUpperCase() + skillData.name.slice(1);
  }
  if (!skillData.description) {
    skillData.description = repoInfo?.description || "No description available";
  }

  // Generate final skill object
  const finalSkill: SkillData = {
    id: generateId(skillData.name || repo),
    name: skillData.name || repo,
    description: skillData.description || "",
    category: detectCategory(skillData),
    tags: skillData.tags?.length ? skillData.tags : extractTags(skillData),
    platforms: detectPlatforms(skillData),
    source: {
      kind: "github",
      label: `${owner}/${repo}`,
      url: repoUrl,
    },
    popularity: {
      stars: repoInfo?.stargazers_count || 0,
      installs: 0,
    },
    updatedAt: new Date().toISOString().split("T")[0],
    authors: [repoInfo?.owner?.login || owner],
    version: "1.0.0",
    license: repoInfo?.license?.spdx_id || "Unknown",
    files: files.filter(
      (f) => f.endsWith(".md") || f.endsWith(".json") || f.endsWith(".sh")
    ),
    skillMd:
      skillData.skillMd ||
      `# ${skillData.name}\n\n${skillData.description}`,
  };

  return finalSkill;
}

// Main
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: pnpm import-skill <repo-url>

Examples:
  pnpm import-skill https://github.com/user/repo
  pnpm import-skill https://github.com/user/repo/tree/main/skills/my-skill

Options:
  --dry-run    Preview without modifying skills.ts
  --output     Print the generated TypeScript code
`);
    process.exit(1);
  }

  const repoUrl = args[0];
  const dryRun = args.includes("--dry-run");
  const outputOnly = args.includes("--output");

  const skill = await importSkill(repoUrl);

  if (!skill) {
    console.error("❌ Failed to import skill");
    process.exit(1);
  }

  console.log("\n📋 Extracted Skill Data:");
  console.log(`  Name: ${skill.name}`);
  console.log(`  ID: ${skill.id}`);
  console.log(`  Category: ${skill.category}`);
  console.log(`  Tags: ${skill.tags.join(", ")}`);
  console.log(`  Platforms: ${skill.platforms.join(", ")}`);
  console.log(`  License: ${skill.license}`);

  const tsCode = formatSkillAsTS(skill);

  if (outputOnly || dryRun) {
    console.log("\n📝 Generated TypeScript:\n");
    console.log(tsCode);

    if (dryRun) {
      console.log("\n⚠️  Dry run - skills.ts not modified");
    }
    return;
  }

  // Update skills.ts
  const skillsPath = path.join(__dirname, "../src/data/skills.ts");
  let skillsContent = fs.readFileSync(skillsPath, "utf-8");

  // Check if skill already exists
  if (skillsContent.includes(`id: "${skill.id}"`)) {
    console.log(`\n⚠️  Skill with ID "${skill.id}" already exists!`);
    process.exit(1);
  }

  // Insert before the closing bracket of skills array
  const insertPoint = skillsContent.lastIndexOf("];");
  if (insertPoint === -1) {
    console.error("❌ Could not find insertion point in skills.ts");
    process.exit(1);
  }

  // Check if we need a comma
  const beforeInsert = skillsContent.substring(0, insertPoint).trimEnd();
  const needsComma =
    !beforeInsert.endsWith(",") && !beforeInsert.endsWith("[");

  const newContent =
    skillsContent.substring(0, insertPoint) +
    (needsComma ? "," : "") +
    "\n" +
    tsCode +
    "\n" +
    skillsContent.substring(insertPoint);

  fs.writeFileSync(skillsPath, newContent);

  console.log(`\n✅ Skill "${skill.name}" added to skills.ts`);
  console.log("💡 Remember to review and commit the changes!");
}

main().catch(console.error);

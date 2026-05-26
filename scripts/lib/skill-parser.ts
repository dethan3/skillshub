/**
 * Skill parsing utilities for import and sync scripts.
 */

export interface SkillData {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  platforms: string[];
  source: {
    kind: "github" | "website";
    label: string;
    url: string;
  };
  popularity: { stars: number; installs: number };
  updatedAt: string;
  authors: string[];
  version: string;
  license: string;
  files: string[];
  skillMd: string;
  recommendedBy?: string[];
  commitFrequency?: string;
  contributorCount?: number;
}

export function parseSkillMd(content: string): Partial<SkillData> {
  const result: Partial<SkillData> = {};

  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];

    const nameMatch = frontmatter.match(/^name:\s*(.+)/m);
    if (nameMatch) result.name = nameMatch[1].trim().replace(/^["']|["']$/g, "");

    const descMatch = frontmatter.match(/^description:\s*(.+)/m);
    if (descMatch) result.description = descMatch[1].trim().replace(/^["']|["']$/g, "");

    const licenseMatch = frontmatter.match(/^license:\s*(.+)/m);
    if (licenseMatch) result.license = licenseMatch[1].trim();
  }

  // Only set skillMd if we found valid frontmatter with at least name or description
  if (result.name || result.description) {
    result.skillMd = content;
  }

  return result;
}

export function parseShellSkill(content: string, filename: string): Partial<SkillData> {
  const result: Partial<SkillData> = {};

  const descMatch =
    content.match(/^#\s*Description:\s*(.+)/m) || content.match(/^#\s*(.+)/m);
  if (descMatch) result.description = descMatch[1].trim();

  result.name = filename
    .replace(/\.(sh|bash)$/, "")
    .replace(/[-_]/g, " ");
  result.name = result.name.charAt(0).toUpperCase() + result.name.slice(1);

  result.skillMd = `---
name: ${result.name || "Shell Skill"}
description: ${result.description || "Shell script skill"}
---

# ${result.name}

\`\`\`bash
${content}
\`\`\`
`;

  return result;
}

export function parseJsonSkill(content: string): Partial<SkillData> {
  try {
    const json = JSON.parse(content);
    return {
      name: json.name || json.title,
      description: json.description,
      tags: json.tags || json.keywords || [],
      skillMd: `---
name: ${json.name || json.title || "JSON Skill"}
description: ${json.description || ""}
---

# ${json.name || json.title}

${json.description || ""}

\`\`\`json
${content}
\`\`\`
`,
    };
  } catch {
    return {};
  }
}

export function parseReadme(content: string): Partial<SkillData> {
  const result: Partial<SkillData> = {};

  const titleMatch = content.match(/^#\s+(.+)/m);
  if (titleMatch) result.name = titleMatch[1].trim();

  const descMatch = content.match(/^#[^\n]+\n+([^\n#]+)/m);
  if (descMatch) result.description = descMatch[1].trim().substring(0, 200);

  result.skillMd = content;
  return result;
}

export function detectCategory(data: Partial<SkillData>): string {
  const text = `${data.name} ${data.description} ${data.tags?.join(" ")}`.toLowerCase();

  if (/design|ui|ux|css|frontend|visual|art|theme/.test(text)) return "Design";
  if (/doc|pdf|word|excel|pptx|markdown/.test(text)) return "Docs";
  if (/data|csv|sql|analytics|pandas/.test(text)) return "Data";
  if (/automat|script|workflow|ci|cd|deploy/.test(text)) return "Automation";
  if (/enterprise|business|sap|salesforce/.test(text)) return "Enterprise";
  if (/api|sdk|code|develop|test|debug|mcp/.test(text)) return "Development";

  return "Other";
}

export function detectPlatforms(data: Partial<SkillData>): string[] {
  const text = `${data.skillMd} ${data.description}`.toLowerCase();
  const platforms: string[] = [];

  if (/claude\s*code|claude-code/.test(text)) platforms.push("Claude Code");
  if (/claude\.ai|claude ai|artifact/.test(text)) platforms.push("Claude.ai");
  if (/claude\s*api|anthropic\s*api/.test(text)) platforms.push("Claude API");
  if (/codex|openai\s*codex/.test(text)) platforms.push("Codex CLI");
  if (/chatgpt|gpt-4|openai/.test(text)) platforms.push("ChatGPT");

  if (platforms.length === 0) platforms.push("Claude Code");

  return platforms;
}

export function extractTags(data: Partial<SkillData>): string[] {
  const text = `${data.name} ${data.description} ${data.skillMd}`.toLowerCase();
  const tagSet = new Set<string>();

  const keywords = [
    "typescript",
    "javascript",
    "python",
    "rust",
    "go",
    "react",
    "vue",
    "angular",
    "svelte",
    "api",
    "mcp",
    "sdk",
    "cli",
    "testing",
    "automation",
    "workflow",
    "pdf",
    "docx",
    "xlsx",
    "markdown",
    "frontend",
    "backend",
    "fullstack",
    "design",
    "ui",
    "ux",
    "css",
    "tailwind",
    "database",
    "sql",
    "postgres",
    "mongodb",
    "docker",
    "kubernetes",
    "aws",
    "gcp",
    "git",
    "github",
    "gitlab",
  ];

  for (const keyword of keywords) {
    if (text.includes(keyword)) {
      tagSet.add(keyword);
    }
  }

  return Array.from(tagSet).slice(0, 8);
}

export function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatSkillAsTS(skill: SkillData): string {
  const escapedSkillMd = skill.skillMd
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  // Escape description for double-quoted string context
  const escapedDesc = skill.description
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');

  const recommendedBy = skill.recommendedBy?.length
    ? `,\n    recommendedBy: ${JSON.stringify(skill.recommendedBy)}`
    : "";
  const commitFrequency = skill.commitFrequency
    ? `,\n    commitFrequency: "${skill.commitFrequency}"`
    : "";
  const contributorCount = skill.contributorCount
    ? `,\n    contributorCount: ${skill.contributorCount}`
    : "";

  return `  {
    id: "${skill.id}",
    name: "${skill.name}",
    description: "${escapedDesc}",
    category: "${skill.category}",
    tags: ${JSON.stringify(skill.tags)},
    platforms: ${JSON.stringify(skill.platforms)},
    source: { kind: "github", label: "${skill.source.label}", url: "${skill.source.url}" },
    popularity: { stars: ${skill.popularity.stars}, installs: 0 },
    updatedAt: "${skill.updatedAt}",
    authors: ${JSON.stringify(skill.authors)},
    version: "${skill.version}",
    license: "${skill.license}",
    files: ${JSON.stringify(skill.files)}${recommendedBy}${commitFrequency}${contributorCount},
    skillMd: \`${escapedSkillMd}\`
  }`;
}

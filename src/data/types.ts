export type Category = "Development" | "Docs" | "Enterprise" | "Design" | "Data" | "Automation" | "Other";

export type Platform = "Claude Code" | "Claude.ai" | "Claude API" | "Codex CLI" | "ChatGPT";

export interface Author {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  githubUrl?: string;
  twitterHandle?: string;
  isKol?: boolean;
  kolNote?: string;
  skillCount: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  platforms: Platform[];
  source: {
    kind: "github" | "website";
    label: string;
    url: string;
  };
  popularity?: {
    stars?: number;
    installs?: number;
    trending?: number;
  };
  updatedAt: string;
  skillMd: string;
  files?: string[];
  authors?: string[];
  version?: string;
  license?: string;
  recommendedBy?: string[];
  commitFrequency?: string;
  contributorCount?: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  icon: string;
  skillIds: string[];
  color: string;
}

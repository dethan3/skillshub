export type Category = "Development" | "Docs" | "Enterprise" | "Design" | "Data" | "Automation" | "Other";

export type Platform = "Claude Code" | "Claude.ai" | "Claude API" | "Codex CLI" | "ChatGPT";

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
  };
  updatedAt: string;
  skillMd: string;
  files?: string[];
  authors?: string[];
  version?: string;
  license?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  icon: string;
  skillIds: string[];
  color: string;
}

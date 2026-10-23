# Agent Skills - AI Agent Skills Directory

> **Discover, Share, and Deploy AI Agent Skills** — A community-driven directory following the open [SKILL.md](https://github.com/anthropics/skills) standard for Claude, ChatGPT, and other AI assistants.

[![Skills](https://img.shields.io/badge/Skills-40%2B-blue)](https://skillshub.dev/library)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6)](https://www.typescriptlang.org)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20中文-orange)](https://skillshub.dev)

## 🎯 What is SkillsHub?

SkillsHub is the central hub for **AI Agent Skills** — reusable, self-contained capabilities that AI assistants can use to accomplish specific tasks. Think of it as an "app store" for AI capabilities, but open and community-driven.

### What are Agent Skills?

Agent Skills are modular AI capabilities defined using the **SKILL.md** specification:
- **Portable** — Work across different AI platforms (Claude, ChatGPT, etc.)
- **Model-Invoked** — Automatically activated by AI based on context
- **Composable** — Combine multiple skills for complex workflows
- **Community-Driven** — Share, fork, and improve skills together

## ✨ Features

- **🔍 Browse & Search** — Explore 40+ curated skills with powerful filtering by category, platform, and tags
- **📦 Curated Collections** — Hand-picked skill bundles for workflows (Git, Documentation, DevOps, etc.)
- **📖 Skill Details** — Markdown rendering, installation instructions, and related skills
- **📤 Submit Skills** — Community contribution with review queue
- **🌙 Dark/Light Theme** — System-aware theme switching
- **🌐 Internationalization** — English and Chinese language support
- **⌨️ Global Search** — `⌘K` / `Ctrl+K` command palette for quick navigation
- **📱 Responsive Design** — Mobile-first, works on all devices

## Tech Stack

- **Vite** — Fast build tool and dev server
- **React 19** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Utility-first styling
- **shadcn/ui** — Accessible component library
- **React Router** — Client-side routing
- **React Markdown** — Markdown rendering with syntax highlighting

## Getting Started

### Prerequisites

- Node.js 24.22.1 or a newer 24.x patch (see `.nvmrc`)
- pnpm 9.x

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The development server will start at `http://localhost:5173`.

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout, SearchCommand
│   ├── ui/              # shadcn/ui components
│   ├── SkillCard.tsx    # Skill card component
│   └── SkillCardSkeleton.tsx
├── contexts/
│   └── theme-context.tsx  # Theme provider
├── data/
│   ├── skills.ts        # 40+ skills and 8 collections
│   └── types.ts         # TypeScript types
├── hooks/
│   └── use-toast.ts     # Toast notifications
├── lib/
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Landing.tsx      # Home page
│   ├── Library.tsx      # Skills library with filters
│   ├── SkillDetail.tsx  # Individual skill page
│   ├── Collections.tsx  # Collections listing
│   ├── CollectionDetail.tsx
│   ├── Submit.tsx       # Submit a skill form
│   └── About.tsx        # About & specification
└── App.tsx              # Root component with routing
```

## Adding New Skills

To add a new skill, edit `src/data/skills.ts`:

```typescript
{
  id: "my-new-skill",
  name: "My New Skill",
  description: "A clear description of what this skill does",
  category: "Development",
  tags: ["tag1", "tag2"],
  platforms: ["Claude Code", "Claude.ai"],
  source: {
    kind: "github",
    label: "username/repo",
    url: "https://github.com/username/repo"
  },
  popularity: { stars: 100 },
  updatedAt: "2025-12-20",
  skillMd: "Your SKILL.md content here..."
}
```

## Deployment

This is a static site that can be deployed to any static hosting provider:

- **Vercel** — `vercel deploy`
- **Netlify** — Connect your repo or `netlify deploy`
- **Cloudflare Pages** — Connect your repo
- **GitHub Pages** — Use GitHub Actions

## 🔮 Future Enhancements

- **GitHub Integration** — Fetch skills directly from GitHub repos
- **Backend API** — Server-side skill submission and review
- **User Accounts** — Authentication and personalization
- **Rating System** — Community ratings and reviews
- **CLI Tool** — Command-line skill installer

## 🌍 Ecosystem & Related Projects

| Project | Description |
|---------|-------------|
| [anthropics/skills](https://github.com/anthropics/skills) | Official Agent Skills repository with SKILL.md specification |
| [awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | Community curated list of Claude skills |
| [openai/skills](https://github.com/openai/skills) | OpenAI's skills repository for ChatGPT |
| [SkillsHunt](https://skillshunt.io/) | Discover and generate Claude Skills |
| [SkillsMP](https://skillsmp.com/) | Skills marketplace |

## 🔍 SEO & AI Discoverability

This project includes comprehensive SEO optimizations:
- **Meta tags** — Title, description, keywords, Open Graph, Twitter Cards
- **Structured data** — JSON-LD schema for search engines
- **Sitemap** — XML sitemap for search engine indexing
- **robots.txt** — Search engine crawling directives
- **llms.txt** — AI-friendly content description for LLM crawlers
- **ai-plugin.json** — OpenAI plugin manifest for AI discoverability

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Submit skills via the [Submit page](https://skillshub.dev/submit)
2. Open issues for bugs or feature requests
3. Submit pull requests for improvements

---

<p align="center">
  <strong>SkillsHub</strong> — The open directory for AI Agent Skills<br>
  <a href="https://skillshub.dev">Website</a> · <a href="https://skillshub.dev/library">Browse Skills</a> · <a href="https://skillshub.dev/submit">Submit a Skill</a>
</p>

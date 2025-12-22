# SkillsHub

A production-grade Skills library hosting website for discovering, sharing, and deploying Agent Skills following the open **SKILL.md** standard.

![SkillsHub](https://img.shields.io/badge/Skills-40%2B-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6)

## Features

- **Browse & Search** — Explore 40+ curated skills with powerful filtering and search
- **Curated Collections** — Hand-picked skill bundles for common workflows
- **Skill Details** — Markdown rendering, installation instructions, and related skills
- **Submit Skills** — Community contribution with local review queue
- **Dark/Light Theme** — System-aware theme switching
- **Responsive Design** — Mobile-first, works on all devices
- **Global Search** — `⌘K` / `Ctrl+K` command palette for quick navigation

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

- Node.js 18+
- pnpm 8+

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

## Future Enhancements

- **GitHub Integration** — Fetch skills directly from GitHub repos
- **Backend API** — Server-side skill submission and review
- **User Accounts** — Authentication and personalization
- **Rating System** — Community ratings and reviews
- **CLI Tool** — Command-line skill installer

## Ecosystem Links

- [anthropics/skills](https://github.com/anthropics/skills) — Official Agent Skills repository
- [awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — Community curated list
- [SkillsHunt](https://skillshunt.io/) — Discover and generate Claude Skills
- [SkillsMP](https://skillsmp.com/) — Skills marketplace

## License

MIT License

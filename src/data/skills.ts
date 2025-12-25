import type { Skill, Collection } from "./types";

export const skills: Skill[] = [
  {
    id: "mcp-builder",
    name: "MCP Builder",
    description: "Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools.",
    category: "Development",
    tags: ["mcp", "api", "integration", "typescript", "python"],
    platforms: ["Claude Code"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md", "reference/"],
    skillMd: `---
name: mcp-builder
description: Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).
license: Complete terms in LICENSE.txt
---

# MCP Server Development Guide

## Overview

Create MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. The quality of an MCP server is measured by how well it enables LLMs to accomplish real-world tasks.

## Process

### Phase 1: Deep Research and Planning
- Understand Modern MCP Design
- Study MCP Protocol Documentation
- Study Framework Documentation
- Plan Your Implementation

### Phase 2: Implementation
- Set Up Project Structure
- Implement Core Infrastructure
- Implement Tools
`
  },
  {
    id: "frontend-design",
    name: "Frontend Design",
    description: "Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code and UI design that avoids generic AI aesthetics.",
    category: "Design",
    tags: ["frontend", "ui", "react", "tailwind", "web"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/frontend-design" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md"],
    skillMd: `---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications.
license: Complete terms in LICENSE.txt
---

# Frontend Design

Create distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, etc.
- **Differentiation**: What makes this UNFORGETTABLE?

## Frontend Aesthetics Guidelines

- **Typography**: Choose fonts that are beautiful, unique, and interesting
- **Color & Theme**: Commit to a cohesive aesthetic
- **Motion**: Use animations for effects and micro-interactions
- **Spatial Composition**: Unexpected layouts, asymmetry, overlap
`
  },
  {
    id: "pdf",
    name: "PDF Processing",
    description: "Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms.",
    category: "Docs",
    tags: ["pdf", "documents", "extraction", "forms"],
    platforms: ["Claude Code"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/pdf" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "Proprietary",
    files: ["SKILL.md", "forms.md", "reference.md"],
    skillMd: `---
name: pdf
description: Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms.
license: Proprietary. LICENSE.txt has complete terms
---

# PDF Processing Guide

## Overview

This guide covers essential PDF processing operations using Python libraries and command-line tools.

## Python Libraries

### pypdf - Basic Operations
- Merge PDFs
- Split PDF
- Extract Metadata
- Rotate Pages

### pdfplumber - Text and Table Extraction
- Extract Text with Layout
- Extract Tables
- Advanced Table Extraction

### reportlab - Create PDFs
- Basic PDF Creation
- Create PDF with Multiple Pages
`
  },
  {
    id: "docx",
    name: "DOCX Processing",
    description: "Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction.",
    category: "Docs",
    tags: ["docx", "word", "documents", "office"],
    platforms: ["Claude Code"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/docx" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "Proprietary",
    files: ["SKILL.md", "docx-js.md", "ooxml.md"],
    skillMd: `---
name: docx
description: Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction.
license: Proprietary. LICENSE.txt has complete terms
---

# DOCX Creation, Editing, and Analysis

## Workflow Decision Tree

### Reading/Analyzing Content
Use "Text extraction" or "Raw XML access"

### Creating New Document
Use "Creating a new Word document" workflow

### Editing Existing Document
- Your own document + simple changes: Use "Basic OOXML editing"
- Someone else's document: Use "Redlining workflow"
`
  },
  {
    id: "xlsx",
    name: "XLSX Processing",
    description: "Comprehensive spreadsheet creation, editing, and analysis with support for formulas, formatting, data analysis, and visualization.",
    category: "Data",
    tags: ["xlsx", "excel", "spreadsheet", "data"],
    platforms: ["Claude Code"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/xlsx" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "Proprietary",
    files: ["SKILL.md"],
    skillMd: `---
name: xlsx
description: Comprehensive spreadsheet creation, editing, and analysis with support for formulas, formatting, data analysis, and visualization.
license: Proprietary. LICENSE.txt has complete terms
---

# XLSX Processing

## Requirements for Outputs

### All Excel files
- Zero Formula Errors
- Preserve Existing Templates

### Financial models
- Color Coding Standards
- Number Formatting Standards
- Formula Construction Rules
`
  },
  {
    id: "pptx",
    name: "PPTX Processing",
    description: "Presentation creation, editing, and analysis for working with PowerPoint files including layouts, comments, and speaker notes.",
    category: "Docs",
    tags: ["pptx", "powerpoint", "presentation", "slides"],
    platforms: ["Claude Code"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/pptx" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "Proprietary",
    files: ["SKILL.md", "ooxml/"],
    skillMd: `---
name: pptx
description: Presentation creation, editing, and analysis. When Claude needs to work with presentations (.pptx files).
license: Proprietary. LICENSE.txt has complete terms
---

# PPTX Creation, Editing, and Analysis

## Reading and analyzing content

### Text extraction
Convert document to markdown using markitdown

### Raw XML access
For comments, speaker notes, slide layouts, animations, design elements
`
  },
  {
    id: "skill-creator",
    name: "Skill Creator",
    description: "Guide for creating effective skills that extend Claude's capabilities with specialized knowledge, workflows, or tool integrations.",
    category: "Development",
    tags: ["skills", "development", "guide", "workflow"],
    platforms: ["Claude Code"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/skill-creator" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md"],
    skillMd: `---
name: skill-creator
description: Guide for creating effective skills. This skill should be used when users want to create a new skill that extends Claude's capabilities.
license: Complete terms in LICENSE.txt
---

# Skill Creator

## About Skills

Skills are modular, self-contained packages that extend Claude's capabilities by providing specialized knowledge, workflows, and tools.

## Core Principles

### Concise is Key
The context window is a public good. Only add context Claude doesn't already have.

### Set Appropriate Degrees of Freedom
Match the level of specificity to the task's fragility and variability.
`
  },
  {
    id: "webapp-testing",
    name: "WebApp Testing",
    description: "Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, and capturing screenshots.",
    category: "Development",
    tags: ["testing", "playwright", "automation", "qa"],
    platforms: ["Claude Code"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/webapp-testing" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md", "scripts/"],
    skillMd: `---
name: webapp-testing
description: Toolkit for interacting with and testing local web applications using Playwright.
license: Complete terms in LICENSE.txt
---

# Web Application Testing

To test local web applications, write native Python Playwright scripts.

## Decision Tree

1. Is it static HTML? → Read HTML file directly
2. Is the server already running?
   - No → Use with_server.py helper
   - Yes → Reconnaissance-then-action pattern
`
  },
  {
    id: "algorithmic-art",
    name: "Algorithmic Art",
    description: "Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration for generative art and flow fields.",
    category: "Design",
    tags: ["art", "generative", "p5js", "creative"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/algorithmic-art" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md"],
    skillMd: `---
name: algorithmic-art
description: Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration.
license: Complete terms in LICENSE.txt
---

# Algorithmic Art

Create algorithmic philosophies expressed through code. Output .md files (philosophy), .html files (interactive viewer), and .js files (generative algorithms).

## Process
1. Algorithmic Philosophy Creation (.md file)
2. Express by creating p5.js generative art (.html + .js files)
`
  },
  {
    id: "canvas-design",
    name: "Canvas Design",
    description: "Create beautiful visual art in .png and .pdf documents using design philosophy for posters, art pieces, and static designs.",
    category: "Design",
    tags: ["design", "art", "visual", "poster"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/canvas-design" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md"],
    skillMd: `---
name: canvas-design
description: Create beautiful visual art in .png and .pdf documents using design philosophy.
license: Complete terms in LICENSE.txt
---

# Canvas Design

Create design philosophies - aesthetic movements that are then EXPRESSED VISUALLY.

## Process
1. Design Philosophy Creation (.md file)
2. Express by creating it on a canvas (.pdf file or .png file)
`
  },
  {
    id: "brand-guidelines",
    name: "Brand Guidelines",
    description: "Applies Anthropic's official brand colors and typography to any artifact that may benefit from having Anthropic's look-and-feel.",
    category: "Design",
    tags: ["branding", "style", "colors", "typography"],
    platforms: ["Claude Code"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/brand-guidelines" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md"],
    skillMd: `---
name: brand-guidelines
description: Applies Anthropic's official brand colors and typography to any sort of artifact.
license: Complete terms in LICENSE.txt
---

# Anthropic Brand Styling

## Brand Guidelines

### Colors
- Dark: #141413
- Light: #faf9f5
- Orange: #d97757
- Blue: #6a9bcc
- Green: #788c5d

### Typography
- Headings: Poppins
- Body Text: Lora
`
  },
  {
    id: "theme-factory",
    name: "Theme Factory",
    description: "Toolkit for styling artifacts with themes. Provides 10 pre-set themes with colors/fonts that can be applied to slides, docs, reports, and HTML pages.",
    category: "Design",
    tags: ["themes", "styling", "colors", "presentation"],
    platforms: ["Claude Code"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/theme-factory" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md", "theme-showcase.pdf"],
    skillMd: `---
name: theme-factory
description: Toolkit for styling artifacts with a theme. There are 10 pre-set themes with colors/fonts.
license: Complete terms in LICENSE.txt
---

# Theme Factory Skill

## Themes Available

1. Ocean Depths - Professional and calming maritime theme
2. Sunset Boulevard - Warm and vibrant sunset colors
3. Forest Canopy - Natural and grounded earth tones
4. Modern Minimalist - Clean and contemporary grayscale
5. Golden Hour - Rich and warm autumnal palette
6. Arctic Frost - Cool and crisp winter-inspired theme
7. Desert Rose - Soft and sophisticated dusty tones
8. Tech Innovation - Bold and modern tech aesthetic
9. Botanical Garden - Fresh and organic
10. Midnight Galaxy - Deep and mysterious space theme
`
  },
  {
    id: "doc-coauthoring",
    name: "Doc Co-Authoring",
    description: "Guide users through a structured workflow for co-authoring documentation, proposals, technical specs, and decision docs.",
    category: "Docs",
    tags: ["documentation", "writing", "workflow", "collaboration"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md"],
    skillMd: `---
name: doc-coauthoring
description: Guide users through a structured workflow for co-authoring documentation.
---

# Doc Co-Authoring Workflow

## Three Stages
1. **Context Gathering**: User provides all relevant context
2. **Refinement & Structure**: Iteratively build each section
3. **Reader Testing**: Test the doc with a fresh Claude
`
  },
  {
    id: "internal-comms",
    name: "Internal Communications",
    description: "Resources to write internal communications including status reports, leadership updates, 3P updates, company newsletters, FAQs, and incident reports.",
    category: "Docs",
    tags: ["communications", "writing", "business", "reports"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/internal-comms" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md", "examples/"],
    skillMd: `---
name: internal-comms
description: A set of resources to help write all kinds of internal communications.
license: Complete terms in LICENSE.txt
---

# Internal Communications

## When to use this skill
- 3P updates (Progress, Plans, Problems)
- Company newsletters
- FAQ responses
- Status reports
- Leadership updates
- Project updates
- Incident reports
`
  },
  {
    id: "slack-gif-creator",
    name: "Slack GIF Creator",
    description: "Knowledge and utilities for creating animated GIFs optimized for Slack with constraints, validation tools, and animation concepts.",
    category: "Design",
    tags: ["gif", "animation", "slack", "emoji"],
    platforms: ["Claude Code"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md", "core/"],
    skillMd: `---
name: slack-gif-creator
description: Knowledge and utilities for creating animated GIFs optimized for Slack.
license: Complete terms in LICENSE.txt
---

# Slack GIF Creator

## Slack Requirements

**Dimensions:**
- Emoji GIFs: 128x128 (recommended)
- Message GIFs: 480x480

**Parameters:**
- FPS: 10-30
- Colors: 48-128
- Duration: Keep under 3 seconds for emoji GIFs
`
  },
  {
    id: "web-artifacts-builder",
    name: "Web Artifacts Builder",
    description: "Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using React, Tailwind CSS, and shadcn/ui.",
    category: "Development",
    tags: ["react", "artifacts", "frontend", "components"],
    platforms: ["Claude.ai"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder" },
    popularity: { stars: 0, installs: 0 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["SKILL.md", "scripts/"],
    skillMd: `---
name: web-artifacts-builder
description: Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies.
license: Complete terms in LICENSE.txt
---

# Web Artifacts Builder

**Stack**: React 18 + TypeScript + Vite + Parcel + Tailwind CSS + shadcn/ui

## Quick Start

1. Initialize Project: \`bash scripts/init-artifact.sh <project-name>\`
2. Develop Your Artifact
3. Bundle to Single HTML File: \`bash scripts/bundle-artifact.sh\`
`
  }
];

export const collections: Collection[] = [
  {
    id: "office-docs-toolkit",
    name: "Office Docs Toolkit",
    description: "Complete toolkit for working with Office documents - Word, Excel, PowerPoint, and PDF.",
    icon: "FileText",
    color: "bg-blue-500",
    skillIds: ["pdf", "docx", "xlsx", "pptx"]
  },
  {
    id: "design-creative",
    name: "Design & Creative",
    description: "Tools for creating beautiful visual designs, art, and interfaces.",
    icon: "Palette",
    color: "bg-purple-500",
    skillIds: ["frontend-design", "algorithmic-art", "canvas-design", "slack-gif-creator"]
  },
  {
    id: "styling-theming",
    name: "Styling & Theming",
    description: "Apply consistent styling and themes to your artifacts.",
    icon: "Paintbrush",
    color: "bg-pink-500",
    skillIds: ["brand-guidelines", "theme-factory", "frontend-design"]
  },
  {
    id: "documentation-writing",
    name: "Documentation & Writing",
    description: "Tools for writing documentation, communications, and collaborative content.",
    icon: "PenTool",
    color: "bg-green-500",
    skillIds: ["doc-coauthoring", "internal-comms"]
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    description: "Essential tools for developers - MCP servers, testing, and skill creation.",
    icon: "Code",
    color: "bg-orange-500",
    skillIds: ["mcp-builder", "webapp-testing", "skill-creator", "web-artifacts-builder"]
  }
];

export function getSkillById(id: string): Skill | undefined {
  return skills.find(skill => skill.id === id);
}

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter(skill => skill.category === category);
}

export function getSkillsByIds(ids: string[]): Skill[] {
  return ids.map(id => getSkillById(id)).filter((s): s is Skill => s !== undefined);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find(collection => collection.id === id);
}

export function searchSkills(query: string): Skill[] {
  const lowerQuery = query.toLowerCase();
  return skills.filter(skill =>
    skill.name.toLowerCase().includes(lowerQuery) ||
    skill.description.toLowerCase().includes(lowerQuery) ||
    skill.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedSkills(skill: Skill, limit = 6): Skill[] {
  return skills
    .filter(s => s.id !== skill.id)
    .map(s => ({
      skill: s,
      score: s.category === skill.category ? 2 : 0 +
        s.tags.filter(t => skill.tags.includes(t)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.skill);
}

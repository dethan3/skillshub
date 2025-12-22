import type { Skill, Collection } from "./types";

export const skills: Skill[] = [
  {
    id: "git-commit-message",
    name: "Git Commit Message Generator",
    description: "Generate conventional, semantic commit messages from staged changes with context-aware formatting.",
    category: "Development",
    tags: ["git", "commit", "automation", "conventional-commits"],
    platforms: ["Claude Code", "Codex CLI"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 2341, installs: 15000 },
    updatedAt: "2025-12-15",
    authors: ["Anthropic"],
    version: "1.2.0",
    license: "MIT",
    files: ["generate.ts", "templates/commit.md"],
    skillMd: `---
name: Git Commit Message Generator
description: Generate conventional, semantic commit messages from staged changes with context-aware formatting.
---

# Git Commit Message Generator

This skill analyzes your staged Git changes and generates meaningful, conventional commit messages.

## Features

- Follows Conventional Commits specification
- Analyzes diff context for semantic meaning
- Supports multiple commit types (feat, fix, docs, style, refactor, test, chore)
- Generates breaking change notices when appropriate

## Usage

Simply stage your changes and ask Claude to generate a commit message:

\`\`\`bash
git add .
# Then ask: "Generate a commit message for my staged changes"
\`\`\`

## Configuration

You can customize the commit format by modifying the templates in the \`templates/\` directory.
`
  },
  {
    id: "code-review",
    name: "Code Review Assistant",
    description: "Comprehensive code review with security analysis, best practices, and actionable suggestions.",
    category: "Development",
    tags: ["review", "security", "best-practices", "quality"],
    platforms: ["Claude Code", "Claude.ai", "Claude API"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 3120, installs: 22000 },
    updatedAt: "2025-12-18",
    authors: ["Anthropic"],
    version: "2.0.1",
    license: "MIT",
    files: ["review.ts", "rules/security.yaml", "rules/style.yaml"],
    skillMd: `---
name: Code Review Assistant
description: Comprehensive code review with security analysis, best practices, and actionable suggestions.
---

# Code Review Assistant

An intelligent code review skill that provides comprehensive feedback on your code.

## Features

- Security vulnerability detection
- Performance optimization suggestions
- Code style and consistency checks
- Documentation coverage analysis
- Test coverage recommendations

## Usage

Ask Claude to review your code:

\`\`\`
Review this file for security issues and best practices
\`\`\`

## Review Categories

1. **Security** - SQL injection, XSS, authentication issues
2. **Performance** - N+1 queries, memory leaks, inefficient algorithms
3. **Maintainability** - Code duplication, complex functions, naming
4. **Testing** - Coverage gaps, edge cases, mocking strategies
`
  },
  {
    id: "test-generator",
    name: "Unit Test Generator",
    description: "Automatically generate comprehensive unit tests with mocks, edge cases, and assertions.",
    category: "Development",
    tags: ["testing", "unit-tests", "jest", "vitest", "automation"],
    platforms: ["Claude Code", "Codex CLI", "Claude API"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1890, installs: 12500 },
    updatedAt: "2025-12-10",
    authors: ["Anthropic"],
    version: "1.5.0",
    license: "MIT",
    files: ["generator.ts", "templates/jest.ts", "templates/vitest.ts"],
    skillMd: `---
name: Unit Test Generator
description: Automatically generate comprehensive unit tests with mocks, edge cases, and assertions.
---

# Unit Test Generator

Generate thorough unit tests for your functions and classes.

## Supported Frameworks

- Jest
- Vitest
- Mocha
- pytest (Python)

## Features

- Automatic mock generation
- Edge case identification
- Assertion coverage
- Setup/teardown boilerplate

## Usage

\`\`\`
Generate unit tests for the UserService class
\`\`\`
`
  },
  {
    id: "api-docs-generator",
    name: "API Documentation Generator",
    description: "Generate OpenAPI/Swagger documentation from code with examples and descriptions.",
    category: "Docs",
    tags: ["api", "openapi", "swagger", "documentation"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1456, installs: 8900 },
    updatedAt: "2025-12-08",
    authors: ["Anthropic"],
    version: "1.1.0",
    license: "MIT",
    files: ["generate-docs.ts", "templates/openapi.yaml"],
    skillMd: `---
name: API Documentation Generator
description: Generate OpenAPI/Swagger documentation from code with examples and descriptions.
---

# API Documentation Generator

Automatically generate comprehensive API documentation from your codebase.

## Output Formats

- OpenAPI 3.0
- Swagger 2.0
- Markdown
- HTML

## Features

- Extracts endpoints from route definitions
- Generates request/response schemas
- Includes example payloads
- Documents authentication requirements
`
  },
  {
    id: "readme-generator",
    name: "README Generator",
    description: "Create professional README files with badges, installation guides, and API references.",
    category: "Docs",
    tags: ["readme", "documentation", "markdown", "badges"],
    platforms: ["Claude Code", "Claude.ai", "ChatGPT"],
    source: { kind: "github", label: "travisvn/awesome-claude-skills", url: "https://github.com/travisvn/awesome-claude-skills" },
    popularity: { stars: 987, installs: 6200 },
    updatedAt: "2025-12-12",
    authors: ["Travis VN"],
    version: "1.0.0",
    license: "MIT",
    files: ["generate-readme.ts", "templates/readme.md"],
    skillMd: `---
name: README Generator
description: Create professional README files with badges, installation guides, and API references.
---

# README Generator

Generate comprehensive README files for your projects.

## Sections Generated

- Project title and description
- Badges (CI, coverage, npm version)
- Installation instructions
- Usage examples
- API reference
- Contributing guidelines
- License information
`
  },
  {
    id: "changelog-generator",
    name: "Changelog Generator",
    description: "Generate changelogs from git history following Keep a Changelog format.",
    category: "Docs",
    tags: ["changelog", "git", "releases", "versioning"],
    platforms: ["Claude Code", "Codex CLI"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 756, installs: 4500 },
    updatedAt: "2025-12-05",
    authors: ["Anthropic"],
    version: "1.0.2",
    license: "MIT",
    files: ["changelog.ts"],
    skillMd: `---
name: Changelog Generator
description: Generate changelogs from git history following Keep a Changelog format.
---

# Changelog Generator

Automatically generate changelogs from your git commit history.

## Format

Follows the Keep a Changelog specification with sections for:
- Added
- Changed
- Deprecated
- Removed
- Fixed
- Security
`
  },
  {
    id: "security-audit",
    name: "Security Audit",
    description: "Comprehensive security scanning for vulnerabilities, secrets, and compliance issues.",
    category: "Enterprise",
    tags: ["security", "audit", "compliance", "vulnerabilities"],
    platforms: ["Claude Code", "Claude API"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 2890, installs: 18000 },
    updatedAt: "2025-12-20",
    authors: ["Anthropic"],
    version: "2.1.0",
    license: "MIT",
    files: ["audit.ts", "rules/owasp.yaml", "rules/secrets.yaml"],
    skillMd: `---
name: Security Audit
description: Comprehensive security scanning for vulnerabilities, secrets, and compliance issues.
---

# Security Audit

Enterprise-grade security scanning for your codebase.

## Checks

- OWASP Top 10 vulnerabilities
- Secret detection (API keys, passwords)
- Dependency vulnerabilities
- SQL injection patterns
- XSS vulnerabilities
- Authentication issues
- Authorization flaws

## Compliance

- SOC 2
- HIPAA
- GDPR
- PCI DSS
`
  },
  {
    id: "license-compliance",
    name: "License Compliance Checker",
    description: "Scan dependencies for license compatibility and compliance requirements.",
    category: "Enterprise",
    tags: ["license", "compliance", "legal", "dependencies"],
    platforms: ["Claude Code", "Claude API"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1234, installs: 7800 },
    updatedAt: "2025-12-01",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["license-check.ts", "known-licenses.json"],
    skillMd: `---
name: License Compliance Checker
description: Scan dependencies for license compatibility and compliance requirements.
---

# License Compliance Checker

Ensure your project's dependencies comply with your licensing requirements.

## Features

- Scans all dependencies recursively
- Identifies license types
- Flags incompatible licenses
- Generates compliance reports
`
  },
  {
    id: "figma-to-code",
    name: "Figma to Code",
    description: "Convert Figma designs to React/Vue/HTML components with Tailwind CSS.",
    category: "Design",
    tags: ["figma", "react", "vue", "tailwind", "components"],
    platforms: ["Claude.ai", "Claude API"],
    source: { kind: "website", label: "skillshunt.io", url: "https://skillshunt.io" },
    popularity: { stars: 3456, installs: 25000 },
    updatedAt: "2025-12-19",
    authors: ["SkillsHunt Team"],
    version: "2.0.0",
    license: "MIT",
    files: ["converter.ts", "templates/react.tsx", "templates/vue.vue"],
    skillMd: `---
name: Figma to Code
description: Convert Figma designs to React/Vue/HTML components with Tailwind CSS.
---

# Figma to Code

Transform your Figma designs into production-ready code.

## Supported Outputs

- React + Tailwind CSS
- Vue 3 + Tailwind CSS
- HTML + CSS
- React Native

## Features

- Preserves design tokens
- Generates responsive layouts
- Extracts and optimizes assets
- Creates component hierarchy
`
  },
  {
    id: "design-system-generator",
    name: "Design System Generator",
    description: "Generate a complete design system with tokens, components, and documentation.",
    category: "Design",
    tags: ["design-system", "tokens", "components", "storybook"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "travisvn/awesome-claude-skills", url: "https://github.com/travisvn/awesome-claude-skills" },
    popularity: { stars: 1678, installs: 9500 },
    updatedAt: "2025-12-14",
    authors: ["Travis VN"],
    version: "1.3.0",
    license: "MIT",
    files: ["generator.ts", "templates/tokens.json", "templates/components/"],
    skillMd: `---
name: Design System Generator
description: Generate a complete design system with tokens, components, and documentation.
---

# Design System Generator

Create a comprehensive design system from scratch or existing designs.

## Generated Assets

- Design tokens (colors, typography, spacing)
- Component library (React/Vue)
- Storybook documentation
- Figma token export
`
  },
  {
    id: "sql-query-builder",
    name: "SQL Query Builder",
    description: "Generate optimized SQL queries from natural language with explain plans.",
    category: "Data",
    tags: ["sql", "database", "query", "optimization"],
    platforms: ["Claude Code", "Claude.ai", "ChatGPT"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 2345, installs: 16000 },
    updatedAt: "2025-12-17",
    authors: ["Anthropic"],
    version: "1.4.0",
    license: "MIT",
    files: ["query-builder.ts", "dialects/"],
    skillMd: `---
name: SQL Query Builder
description: Generate optimized SQL queries from natural language with explain plans.
---

# SQL Query Builder

Convert natural language to optimized SQL queries.

## Supported Databases

- PostgreSQL
- MySQL
- SQLite
- SQL Server
- Oracle

## Features

- Query optimization suggestions
- Index recommendations
- Explain plan analysis
- Query formatting
`
  },
  {
    id: "data-pipeline",
    name: "Data Pipeline Generator",
    description: "Create ETL pipelines with validation, transformation, and error handling.",
    category: "Data",
    tags: ["etl", "pipeline", "data-engineering", "validation"],
    platforms: ["Claude Code", "Claude API"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1567, installs: 8900 },
    updatedAt: "2025-12-11",
    authors: ["Anthropic"],
    version: "1.2.0",
    license: "MIT",
    files: ["pipeline.ts", "validators/", "transformers/"],
    skillMd: `---
name: Data Pipeline Generator
description: Create ETL pipelines with validation, transformation, and error handling.
---

# Data Pipeline Generator

Generate robust data pipelines for your ETL workflows.

## Features

- Schema validation
- Data transformation
- Error handling and retry logic
- Monitoring and alerting
- Incremental processing
`
  },
  {
    id: "github-actions",
    name: "GitHub Actions Generator",
    description: "Generate CI/CD workflows for GitHub Actions with best practices.",
    category: "Automation",
    tags: ["ci-cd", "github-actions", "workflow", "automation"],
    platforms: ["Claude Code", "Codex CLI", "ChatGPT"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 2678, installs: 19000 },
    updatedAt: "2025-12-16",
    authors: ["Anthropic"],
    version: "2.0.0",
    license: "MIT",
    files: ["generator.ts", "templates/"],
    skillMd: `---
name: GitHub Actions Generator
description: Generate CI/CD workflows for GitHub Actions with best practices.
---

# GitHub Actions Generator

Create production-ready GitHub Actions workflows.

## Workflow Types

- Build and test
- Deploy to cloud providers
- Release automation
- Security scanning
- Documentation publishing

## Best Practices

- Caching strategies
- Matrix builds
- Secret management
- Artifact handling
`
  },
  {
    id: "docker-compose",
    name: "Docker Compose Generator",
    description: "Generate Docker Compose files for multi-service applications.",
    category: "Automation",
    tags: ["docker", "containers", "devops", "orchestration"],
    platforms: ["Claude Code", "Codex CLI"],
    source: { kind: "github", label: "travisvn/awesome-claude-skills", url: "https://github.com/travisvn/awesome-claude-skills" },
    popularity: { stars: 1890, installs: 11000 },
    updatedAt: "2025-12-09",
    authors: ["Travis VN"],
    version: "1.1.0",
    license: "MIT",
    files: ["generator.ts", "templates/docker-compose.yaml"],
    skillMd: `---
name: Docker Compose Generator
description: Generate Docker Compose files for multi-service applications.
---

# Docker Compose Generator

Create Docker Compose configurations for complex applications.

## Features

- Multi-service orchestration
- Network configuration
- Volume management
- Environment variables
- Health checks
`
  },
  {
    id: "terraform-generator",
    name: "Terraform Generator",
    description: "Generate Terraform configurations for cloud infrastructure.",
    category: "Automation",
    tags: ["terraform", "iac", "cloud", "aws", "gcp", "azure"],
    platforms: ["Claude Code", "Claude API"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 2123, installs: 14000 },
    updatedAt: "2025-12-13",
    authors: ["Anthropic"],
    version: "1.5.0",
    license: "MIT",
    files: ["generator.ts", "modules/"],
    skillMd: `---
name: Terraform Generator
description: Generate Terraform configurations for cloud infrastructure.
---

# Terraform Generator

Create infrastructure as code with Terraform.

## Cloud Providers

- AWS
- Google Cloud
- Azure
- DigitalOcean

## Resources

- Compute instances
- Networking (VPC, subnets)
- Storage (S3, GCS)
- Databases (RDS, Cloud SQL)
- Kubernetes clusters
`
  },
  {
    id: "regex-builder",
    name: "Regex Builder",
    description: "Build and explain regular expressions with test cases and visualizations.",
    category: "Development",
    tags: ["regex", "patterns", "validation", "parsing"],
    platforms: ["Claude Code", "Claude.ai", "ChatGPT"],
    source: { kind: "website", label: "skillsmp.com", url: "https://skillsmp.com" },
    popularity: { stars: 1456, installs: 9800 },
    updatedAt: "2025-12-07",
    authors: ["SkillsMP Team"],
    version: "1.0.0",
    license: "MIT",
    files: ["builder.ts", "patterns/"],
    skillMd: `---
name: Regex Builder
description: Build and explain regular expressions with test cases and visualizations.
---

# Regex Builder

Create and understand regular expressions easily.

## Features

- Natural language to regex conversion
- Step-by-step explanations
- Test case generation
- Common pattern library
- Visualization support
`
  },
  {
    id: "refactoring-assistant",
    name: "Refactoring Assistant",
    description: "Suggest and apply code refactoring patterns to improve code quality.",
    category: "Development",
    tags: ["refactoring", "clean-code", "patterns", "quality"],
    platforms: ["Claude Code", "Codex CLI"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1789, installs: 10500 },
    updatedAt: "2025-12-18",
    authors: ["Anthropic"],
    version: "1.3.0",
    license: "MIT",
    files: ["refactor.ts", "patterns/"],
    skillMd: `---
name: Refactoring Assistant
description: Suggest and apply code refactoring patterns to improve code quality.
---

# Refactoring Assistant

Improve your code with automated refactoring suggestions.

## Refactoring Types

- Extract method/function
- Rename variables
- Simplify conditionals
- Remove duplication
- Improve abstractions
`
  },
  {
    id: "typescript-migration",
    name: "TypeScript Migration",
    description: "Migrate JavaScript projects to TypeScript with proper types and configurations.",
    category: "Development",
    tags: ["typescript", "migration", "types", "javascript"],
    platforms: ["Claude Code", "Codex CLI"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 2034, installs: 13500 },
    updatedAt: "2025-12-15",
    authors: ["Anthropic"],
    version: "1.1.0",
    license: "MIT",
    files: ["migrate.ts", "templates/tsconfig.json"],
    skillMd: `---
name: TypeScript Migration
description: Migrate JavaScript projects to TypeScript with proper types and configurations.
---

# TypeScript Migration

Convert your JavaScript codebase to TypeScript.

## Features

- Automatic type inference
- Configuration generation
- Gradual migration support
- Type definition installation
`
  },
  {
    id: "api-client-generator",
    name: "API Client Generator",
    description: "Generate type-safe API clients from OpenAPI specifications.",
    category: "Development",
    tags: ["api", "client", "openapi", "codegen"],
    platforms: ["Claude Code", "Claude API"],
    source: { kind: "github", label: "travisvn/awesome-claude-skills", url: "https://github.com/travisvn/awesome-claude-skills" },
    popularity: { stars: 1567, installs: 8700 },
    updatedAt: "2025-12-10",
    authors: ["Travis VN"],
    version: "1.2.0",
    license: "MIT",
    files: ["generator.ts", "templates/"],
    skillMd: `---
name: API Client Generator
description: Generate type-safe API clients from OpenAPI specifications.
---

# API Client Generator

Create API clients from OpenAPI/Swagger specs.

## Output Languages

- TypeScript
- Python
- Go
- Rust

## Features

- Type-safe requests
- Error handling
- Authentication support
- Request/response validation
`
  },
  {
    id: "database-schema",
    name: "Database Schema Designer",
    description: "Design and generate database schemas with migrations and relationships.",
    category: "Data",
    tags: ["database", "schema", "migrations", "sql"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1890, installs: 11200 },
    updatedAt: "2025-12-14",
    authors: ["Anthropic"],
    version: "1.4.0",
    license: "MIT",
    files: ["designer.ts", "templates/"],
    skillMd: `---
name: Database Schema Designer
description: Design and generate database schemas with migrations and relationships.
---

# Database Schema Designer

Design robust database schemas visually.

## Features

- Entity relationship modeling
- Migration generation
- Index optimization
- Foreign key management
- Normalization suggestions
`
  },
  {
    id: "graphql-schema",
    name: "GraphQL Schema Generator",
    description: "Generate GraphQL schemas with resolvers and type definitions.",
    category: "Development",
    tags: ["graphql", "api", "schema", "resolvers"],
    platforms: ["Claude Code", "Claude API"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1345, installs: 7600 },
    updatedAt: "2025-12-08",
    authors: ["Anthropic"],
    version: "1.0.0",
    license: "MIT",
    files: ["generator.ts", "templates/schema.graphql"],
    skillMd: `---
name: GraphQL Schema Generator
description: Generate GraphQL schemas with resolvers and type definitions.
---

# GraphQL Schema Generator

Create GraphQL APIs with ease.

## Features

- Type definition generation
- Resolver scaffolding
- Query/mutation generation
- Subscription support
- DataLoader integration
`
  },
  {
    id: "pdf-analyzer",
    name: "PDF Document Analyzer",
    description: "Extract and analyze content from PDF documents with structure preservation.",
    category: "Docs",
    tags: ["pdf", "extraction", "analysis", "documents"],
    platforms: ["Claude.ai", "Claude API"],
    source: { kind: "website", label: "skillshunt.io", url: "https://skillshunt.io" },
    popularity: { stars: 2456, installs: 17000 },
    updatedAt: "2025-12-19",
    authors: ["SkillsHunt Team"],
    version: "2.1.0",
    license: "MIT",
    files: ["analyzer.ts", "extractors/"],
    skillMd: `---
name: PDF Document Analyzer
description: Extract and analyze content from PDF documents with structure preservation.
---

# PDF Document Analyzer

Intelligent PDF processing and analysis.

## Features

- Text extraction with formatting
- Table detection and extraction
- Image extraction
- Structure analysis
- Searchable content generation
`
  },
  {
    id: "markdown-converter",
    name: "Markdown Converter",
    description: "Convert between document formats with Markdown as the hub.",
    category: "Docs",
    tags: ["markdown", "conversion", "documents", "format"],
    platforms: ["Claude Code", "Claude.ai", "ChatGPT"],
    source: { kind: "github", label: "travisvn/awesome-claude-skills", url: "https://github.com/travisvn/awesome-claude-skills" },
    popularity: { stars: 1123, installs: 6800 },
    updatedAt: "2025-12-06",
    authors: ["Travis VN"],
    version: "1.0.0",
    license: "MIT",
    files: ["converter.ts"],
    skillMd: `---
name: Markdown Converter
description: Convert between document formats with Markdown as the hub.
---

# Markdown Converter

Seamless document format conversion.

## Supported Formats

- Markdown ↔ HTML
- Markdown ↔ PDF
- Markdown ↔ DOCX
- Markdown ↔ RST
- Markdown ↔ AsciiDoc
`
  },
  {
    id: "code-documentation",
    name: "Code Documentation Generator",
    description: "Generate inline documentation and JSDoc/TSDoc comments for code.",
    category: "Docs",
    tags: ["documentation", "jsdoc", "comments", "code"],
    platforms: ["Claude Code", "Codex CLI"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1678, installs: 9200 },
    updatedAt: "2025-12-12",
    authors: ["Anthropic"],
    version: "1.2.0",
    license: "MIT",
    files: ["documenter.ts"],
    skillMd: `---
name: Code Documentation Generator
description: Generate inline documentation and JSDoc/TSDoc comments for code.
---

# Code Documentation Generator

Add comprehensive documentation to your code.

## Features

- Function/method documentation
- Parameter descriptions
- Return type documentation
- Example generation
- @throws documentation
`
  },
  {
    id: "accessibility-audit",
    name: "Accessibility Audit",
    description: "Audit web applications for WCAG compliance and accessibility issues.",
    category: "Enterprise",
    tags: ["accessibility", "wcag", "a11y", "audit"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1890, installs: 10500 },
    updatedAt: "2025-12-17",
    authors: ["Anthropic"],
    version: "1.5.0",
    license: "MIT",
    files: ["audit.ts", "rules/wcag.yaml"],
    skillMd: `---
name: Accessibility Audit
description: Audit web applications for WCAG compliance and accessibility issues.
---

# Accessibility Audit

Ensure your web applications are accessible to everyone.

## Standards

- WCAG 2.1 Level A
- WCAG 2.1 Level AA
- WCAG 2.1 Level AAA
- Section 508

## Checks

- Color contrast
- Keyboard navigation
- Screen reader compatibility
- ARIA attributes
- Focus management
`
  },
  {
    id: "performance-analyzer",
    name: "Performance Analyzer",
    description: "Analyze and optimize application performance with actionable recommendations.",
    category: "Enterprise",
    tags: ["performance", "optimization", "profiling", "metrics"],
    platforms: ["Claude Code", "Claude API"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 2123, installs: 12800 },
    updatedAt: "2025-12-16",
    authors: ["Anthropic"],
    version: "2.0.0",
    license: "MIT",
    files: ["analyzer.ts", "metrics/"],
    skillMd: `---
name: Performance Analyzer
description: Analyze and optimize application performance with actionable recommendations.
---

# Performance Analyzer

Identify and fix performance bottlenecks.

## Analysis Areas

- Bundle size optimization
- Runtime performance
- Memory usage
- Network requests
- Rendering performance

## Recommendations

- Code splitting strategies
- Lazy loading opportunities
- Caching improvements
- Database query optimization
`
  },
  {
    id: "color-palette",
    name: "Color Palette Generator",
    description: "Generate harmonious color palettes with accessibility-compliant contrast ratios.",
    category: "Design",
    tags: ["colors", "palette", "accessibility", "design"],
    platforms: ["Claude.ai", "ChatGPT"],
    source: { kind: "website", label: "skillsmp.com", url: "https://skillsmp.com" },
    popularity: { stars: 1234, installs: 7500 },
    updatedAt: "2025-12-11",
    authors: ["SkillsMP Team"],
    version: "1.0.0",
    license: "MIT",
    files: ["generator.ts"],
    skillMd: `---
name: Color Palette Generator
description: Generate harmonious color palettes with accessibility-compliant contrast ratios.
---

# Color Palette Generator

Create beautiful, accessible color palettes.

## Features

- Harmony-based generation
- WCAG contrast compliance
- Dark mode variants
- Export to CSS/Tailwind/Figma
`
  },
  {
    id: "icon-generator",
    name: "SVG Icon Generator",
    description: "Generate custom SVG icons with consistent style and size.",
    category: "Design",
    tags: ["icons", "svg", "graphics", "design"],
    platforms: ["Claude.ai", "Claude API"],
    source: { kind: "github", label: "travisvn/awesome-claude-skills", url: "https://github.com/travisvn/awesome-claude-skills" },
    popularity: { stars: 987, installs: 5400 },
    updatedAt: "2025-12-09",
    authors: ["Travis VN"],
    version: "1.1.0",
    license: "MIT",
    files: ["generator.ts", "templates/"],
    skillMd: `---
name: SVG Icon Generator
description: Generate custom SVG icons with consistent style and size.
---

# SVG Icon Generator

Create custom icons for your projects.

## Features

- Multiple icon styles
- Consistent sizing
- Optimized SVG output
- React component export
`
  },
  {
    id: "data-visualization",
    name: "Data Visualization Generator",
    description: "Generate interactive charts and visualizations from data.",
    category: "Data",
    tags: ["charts", "visualization", "d3", "analytics"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1567, installs: 8900 },
    updatedAt: "2025-12-15",
    authors: ["Anthropic"],
    version: "1.3.0",
    license: "MIT",
    files: ["generator.ts", "chart-types/"],
    skillMd: `---
name: Data Visualization Generator
description: Generate interactive charts and visualizations from data.
---

# Data Visualization Generator

Create stunning data visualizations.

## Chart Types

- Line charts
- Bar charts
- Pie charts
- Scatter plots
- Heatmaps
- Geographic maps
`
  },
  {
    id: "csv-processor",
    name: "CSV Data Processor",
    description: "Process, transform, and analyze CSV files with advanced operations.",
    category: "Data",
    tags: ["csv", "data", "processing", "transform"],
    platforms: ["Claude Code", "Claude.ai", "ChatGPT"],
    source: { kind: "website", label: "skillshunt.io", url: "https://skillshunt.io" },
    popularity: { stars: 1123, installs: 6200 },
    updatedAt: "2025-12-10",
    authors: ["SkillsHunt Team"],
    version: "1.0.0",
    license: "MIT",
    files: ["processor.ts"],
    skillMd: `---
name: CSV Data Processor
description: Process, transform, and analyze CSV files with advanced operations.
---

# CSV Data Processor

Powerful CSV manipulation capabilities.

## Operations

- Filter and sort
- Column transformations
- Aggregations
- Joins and merges
- Data validation
`
  },
  {
    id: "cron-scheduler",
    name: "Cron Job Scheduler",
    description: "Create and manage cron expressions with human-readable descriptions.",
    category: "Automation",
    tags: ["cron", "scheduling", "automation", "jobs"],
    platforms: ["Claude Code", "Codex CLI", "ChatGPT"],
    source: { kind: "github", label: "travisvn/awesome-claude-skills", url: "https://github.com/travisvn/awesome-claude-skills" },
    popularity: { stars: 876, installs: 4800 },
    updatedAt: "2025-12-07",
    authors: ["Travis VN"],
    version: "1.0.0",
    license: "MIT",
    files: ["scheduler.ts"],
    skillMd: `---
name: Cron Job Scheduler
description: Create and manage cron expressions with human-readable descriptions.
---

# Cron Job Scheduler

Easily create and understand cron schedules.

## Features

- Natural language to cron
- Cron to human-readable
- Next run predictions
- Common schedule templates
`
  },
  {
    id: "email-template",
    name: "Email Template Generator",
    description: "Create responsive email templates compatible with major email clients.",
    category: "Automation",
    tags: ["email", "templates", "html", "responsive"],
    platforms: ["Claude.ai", "ChatGPT"],
    source: { kind: "website", label: "skillsmp.com", url: "https://skillsmp.com" },
    popularity: { stars: 1234, installs: 7100 },
    updatedAt: "2025-12-13",
    authors: ["SkillsMP Team"],
    version: "1.2.0",
    license: "MIT",
    files: ["generator.ts", "templates/"],
    skillMd: `---
name: Email Template Generator
description: Create responsive email templates compatible with major email clients.
---

# Email Template Generator

Build email templates that work everywhere.

## Features

- Responsive design
- Dark mode support
- Client compatibility
- Template variables
- Preview generation
`
  },
  {
    id: "kubernetes-manifest",
    name: "Kubernetes Manifest Generator",
    description: "Generate Kubernetes manifests with best practices and security configurations.",
    category: "Automation",
    tags: ["kubernetes", "k8s", "containers", "devops"],
    platforms: ["Claude Code", "Codex CLI"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 2345, installs: 14500 },
    updatedAt: "2025-12-18",
    authors: ["Anthropic"],
    version: "1.4.0",
    license: "MIT",
    files: ["generator.ts", "templates/"],
    skillMd: `---
name: Kubernetes Manifest Generator
description: Generate Kubernetes manifests with best practices and security configurations.
---

# Kubernetes Manifest Generator

Create production-ready Kubernetes configurations.

## Resource Types

- Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- RBAC

## Best Practices

- Resource limits
- Security contexts
- Health checks
- Pod disruption budgets
`
  },
  {
    id: "error-handler",
    name: "Error Handler Generator",
    description: "Generate comprehensive error handling with logging and recovery strategies.",
    category: "Development",
    tags: ["errors", "handling", "logging", "resilience"],
    platforms: ["Claude Code", "Claude API"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1123, installs: 6500 },
    updatedAt: "2025-12-11",
    authors: ["Anthropic"],
    version: "1.1.0",
    license: "MIT",
    files: ["handler.ts", "strategies/"],
    skillMd: `---
name: Error Handler Generator
description: Generate comprehensive error handling with logging and recovery strategies.
---

# Error Handler Generator

Build robust error handling systems.

## Features

- Custom error classes
- Error boundary components
- Retry strategies
- Logging integration
- User-friendly messages
`
  },
  {
    id: "i18n-manager",
    name: "Internationalization Manager",
    description: "Manage translations and internationalization with extraction and validation.",
    category: "Development",
    tags: ["i18n", "translations", "localization", "languages"],
    platforms: ["Claude Code", "Claude.ai"],
    source: { kind: "github", label: "travisvn/awesome-claude-skills", url: "https://github.com/travisvn/awesome-claude-skills" },
    popularity: { stars: 987, installs: 5600 },
    updatedAt: "2025-12-08",
    authors: ["Travis VN"],
    version: "1.0.0",
    license: "MIT",
    files: ["manager.ts", "extractors/"],
    skillMd: `---
name: Internationalization Manager
description: Manage translations and internationalization with extraction and validation.
---

# Internationalization Manager

Streamline your i18n workflow.

## Features

- String extraction
- Translation validation
- Missing key detection
- Pluralization support
- RTL handling
`
  },
  {
    id: "env-manager",
    name: "Environment Manager",
    description: "Manage environment variables across different environments with validation.",
    category: "Development",
    tags: ["environment", "config", "dotenv", "secrets"],
    platforms: ["Claude Code", "Codex CLI"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1456, installs: 8200 },
    updatedAt: "2025-12-14",
    authors: ["Anthropic"],
    version: "1.2.0",
    license: "MIT",
    files: ["manager.ts", "validators/"],
    skillMd: `---
name: Environment Manager
description: Manage environment variables across different environments with validation.
---

# Environment Manager

Organize and validate environment configurations.

## Features

- Environment file generation
- Variable validation
- Secret detection
- Cross-environment sync
- Type generation
`
  },
  {
    id: "migration-generator",
    name: "Database Migration Generator",
    description: "Generate database migrations with rollback support and data preservation.",
    category: "Data",
    tags: ["database", "migrations", "sql", "schema"],
    platforms: ["Claude Code", "Claude API"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 1678, installs: 9800 },
    updatedAt: "2025-12-16",
    authors: ["Anthropic"],
    version: "1.3.0",
    license: "MIT",
    files: ["generator.ts", "templates/"],
    skillMd: `---
name: Database Migration Generator
description: Generate database migrations with rollback support and data preservation.
---

# Database Migration Generator

Create safe database migrations.

## Features

- Up/down migrations
- Data migration support
- Schema validation
- Rollback safety
- Version tracking
`
  },
  {
    id: "mock-data",
    name: "Mock Data Generator",
    description: "Generate realistic mock data for testing and development.",
    category: "Development",
    tags: ["mock", "data", "testing", "faker"],
    platforms: ["Claude Code", "Claude.ai", "ChatGPT"],
    source: { kind: "website", label: "skillshunt.io", url: "https://skillshunt.io" },
    popularity: { stars: 1567, installs: 9100 },
    updatedAt: "2025-12-12",
    authors: ["SkillsHunt Team"],
    version: "1.1.0",
    license: "MIT",
    files: ["generator.ts", "schemas/"],
    skillMd: `---
name: Mock Data Generator
description: Generate realistic mock data for testing and development.
---

# Mock Data Generator

Create realistic test data.

## Data Types

- User profiles
- Addresses
- Products
- Transactions
- Content

## Features

- Schema-based generation
- Relationship support
- Localized data
- Consistent seeds
`
  },
  {
    id: "component-generator",
    name: "React Component Generator",
    description: "Scaffold React components with TypeScript, tests, and stories.",
    category: "Development",
    tags: ["react", "components", "typescript", "scaffold"],
    platforms: ["Claude Code", "Codex CLI"],
    source: { kind: "github", label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
    popularity: { stars: 2345, installs: 15000 },
    updatedAt: "2025-12-19",
    authors: ["Anthropic"],
    version: "2.0.0",
    license: "MIT",
    files: ["generator.ts", "templates/"],
    skillMd: `---
name: React Component Generator
description: Scaffold React components with TypeScript, tests, and stories.
---

# React Component Generator

Quickly scaffold React components.

## Generated Files

- Component file
- TypeScript types
- Unit tests
- Storybook story
- CSS module

## Features

- Multiple patterns (functional, forwardRef)
- Prop type generation
- Default export configuration
- Index file generation
`
  }
];

export const collections: Collection[] = [
  {
    id: "pdf-docs-toolkit",
    name: "PDF & Docs Toolkit",
    description: "Complete toolkit for document processing, analysis, and conversion.",
    icon: "FileText",
    color: "bg-blue-500",
    skillIds: ["pdf-analyzer", "markdown-converter", "code-documentation", "readme-generator", "api-docs-generator"]
  },
  {
    id: "git-workflow",
    name: "Git Workflow",
    description: "Streamline your Git workflow with automated commits, changelogs, and reviews.",
    icon: "GitBranch",
    color: "bg-orange-500",
    skillIds: ["git-commit-message", "changelog-generator", "code-review"]
  },
  {
    id: "security-review",
    name: "Security Review",
    description: "Comprehensive security tools for auditing and compliance.",
    icon: "Shield",
    color: "bg-red-500",
    skillIds: ["security-audit", "license-compliance", "accessibility-audit"]
  },
  {
    id: "design-ops",
    name: "Design Ops",
    description: "Bridge the gap between design and development.",
    icon: "Palette",
    color: "bg-purple-500",
    skillIds: ["figma-to-code", "design-system-generator", "color-palette", "icon-generator"]
  },
  {
    id: "devops-automation",
    name: "DevOps Automation",
    description: "Automate your infrastructure and deployment pipelines.",
    icon: "Settings",
    color: "bg-green-500",
    skillIds: ["github-actions", "docker-compose", "terraform-generator", "kubernetes-manifest"]
  },
  {
    id: "data-engineering",
    name: "Data Engineering",
    description: "Tools for data processing, pipelines, and analysis.",
    icon: "Database",
    color: "bg-cyan-500",
    skillIds: ["sql-query-builder", "data-pipeline", "database-schema", "migration-generator", "csv-processor"]
  },
  {
    id: "testing-quality",
    name: "Testing & Quality",
    description: "Ensure code quality with automated testing and reviews.",
    icon: "CheckCircle",
    color: "bg-emerald-500",
    skillIds: ["test-generator", "code-review", "performance-analyzer", "mock-data"]
  },
  {
    id: "react-essentials",
    name: "React Essentials",
    description: "Essential tools for React development.",
    icon: "Code",
    color: "bg-indigo-500",
    skillIds: ["component-generator", "typescript-migration", "figma-to-code", "design-system-generator"]
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

import { Link } from "react-router-dom";
import { ExternalLink, FileText, Code, Zap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ecosystemLinks = [
  {
    name: "anthropics/skills",
    description: "Official Agent Skills repository from Anthropic with the SKILL.md specification",
    url: "https://github.com/anthropics/skills",
  },
  {
    name: "awesome-claude-skills",
    description: "Community-curated list of Claude skills and resources",
    url: "https://github.com/travisvn/awesome-claude-skills",
  },
  {
    name: "SkillsHunt",
    description: "Discover and generate Claude Skills with AI assistance",
    url: "https://skillshunt.io/",
  },
  {
    name: "SkillsMP",
    description: "Marketplace for Claude skills and AI capabilities",
    url: "https://skillsmp.com/",
  },
  {
    name: "openai/skills",
    description: "OpenAI's skills repository for ChatGPT and Codex",
    url: "https://github.com/openai/skills",
  },
];

export function About() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About SkillsHub</h1>
        <p className="text-lg text-[hsl(var(--muted-foreground))]">
          A community-driven directory for discovering, sharing, and deploying Agent Skills
          following the open SKILL.md standard.
        </p>
      </div>

      {/* What are Skills */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6">What are Agent Skills?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center mb-2">
                <FileText className="h-5 w-5" />
              </div>
              <CardTitle>Modular Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="text-[hsl(var(--muted-foreground))]">
              Skills are reusable, self-contained capabilities that AI assistants can use to 
              accomplish specific tasks. Each skill is a folder containing a <code className="text-xs px-1 py-0.5 bg-[hsl(var(--muted))] rounded">SKILL.md</code> file 
              and any supporting resources.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center mb-2">
                <Zap className="h-5 w-5" />
              </div>
              <CardTitle>Model-Invoked</CardTitle>
            </CardHeader>
            <CardContent className="text-[hsl(var(--muted-foreground))]">
              Skills are automatically activated based on context. The AI reads the skill's 
              description and determines when it's relevant to invoke, making skills feel 
              like natural extensions of the AI's capabilities.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center mb-2">
                <Code className="h-5 w-5" />
              </div>
              <CardTitle>Open Standard</CardTitle>
            </CardHeader>
            <CardContent className="text-[hsl(var(--muted-foreground))]">
              The SKILL.md specification is designed to be platform-agnostic, allowing skills 
              to work across different AI assistants including Claude, ChatGPT, and others 
              that adopt the standard.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center mb-2">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle>Community-Driven</CardTitle>
            </CardHeader>
            <CardContent className="text-[hsl(var(--muted-foreground))]">
              Skills can be shared, forked, and improved by the community. This collaborative 
              ecosystem enables rapid development of new capabilities and best practices.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SKILL.md Specification */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6">SKILL.md Specification</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-[hsl(var(--muted-foreground))] mb-6">
              The minimum viable SKILL.md file requires only two fields in the YAML frontmatter:
            </p>
            <div className="bg-[hsl(var(--muted))] rounded-lg p-4 font-mono text-sm mb-6">
              <pre>{`---
name: Your Skill Name
description: A clear description of what this skill does and when to use it
---

# Your Skill Name

Detailed instructions, examples, and documentation for using this skill.

## Usage

Explain how to use this skill...

## Examples

Provide examples of the skill in action...`}</pre>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Required Fields</h4>
                <ul className="text-sm text-[hsl(var(--muted-foreground))] list-disc list-inside space-y-1">
                  <li><code className="text-xs px-1 py-0.5 bg-[hsl(var(--muted))] rounded">name</code> — The display name of your skill</li>
                  <li><code className="text-xs px-1 py-0.5 bg-[hsl(var(--muted))] rounded">description</code> — A clear description the AI uses to determine when to invoke the skill</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Optional Fields</h4>
                <ul className="text-sm text-[hsl(var(--muted-foreground))] list-disc list-inside space-y-1">
                  <li><code className="text-xs px-1 py-0.5 bg-[hsl(var(--muted))] rounded">version</code> — Semantic version number</li>
                  <li><code className="text-xs px-1 py-0.5 bg-[hsl(var(--muted))] rounded">author</code> — Creator or maintainer</li>
                  <li><code className="text-xs px-1 py-0.5 bg-[hsl(var(--muted))] rounded">tags</code> — Categorization keywords</li>
                  <li><code className="text-xs px-1 py-0.5 bg-[hsl(var(--muted))] rounded">license</code> — License identifier</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Installation */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6">Installing Skills</h2>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h4 className="font-medium mb-2">Global Installation</h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                Install skills globally so they're available across all projects:
              </p>
              <div className="bg-[hsl(var(--muted))] rounded-lg p-3 font-mono text-sm">
                <code>~/.claude/skills/your-skill-name/</code>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Project-Level Installation</h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                Install skills at the project level for project-specific capabilities:
              </p>
              <div className="bg-[hsl(var(--muted))] rounded-lg p-3 font-mono text-sm">
                <code>.claude/skills/your-skill-name/</code>
              </div>
            </div>
            <div className="pt-4 border-t border-[hsl(var(--border))]">
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Simply copy the skill folder (containing SKILL.md) to one of these locations. 
                The AI will automatically discover and use available skills based on context.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Ecosystem */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6">Ecosystem & Resources</h2>
        <div className="grid gap-4">
          {ecosystemLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium group-hover:text-[hsl(var(--primary))] transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {link.description}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto text-center">
        <Card className="bg-[hsl(var(--muted))]/30">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to explore?</h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-6">
              Browse our curated collection of skills or submit your own to share with the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/library">
                  Browse Skills
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/submit">Submit a Skill</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

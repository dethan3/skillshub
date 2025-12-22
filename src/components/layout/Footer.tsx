import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";

const ecosystemLinks = [
  { label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
  { label: "awesome-claude-skills", url: "https://github.com/travisvn/awesome-claude-skills" },
  { label: "SkillsHunt", url: "https://skillshunt.io/" },
  { label: "SkillsMP", url: "https://skillsmp.com/" },
  { label: "openai/skills", url: "https://github.com/openai/skills" },
];

const siteLinks = [
  { label: "Library", href: "/library" },
  { label: "Collections", href: "/collections" },
  { label: "Submit a Skill", href: "/submit" },
  { label: "About & Spec", href: "/about" },
];

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
                <span className="text-sm font-bold text-[hsl(var(--primary-foreground))]">S</span>
              </div>
              <span className="text-xl font-bold">SkillsHub</span>
            </Link>
            <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-md mb-4">
              A community-driven directory for discovering, sharing, and deploying Agent Skills 
              following the open SKILL.md standard. Not an official Anthropic product.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/anthropics/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Site</h3>
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Ecosystem</h3>
            <ul className="space-y-2">
              {ecosystemLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[hsl(var(--border))]">
          <p className="text-sm text-[hsl(var(--muted-foreground))] text-center">
            © {new Date().getFullYear()} SkillsHub. This is a community project showcasing the SKILL.md open standard.
            Not affiliated with Anthropic, OpenAI, or any specific AI provider.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const ecosystemLinks = [
  { label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
  { label: "awesome-claude-skills", url: "https://github.com/travisvn/awesome-claude-skills" },
  { label: "SkillsHunt", url: "https://skillshunt.io/" },
  { label: "SkillsMP", url: "https://skillsmp.com/" },
  { label: "openai/skills", url: "https://github.com/openai/skills" },
];

export function Footer() {
  const { t } = useTranslation();

  const siteLinks = [
    { label: t("common.library"), href: "/library" },
    { label: t("common.collections"), href: "/collections" },
    { label: t("common.submitSkill"), href: "/submit" },
    { label: t("common.about"), href: "/about" },
  ];

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
                <span className="text-sm font-bold text-[hsl(var(--primary-foreground))]">A</span>
              </div>
              <span className="text-xl font-bold">AgentSkills</span>
            </Link>
            <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-md mb-4">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/dethan3/skillshub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.site")}</h3>
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
            <h3 className="font-semibold mb-4">{t("footer.ecosystem")}</h3>
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
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}

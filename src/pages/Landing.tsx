import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Layers, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SkillCard } from "@/components/SkillCard";
import { skills, collections } from "@/data/skills";

const featuredSkills = [...skills]
  .sort((a, b) => (b.popularity?.stars || 0) - (a.popularity?.stars || 0))
  .slice(0, 8);

const quickTags = ["pdf", "frontend-design", "mcp", "testing", "automation"];

export function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState("");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/library?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  return (
    <div className="flex flex-col">
      <SEO />
      {/* Hero Section */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--muted))]/50 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("landing.hero.title")}
              <span className="block text-[hsl(var(--muted-foreground))] text-2xl md:text-3xl font-normal mt-1">{t("landing.hero.subtitle")}</span>
            </h1>
            <p className="text-sm md:text-base text-[hsl(var(--muted-foreground))] mb-6 max-w-xl mx-auto">
              {t("landing.hero.description")}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleHeroSearch} className="max-w-lg mx-auto mb-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                <Input
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder={t("landing.hero.searchPlaceholder")}
                  className="pl-10 h-10 text-sm rounded-lg shadow-sm"
                />
                <Button type="submit" size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 px-2.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </form>

            {/* Quick Tags */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap mb-6">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{t("landing.hero.quickTags")}</span>
              {quickTags.map((tag) => (
                <Link
                  key={tag}
                  to={`/library?q=${tag}`}
                  className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))]/80 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <div className="flex gap-3 justify-center">
              <Button size="sm" asChild>
                <Link to="/library">
                  {t("common.browseSkills")}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link to="/submit">{t("common.submitSkill")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-5 bg-[hsl(var(--muted))]/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-xl font-bold">{skills.length}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">
                {t("landing.stats.skills")}
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">{collections.length}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">
                {t("landing.stats.collections")}
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">
                {new Set(skills.flatMap((s) => s.platforms)).size}
              </div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">
                {t("landing.stats.platforms")}
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">
                {new Set(skills.flatMap((s) => s.tags)).size}
              </div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">
                {t("landing.stats.tags")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold mb-1">{t("landing.featured.title")}</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {t("landing.featured.description")}
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link to="/library">
                {t("common.viewAll")}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Button variant="outline" size="sm" asChild>
              <Link to="/library">
                {t("common.viewAll")}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="py-10 md:py-14 bg-[hsl(var(--muted))]/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold mb-1">{t("landing.collections.title")}</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {t("landing.collections.description")}
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link to="/collections">
                {t("common.allCollections")}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {collections.slice(0, 4).map((collection) => (
              <Link
                key={collection.id}
                to={`/collection/${collection.id}`}
                className="group"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <CardContent className="p-4">
                    <div className={`w-8 h-8 rounded-md ${collection.color} flex items-center justify-center mb-3`}>
                      <Layers className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-[hsl(var(--primary))] transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2 line-clamp-2">
                      {collection.description}
                    </p>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      {collection.skillIds.length} {t("common.skills")}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Button variant="outline" size="sm" asChild>
              <Link to="/collections">
                {t("common.allCollections")}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

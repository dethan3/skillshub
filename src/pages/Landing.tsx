import { Link } from "react-router-dom";
import { ArrowRight, Code, FileText, Building2, Palette, Zap, Database, Repeat, Share2, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SkillCard } from "@/components/SkillCard";
import { skills, collections } from "@/data/skills";

const featuredSkills = skills.slice(0, 8);

export function Landing() {
  const { t } = useTranslation();

  const categories = [
    { name: t("landing.categories.development"), icon: Code, description: t("landing.categories.developmentDesc"), color: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20", key: "Development" },
    { name: t("landing.categories.docs"), icon: FileText, description: t("landing.categories.docsDesc"), color: "bg-green-500/10 hover:bg-green-500/20 border-green-500/20", key: "Docs" },
    { name: t("landing.categories.enterprise"), icon: Building2, description: t("landing.categories.enterpriseDesc"), color: "bg-red-500/10 hover:bg-red-500/20 border-red-500/20", key: "Enterprise" },
    { name: t("landing.categories.design"), icon: Palette, description: t("landing.categories.designDesc"), color: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20", key: "Design" },
    { name: t("landing.categories.automation"), icon: Zap, description: t("landing.categories.automationDesc"), color: "bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/20", key: "Automation" },
    { name: t("landing.categories.data"), icon: Database, description: t("landing.categories.dataDesc"), color: "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20", key: "Data" },
  ];

  const principles = [
    { title: t("landing.openStandard.reusable"), icon: Repeat, description: t("landing.openStandard.reusableDesc") },
    { title: t("landing.openStandard.shareable"), icon: Share2, description: t("landing.openStandard.shareableDesc") },
    { title: t("landing.openStandard.composable"), icon: Layers, description: t("landing.openStandard.composableDesc") },
  ];

  return (
    <div className="flex flex-col">
      <SEO />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--muted))]/50 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {t("landing.hero.title")}
              <span className="block text-[hsl(var(--muted-foreground))]">{t("landing.hero.subtitle")}</span>
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
              {t("landing.hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/library">
                  {t("common.browseSkills")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/submit">{t("common.submitSkill")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("landing.categories.title")}</h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              {t("landing.categories.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.key}
                to={`/library?category=${category.key}`}
                className={`group p-6 md:p-8 rounded-2xl border transition-all duration-200 ${category.color}`}
              >
                <category.icon className="h-8 w-8 mb-4 text-[hsl(var(--foreground))]" />
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {category.description}
                </p>
                <div className="mt-4 text-sm font-medium flex items-center gap-1 text-[hsl(var(--foreground))] opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("common.explore")} <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Open Standard Section */}
      <section className="py-16 md:py-24 bg-[hsl(var(--muted))]/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("landing.openStandard.title")}</h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              {t("landing.openStandard.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((principle) => (
              <Card key={principle.title} className="bg-[hsl(var(--background))]">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--muted))] mb-4">
                    <principle.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link to="/about">{t("common.learnMore")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t("landing.featured.title")}</h2>
              <p className="text-[hsl(var(--muted-foreground))]">
                {t("landing.featured.description")}
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link to="/library">
                {t("common.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/library">
                {t("common.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="py-16 md:py-24 bg-[hsl(var(--muted))]/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t("landing.collections.title")}</h2>
              <p className="text-[hsl(var(--muted-foreground))]">
                {t("landing.collections.description")}
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link to="/collections">
                {t("common.allCollections")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {collections.slice(0, 4).map((collection) => (
              <Link
                key={collection.id}
                to={`/collection/${collection.id}`}
                className="group"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`w-10 h-10 rounded-lg ${collection.color} flex items-center justify-center mb-4`}>
                      <Layers className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 line-clamp-2">
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
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/collections">
                {t("common.allCollections")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

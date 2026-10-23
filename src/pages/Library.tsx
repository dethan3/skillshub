import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { BASE_URL } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkillCard } from "@/components/SkillCard";
import { SkillCardSkeleton } from "@/components/SkillCardSkeleton";
import { skills, authors } from "@/data/skills";
import type { Category, Platform } from "@/data/types";

const categories: Category[] = ["Development", "Docs", "Enterprise", "Design", "Data", "Automation", "Other"];
const platforms: Platform[] = ["Claude Code", "Claude.ai", "Claude API", "Codex CLI", "ChatGPT"];
const topAuthorIds = authors.slice(0, 10).map((a) => a.id);

export function Library() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const sortOptions = [
    { value: "popular", label: t("library.mostPopular") },
    { value: "trending", label: t("library.trending") },
    { value: "recent", label: t("library.recentlyUpdated") },
    { value: "az", label: t("library.alphabetical") },
  ];
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",").filter(Boolean) || []
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    searchParams.get("platform")?.split(",").filter(Boolean) || []
  );
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(
    searchParams.get("author")?.split(",").filter(Boolean) || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [rankingTime] = useState(() => Date.now());

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategories.length) params.set("category", selectedCategories.join(","));
    if (selectedPlatforms.length) params.set("platform", selectedPlatforms.join(","));
    if (selectedAuthors.length) params.set("author", selectedAuthors.join(","));
    if (sortBy !== "popular") params.set("sort", sortBy);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategories, selectedPlatforms, selectedAuthors, sortBy, setSearchParams]);

  const filteredSkills = useMemo(() => {
    let result = [...skills];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (skill) =>
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          skill.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          skill.authors?.some((a) => a.toLowerCase().includes(query))
      );
    }

    if (selectedCategories.length) {
      result = result.filter((skill) => selectedCategories.includes(skill.category));
    }

    if (selectedPlatforms.length) {
      result = result.filter((skill) =>
        skill.platforms.some((p) => selectedPlatforms.includes(p))
      );
    }

    if (selectedAuthors.length) {
      result = result.filter((skill) =>
        skill.authors?.some((a) => selectedAuthors.includes(a.toLowerCase()))
      );
    }

    switch (sortBy) {
      case "recent":
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case "trending": {
        const dayMs = 86400000;
        result.sort((a, b) => {
          const aAge = Math.max(1, (rankingTime - new Date(a.updatedAt).getTime()) / dayMs);
          const bAge = Math.max(1, (rankingTime - new Date(b.updatedAt).getTime()) / dayMs);
          const aScore = (a.popularity?.stars || 0) / aAge;
          const bScore = (b.popularity?.stars || 0) / bAge;
          return bScore - aScore;
        });
        break;
      }
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popular":
      default:
        result.sort((a, b) => (b.popularity?.stars || 0) - (a.popularity?.stars || 0));
    }

    return result;
  }, [searchQuery, selectedCategories, selectedPlatforms, selectedAuthors, sortBy, rankingTime]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const toggleAuthor = (authorId: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorId) ? prev.filter((a) => a !== authorId) : [...prev, authorId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedPlatforms([]);
    setSelectedAuthors([]);
    setSortBy("popular");
  };

  const hasActiveFilters = !!(searchQuery || selectedCategories.length || selectedPlatforms.length || selectedAuthors.length);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat] = skills.filter((s) => s.category === cat).length;
    }
    return counts;
  }, []);

  const platformCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const plat of platforms) {
      counts[plat] = skills.filter((s) => s.platforms.includes(plat)).length;
    }
    return counts;
  }, []);

  const authorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const author of authors) {
      counts[author.id] = author.skillCount;
    }
    return counts;
  }, []);

  const popularTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    for (const skill of skills) {
      for (const tag of skill.tags) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    }
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, []);

  const suggestedSearches = ["pdf", "mcp", "testing", "automation", "frontend-design"];

  const filterContent = (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-sm mb-2">{t("library.categories")}</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-1.5">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer flex-1"
              >
                {category}
              </Label>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                {categoryCounts[category]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-sm mb-2">{t("library.platforms")}</h3>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center space-x-1.5">
              <Checkbox
                id={`platform-${platform}`}
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={() => togglePlatform(platform)}
              />
              <Label
                htmlFor={`platform-${platform}`}
                className="text-sm cursor-pointer flex-1"
              >
                {platform}
              </Label>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                {platformCounts[platform]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Authors */}
      {topAuthorIds.length > 0 && (
        <div>
          <h3 className="font-medium text-sm mb-2">{t("library.authors")}</h3>
          <div className="space-y-2">
            {topAuthorIds.map((authorId) => {
              const author = authors.find((a) => a.id === authorId);
              if (!author) return null;
              return (
                <div key={authorId} className="flex items-center space-x-1.5">
                  <Checkbox
                    id={`author-${authorId}`}
                    checked={selectedAuthors.includes(authorId)}
                    onCheckedChange={() => toggleAuthor(authorId)}
                  />
                  <Label
                    htmlFor={`author-${authorId}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {author.name}
                    {author.isKol && (
                      <span className="ml-1 text-xs text-[hsl(var(--primary))]">{t("library.kol")}</span>
                    )}
                  </Label>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    {authorCounts[authorId] || 0}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Popular Tags */}
      <div>
        <h3 className="font-medium text-sm mb-2 flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              to={`/library?q=${tag}`}
              className="text-xs px-2 py-1 bg-[hsl(var(--muted))] rounded-md hover:bg-[hsl(var(--muted))]/80 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          {t("common.clearFilters")}
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
      <SEO
        title={t("seo.libraryTitle")}
        description={t("seo.libraryDescription")}
        url={`${BASE_URL}/library`}
      />
      <div className="mb-5">
        <h1 className="text-xl font-bold mb-1">{t("library.title")}</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {t("library.description", { count: skills.length })}
        </p>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
          <Input
            placeholder={t("library.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] h-9 text-sm">
              <SelectValue placeholder={t("library.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("library.filters")}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                {filterContent}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              {category}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {selectedPlatforms.map((platform) => (
            <Badge
              key={platform}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => togglePlatform(platform)}
            >
              {platform}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {selectedAuthors.map((authorId) => {
            const author = authors.find((a) => a.id === authorId);
            return (
              <Badge
                key={authorId}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleAuthor(authorId)}
              >
                {author?.name || authorId}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            );
          })}
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20">
            {filterContent}
          </div>
        </aside>

        {/* Skills Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkillCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-semibold mb-1">{t("library.emptyTitle")}</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-5">
                {t("library.emptyDesc")}
              </p>
              <div className="mb-5">
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">{t("library.trySearches")}</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {suggestedSearches.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(tag);
                        setSelectedCategories([]);
                        setSelectedPlatforms([]);
                      }}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">{t("library.browseByCategory")}</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {categories.filter((c) => c !== "Other").map((cat) => (
                    <Button
                      key={cat}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategories([cat]);
                        setSelectedPlatforms([]);
                      }}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
              <Button variant="outline" onClick={clearFilters}>
                {t("common.clearFilters")}
              </Button>
            </div>
          ) : (
            <>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
                {t("library.showingResults", { count: filteredSkills.length })}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                {filteredSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

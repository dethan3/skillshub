import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
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
import { skills } from "@/data/skills";
import type { Category, Platform } from "@/data/types";

const categories: Category[] = ["Development", "Docs", "Enterprise", "Design", "Data", "Automation", "Other"];
const platforms: Platform[] = ["Claude Code", "Claude.ai", "Claude API", "Codex CLI", "ChatGPT"];

export function Library() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const sortOptions = [
    { value: "popular", label: t("library.mostPopular") },
    { value: "recent", label: t("library.recentlyUpdated") },
    { value: "az", label: t("library.alphabetical") },
  ];
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",").filter(Boolean) || []
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    searchParams.get("platform")?.split(",").filter(Boolean) || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategories.length) params.set("category", selectedCategories.join(","));
    if (selectedPlatforms.length) params.set("platform", selectedPlatforms.join(","));
    if (sortBy !== "popular") params.set("sort", sortBy);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategories, selectedPlatforms, sortBy, setSearchParams]);

  const filteredSkills = useMemo(() => {
    let result = [...skills];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (skill) =>
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          skill.tags.some((tag) => tag.toLowerCase().includes(query))
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

    switch (sortBy) {
      case "recent":
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popular":
      default:
        result.sort((a, b) => (b.popularity?.stars || 0) - (a.popularity?.stars || 0));
    }

    return result;
  }, [searchQuery, selectedCategories, selectedPlatforms, sortBy]);

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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedPlatforms([]);
    setSortBy("popular");
  };

  const hasActiveFilters = !!(searchQuery || selectedCategories.length || selectedPlatforms.length);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">{t("library.categories")}</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">{t("library.platforms")}</h3>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={`platform-${platform}`}
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={() => togglePlatform(platform)}
              />
              <Label
                htmlFor={`platform-${platform}`}
                className="text-sm cursor-pointer"
              >
                {platform}
              </Label>
            </div>
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
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <SEO
        title={t("seo.libraryTitle")}
        description={t("seo.libraryDescription")}
        url="https://skillshub.dev/library"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("library.title")}</h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          {t("library.description", { count: skills.length })}
        </p>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <Input
            placeholder={t("library.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
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
                <FilterContent />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
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
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <FilterContent />
          </div>
        </aside>

        {/* Skills Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkillCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[hsl(var(--muted-foreground))] mb-4">
                {t("library.noResults")}
              </p>
              <Button variant="outline" onClick={clearFilters}>
                {t("common.clearFilters")}
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                {t("library.showingResults", { count: filteredSkills.length })}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
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

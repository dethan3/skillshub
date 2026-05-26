import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Search, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { BASE_URL } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authors } from "@/data/skills";

export function Authors() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("skills");
  const [kolOnly, setKolOnly] = useState(false);

  const filteredAuthors = useMemo(() => {
    let result = [...authors];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q)
      );
    }

    if (kolOnly) {
      result = result.filter((a) => a.isKol);
    }

    switch (sortBy) {
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "skills":
      default:
        result.sort((a, b) => b.skillCount - a.skillCount);
    }

    return result;
  }, [searchQuery, sortBy, kolOnly]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <SEO
        title={t("authors.title")}
        description={t("authors.description")}
        url={`${BASE_URL}/authors`}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("authors.title")}</h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          {t("authors.description")}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <Input
            placeholder={t("authors.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t("authors.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="skills">{t("authors.mostSkills")}</SelectItem>
              <SelectItem value="az">{t("authors.alphabetical")}</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={kolOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setKolOnly(!kolOnly)}
          >
            <Award className="h-4 w-4 mr-1.5" />
            {t("authors.kolOnly")}
          </Button>
        </div>
      </div>

      {/* Authors Grid */}
      {filteredAuthors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[hsl(var(--muted-foreground))]">{t("authors.noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredAuthors.map((author) => (
            <Link key={author.id} to={`/author/${author.id}`} className="group">
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={author.avatarUrl}
                      alt={author.name}
                      className="w-10 h-10 rounded-full"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate group-hover:text-[hsl(var(--primary))] transition-colors">
                        {author.name}
                      </h3>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        @{author.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                      {t("authors.skillsCount", { count: author.skillCount })}
                    </span>
                    {author.isKol && (
                      <Badge variant="secondary" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {t("authors.kol")}
                      </Badge>
                    )}
                  </div>
                  {author.isKol && author.kolNote && (
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 line-clamp-2">
                      {author.kolNote}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

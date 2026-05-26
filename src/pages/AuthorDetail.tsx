import { useParams, Link } from "react-router-dom";
import { ChevronRight, Github, Twitter, Award, Users } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillCard } from "@/components/SkillCard";
import { getAuthorById, getSkillsByAuthor } from "@/data/skills";
import { SEO } from "@/components/SEO";
import { BASE_URL } from "@/lib/constants";

export function AuthorDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const author = useMemo(() => (id ? getAuthorById(id) : undefined), [id]);
  const authorSkills = useMemo(
    () => (id ? getSkillsByAuthor(id) : []),
    [id]
  );

  if (!author) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("authorDetail.notFound")}</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          {t("authorDetail.notFoundDesc")}
        </p>
        <Button asChild>
          <Link to="/authors">{t("authorDetail.browseAll")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <SEO
        title={author.name}
        description={author.kolNote || `${author.name} - ${authorSkills.length} skills`}
        url={`${BASE_URL}/author/${author.id}`}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mb-6">
        <Link to="/authors" className="hover:text-[hsl(var(--foreground))]">
          {t("common.authors")}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[hsl(var(--foreground))]">{author.name}</span>
      </nav>

      {/* Header */}
      <div className="bg-[hsl(var(--muted))]/30 rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <img
            src={author.avatarUrl}
            alt={author.name}
            className="w-20 h-20 rounded-2xl shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">{author.name}</h1>
              {author.isKol && (
                <Badge variant="secondary">
                  <Award className="h-3.5 w-3.5 mr-1" />
                  {t("authors.kol")}
                </Badge>
              )}
            </div>
            <p className="text-[hsl(var(--muted-foreground))] mb-3">@{author.id}</p>
            {author.kolNote && (
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                {author.kolNote}
              </p>
            )}
            <div className="flex items-center gap-4">
              <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-1">
                <Users className="h-4 w-4" />
                {t("authors.skillsCount", { count: authorSkills.length })}
              </span>
              {author.githubUrl && (
                <a
                  href={author.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-1 hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  <Github className="h-4 w-4" />
                  {t("authorDetail.github")}
                </a>
              )}
              {author.twitterHandle && (
                <a
                  href={`https://x.com/${author.twitterHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-1 hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  @{author.twitterHandle}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <h2 className="text-2xl font-bold mb-6">
        {t("authorDetail.skillsByAuthor", { name: author.name })}
      </h2>
      {authorSkills.length === 0 ? (
        <p className="text-[hsl(var(--muted-foreground))] text-center py-8">
          No skills found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {authorSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}

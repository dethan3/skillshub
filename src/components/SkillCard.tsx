import { Link } from "react-router-dom";
import { Star, Clock, ExternalLink, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Skill } from "@/data/types";

interface SkillCardProps {
  skill: Skill;
  showQuickView?: boolean;
}

export function SkillCard({ skill, showQuickView = true }: SkillCardProps) {
  const { t, i18n } = useTranslation();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === "zh" ? "zh-CN" : "en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <Card className="group flex flex-col h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-[hsl(var(--primary))]/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/skill/${skill.id}`} className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-[hsl(var(--primary))] transition-colors truncate">
              {skill.name}
            </h3>
          </Link>
          {skill.popularity?.stars ? (
            <div className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] shrink-0">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{skill.popularity.stars.toLocaleString()}</span>
            </div>
          ) : null}
        </div>
        <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2 mt-1">
          {skill.description}
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 pb-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary">{skill.category}</Badge>
          {skill.platforms.slice(0, 2).map((platform) => (
            <Badge key={platform} variant="outline" className="text-xs">
              {platform}
            </Badge>
          ))}
          {skill.platforms.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{skill.platforms.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-[hsl(var(--border))] flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatDate(skill.updatedAt)}</span>
          </div>
          <a
            href={skill.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[hsl(var(--foreground))] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3 w-3" />
            <span className="truncate max-w-20">{skill.source.label}</span>
          </a>
        </div>
        {showQuickView && (
          <Button variant="ghost" size="sm" asChild className="h-7 px-2">
            <Link to={`/skill/${skill.id}`}>
              <Eye className="h-3 w-3 mr-1" />
              {t("skillCard.view")}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

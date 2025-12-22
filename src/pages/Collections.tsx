import { Link } from "react-router-dom";
import { Layers, ArrowRight, FileText, GitBranch, Shield, Palette, Settings, Database, CheckCircle, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { collections, getSkillsByIds } from "@/data/skills";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  GitBranch,
  Shield,
  Palette,
  Settings,
  Database,
  CheckCircle,
  Code,
  Layers,
};

export function Collections() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Curated Collections</h1>
        <p className="text-[hsl(var(--muted-foreground))] max-w-2xl">
          Hand-picked skill bundles for common workflows. Each collection groups related skills
          that work well together for specific use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => {
          const Icon = iconMap[collection.icon] || Layers;
          const skills = getSkillsByIds(collection.skillIds);

          return (
            <Link key={collection.id} to={`/collection/${collection.id}`} className="group">
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${collection.color} flex items-center justify-center shrink-0`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                        {collection.name}
                      </h2>
                      <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        {collection.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {skills.slice(0, 3).map((skill) => (
                          <Badge key={skill.id} variant="secondary" className="text-xs">
                            {skill.name}
                          </Badge>
                        ))}
                        {skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--foreground))]">
                        <span>{collection.skillIds.length} skills</span>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { ChevronRight, Layers, FileText, GitBranch, Shield, Palette, Settings, Database, CheckCircle, Code } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/SkillCard";
import { getCollectionById, getSkillsByIds } from "@/data/skills";

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

export function CollectionDetail() {
  const { id } = useParams<{ id: string }>();
  const collection = useMemo(() => (id ? getCollectionById(id) : undefined), [id]);
  const skills = useMemo(
    () => (collection ? getSkillsByIds(collection.skillIds) : []),
    [collection]
  );

  if (!collection) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          The collection you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/collections">Browse all collections</Link>
        </Button>
      </div>
    );
  }

  const Icon = iconMap[collection.icon] || Layers;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mb-6">
        <Link to="/collections" className="hover:text-[hsl(var(--foreground))]">
          Collections
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[hsl(var(--foreground))]">{collection.name}</span>
      </nav>

      {/* Header */}
      <div className="bg-[hsl(var(--muted))]/30 rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl ${collection.color} flex items-center justify-center shrink-0`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{collection.name}</h1>
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-4">
              {collection.description}
            </p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {skills.length} skills in this collection
            </p>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}

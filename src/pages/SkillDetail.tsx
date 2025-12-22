import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Copy, ExternalLink, Star, Clock, FileCode, Check, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { SkillCard } from "@/components/SkillCard";
import { getSkillById, getRelatedSkills } from "@/data/skills";
import { useToast } from "@/hooks/use-toast";

export function SkillDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const skill = useMemo(() => (id ? getSkillById(id) : undefined), [id]);
  const relatedSkills = useMemo(() => (skill ? getRelatedSkills(skill, 6) : []), [skill]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  const installCommand = skill
    ? skill.source.kind === "github"
      ? `# Clone the skill repository\ngit clone ${skill.source.url}\n\n# Copy to your skills directory\ncp -r skills/${skill.id} ~/.claude/skills/`
      : `# Visit the skill source\n# ${skill.source.url}\n\n# Download and copy to your skills directory\ncp -r ${skill.id} ~/.claude/skills/`
    : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Install command has been copied.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-96 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full" />
          </div>
          <div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Skill not found</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          The skill you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/library">Browse all skills</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mb-6">
        <Link to="/library" className="hover:text-[hsl(var(--foreground))]">
          Library
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[hsl(var(--foreground))]">{skill.name}</span>
      </nav>

      {/* Header */}
      <div className="bg-[hsl(var(--muted))]/30 rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{skill.name}</h1>
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-4">
              {skill.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{skill.category}</Badge>
              {skill.platforms.map((platform) => (
                <Badge key={platform} variant="outline">
                  {platform}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--muted-foreground))]">
              {skill.popularity?.stars && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{skill.popularity.stars.toLocaleString()} stars</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Updated {formatDate(skill.updatedAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Install Command
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <a href={skill.source.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Source
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="readme" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="readme">README</TabsTrigger>
              <TabsTrigger value="install">Installation</TabsTrigger>
              {skill.files && skill.files.length > 0 && (
                <TabsTrigger value="files">Files</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="readme">
              <Card>
                <CardContent className="p-6 prose prose-neutral dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize, rehypeHighlight]}
                  >
                    {skill.skillMd}
                  </ReactMarkdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="install">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Installation Instructions</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mb-4">
                    To use this skill, copy it to your Claude skills directory:
                  </p>
                  <div className="bg-[hsl(var(--muted))] rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre>{installCommand}</pre>
                  </div>
                  <div className="mt-6 p-4 bg-[hsl(var(--muted))]/50 rounded-lg">
                    <h4 className="font-medium mb-2">Skill Directory Locations</h4>
                    <ul className="text-sm text-[hsl(var(--muted-foreground))] space-y-1">
                      <li>
                        <strong>Global:</strong> <code className="text-xs">~/.claude/skills/</code>
                      </li>
                      <li>
                        <strong>Project:</strong> <code className="text-xs">.claude/skills/</code> (in your project root)
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {skill.files && skill.files.length > 0 && (
              <TabsContent value="files">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Skill Files</h3>
                    <div className="space-y-2">
                      {skill.files.map((file) => (
                        <div
                          key={file}
                          className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))]/50 rounded-lg"
                        >
                          <FileCode className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                          <span className="font-mono text-sm">{file}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <dt className="text-sm text-[hsl(var(--muted-foreground))]">Source</dt>
                <dd className="mt-1">
                  <a
                    href={skill.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center gap-1 hover:underline"
                  >
                    {skill.source.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </dd>
              </div>
              {skill.version && (
                <div>
                  <dt className="text-sm text-[hsl(var(--muted-foreground))]">Version</dt>
                  <dd className="mt-1 text-sm">{skill.version}</dd>
                </div>
              )}
              {skill.license && (
                <div>
                  <dt className="text-sm text-[hsl(var(--muted-foreground))]">License</dt>
                  <dd className="mt-1 text-sm">{skill.license}</dd>
                </div>
              )}
              {skill.authors && skill.authors.length > 0 && (
                <div>
                  <dt className="text-sm text-[hsl(var(--muted-foreground))]">Authors</dt>
                  <dd className="mt-1 text-sm">{skill.authors.join(", ")}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-[hsl(var(--muted-foreground))]">Tags</dt>
                <dd className="mt-2 flex flex-wrap gap-1">
                  {skill.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/library?q=${tag}`}
                      className="text-xs px-2 py-1 bg-[hsl(var(--muted))] rounded-md hover:bg-[hsl(var(--muted))]/80"
                    >
                      {tag}
                    </Link>
                  ))}
                </dd>
              </div>
            </CardContent>
          </Card>

          {/* Related Skills */}
          {relatedSkills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedSkills.slice(0, 4).map((related) => (
                  <Link
                    key={related.id}
                    to={`/skill/${related.id}`}
                    className="block p-3 rounded-lg bg-[hsl(var(--muted))]/50 hover:bg-[hsl(var(--muted))] transition-colors"
                  >
                    <h4 className="font-medium text-sm mb-1">{related.name}</h4>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-2">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* More Related Skills */}
      {relatedSkills.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">More Related Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {relatedSkills.map((related) => (
              <SkillCard key={related.id} skill={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

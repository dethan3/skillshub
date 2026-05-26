import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Copy, ExternalLink, Star, Clock, FileCode, Check, ChevronRight, AlertCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { SkillCard } from "@/components/SkillCard";
import { getSkillById, getRelatedSkills } from "@/data/skills";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { JsonLd } from "@/components/JsonLd";
import { BASE_URL } from "@/lib/constants";

export function SkillDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [readmeCopied, setReadmeCopied] = useState(false);
  const [installTab, setInstallTab] = useState<"global" | "project">("global");
  const [installCopied, setInstallCopied] = useState(false);

  const skill = useMemo(() => (id ? getSkillById(id) : undefined), [id]);
  const relatedSkills = useMemo(() => (skill ? getRelatedSkills(skill, 6) : []), [skill]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  const installCommands = skill
    ? {
        global: skill.source.kind === "github"
          ? `git clone ${skill.source.url}\ncp -r skills/${skill.id} ~/.claude/skills/`
          : `# Download from: ${skill.source.url}\ncp -r ${skill.id} ~/.claude/skills/`,
        project: skill.source.kind === "github"
          ? `git clone ${skill.source.url}\ncp -r skills/${skill.id} .claude/skills/`
          : `# Download from: ${skill.source.url}\ncp -r ${skill.id} .claude/skills/`,
      }
    : { global: "", project: "" };

  const handleInstallCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommands[installTab]);
      setInstallCopied(true);
      toast({ title: "Copied to clipboard", description: "Install command has been copied." });
      setTimeout(() => setInstallCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", description: "Please copy the command manually.", variant: "destructive" });
    }
  };

  const handleReadmeCopy = async () => {
    if (!skill?.skillMd) return;
    try {
      await navigator.clipboard.writeText(skill.skillMd);
      setReadmeCopied(true);
      toast({ title: "Copied to clipboard", description: "SKILL.md content has been copied." });
      setTimeout(() => setReadmeCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", description: "Please copy the content manually.", variant: "destructive" });
    }
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
        <h1 className="text-2xl font-bold mb-4">{t("skillDetail.notFound")}</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          {t("skillDetail.notFoundDesc")}
        </p>
        <Button asChild>
          <Link to="/library">{t("skillDetail.browseAll")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
      <SEO
        title={skill.name}
        description={skill.description}
        url={`${BASE_URL}/skill/${skill.id}`}
        type="article"
        keywords={skill.tags.join(", ")}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: skill.name,
          description: skill.description,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          url: `${BASE_URL}/skill/${skill.id}`,
          author: skill.authors?.[0]
            ? { "@type": "Organization", name: skill.authors[0] }
            : undefined,
          dateModified: skill.updatedAt,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] mb-4">
        <Link to="/library" className="hover:text-[hsl(var(--foreground))]">
          {t("common.library")}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[hsl(var(--foreground))]">{skill.name}</span>
      </nav>

      {/* Header */}
      <div className="bg-[hsl(var(--muted))]/30 rounded-xl p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{skill.name}</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
              {skill.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge className="text-xs">{skill.category}</Badge>
              {skill.platforms.map((platform) => (
                <Badge key={platform} variant="outline" className="text-xs">
                  {platform}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
              {skill.popularity?.stars ? (
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span>{skill.popularity.stars.toLocaleString()} stars</span>
                </div>
              ) : null}
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Updated {formatDate(skill.updatedAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={skill.source.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                {t("skillDetail.viewSource")}
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`${skill.source.url}/issues/new`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                {t("skillDetail.reportIssue")}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Install Experience */}
      <div className="mb-6 p-4 bg-[hsl(var(--muted))]/50 rounded-lg border border-[hsl(var(--border))]">
        <h3 className="font-semibold text-sm mb-3">{t("skillDetail.installation")}</h3>
        <div className="flex gap-1.5 mb-3">
          <Button
            variant={installTab === "global" ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setInstallTab("global")}
          >
            {t("skillDetail.installGlobal")}
          </Button>
          <Button
            variant={installTab === "project" ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setInstallTab("project")}
          >
            {t("skillDetail.installProject")}
          </Button>
        </div>
        <div className="relative">
          <div className="bg-[hsl(var(--muted))] rounded-md p-3 font-mono text-xs overflow-x-auto">
            <pre>{installCommands[installTab]}</pre>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-1.5 right-1.5 h-6 px-2 text-xs"
            onClick={handleInstallCopy}
          >
            {installCopied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
          {t("skillDetail.autoDiscover")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="readme" className="w-full">
            <TabsList className="mb-3 h-8">
              <TabsTrigger value="readme" className="text-xs px-3">README</TabsTrigger>
              {skill.files && skill.files.length > 0 && (
                <TabsTrigger value="files" className="text-xs px-3">Files</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="readme">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                  <CardTitle className="text-sm">SKILL.md</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReadmeCopy}
                    className="h-7 text-xs"
                  >
                    {readmeCopied ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="pt-0 px-4 pb-4">
                  <div className="markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeSanitize, rehypeHighlight]}
                    >
                      {skill.skillMd}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {skill.files && skill.files.length > 0 && (
              <TabsContent value="files">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-3">{t("skillDetail.skillContent")}</h3>
                    <div className="space-y-1.5">
                      {skill.files.map((file) => (
                        <div
                          key={file}
                          className="flex items-center gap-2 p-2 bg-[hsl(var(--muted))]/50 rounded-md"
                        >
                          <FileCode className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                          <span className="font-mono text-xs">{file}</span>
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
        <div className="space-y-4">
          {/* Metadata Card */}
          <Card>
            <CardHeader className="pt-4 pb-2 px-4">
              <CardTitle className="text-sm">{t("skillDetail.details")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4">
              <div>
                <dt className="text-xs text-[hsl(var(--muted-foreground))]">{t("skillDetail.source")}</dt>
                <dd className="mt-0.5">
                  <a
                    href={skill.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 hover:underline"
                  >
                    {skill.source.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </dd>
              </div>
              {skill.version && (
                <div>
                  <dt className="text-xs text-[hsl(var(--muted-foreground))]">{t("skillDetail.version")}</dt>
                  <dd className="mt-0.5 text-xs">{skill.version}</dd>
                </div>
              )}
              {skill.license && (
                <div>
                  <dt className="text-xs text-[hsl(var(--muted-foreground))]">{t("skillDetail.license")}</dt>
                  <dd className="mt-0.5 text-xs">{skill.license}</dd>
                </div>
              )}
              {skill.authors && skill.authors.length > 0 && (
                <div>
                  <dt className="text-xs text-[hsl(var(--muted-foreground))]">{t("skillDetail.authors")}</dt>
                  <dd className="mt-0.5 text-xs">
                    {skill.authors.map((author, i) => (
                      <span key={author}>
                        {i > 0 && ", "}
                        <Link
                          to={`/author/${encodeURIComponent(author.toLowerCase())}`}
                          className="hover:text-[hsl(var(--primary))] transition-colors"
                        >
                          {author}
                        </Link>
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {skill.recommendedBy && skill.recommendedBy.length > 0 && (
                <div>
                  <dt className="text-xs text-[hsl(var(--muted-foreground))]">{t("skillDetail.recommendedBy")}</dt>
                  <dd className="mt-0.5 text-xs">
                    {skill.recommendedBy.map((kolId, i) => (
                      <span key={kolId}>
                        {i > 0 && ", "}
                        <Link
                          to={`/author/${kolId}`}
                          className="hover:text-[hsl(var(--primary))] transition-colors"
                        >
                          @{kolId}
                        </Link>
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {skill.commitFrequency && (
                <div>
                  <dt className="text-xs text-[hsl(var(--muted-foreground))]">{t("skillDetail.commitFrequency")}</dt>
                  <dd className="mt-0.5 text-xs">{t(`skillDetail.${skill.commitFrequency}`)}</dd>
                </div>
              )}
              {skill.contributorCount && skill.contributorCount > 0 && (
                <div>
                  <dt className="text-xs text-[hsl(var(--muted-foreground))]">{t("skillDetail.contributors")}</dt>
                  <dd className="mt-0.5 text-xs">{skill.contributorCount}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-[hsl(var(--muted-foreground))]">{t("skillDetail.tags")}</dt>
                <dd className="mt-1.5 flex flex-wrap gap-1">
                  {skill.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/library?q=${tag}`}
                      className="text-xs px-1.5 py-0.5 bg-[hsl(var(--muted))] rounded hover:bg-[hsl(var(--muted))]/80"
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
              <CardHeader className="pt-4 pb-2 px-4">
                <CardTitle className="text-sm">{t("skillDetail.youMightAlsoLike")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-4 pb-4">
                {relatedSkills.slice(0, 4).map((related) => (
                  <Link
                    key={related.id}
                    to={`/skill/${related.id}`}
                    className="block p-2.5 rounded-md bg-[hsl(var(--muted))]/50 hover:bg-[hsl(var(--muted))] transition-colors"
                  >
                    <h4 className="font-medium text-xs mb-0.5">{related.name}</h4>
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
        <section className="mt-10">
          <h2 className="text-lg font-bold mb-4">{t("skillDetail.youMightAlsoLike")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {relatedSkills.map((related) => (
              <SkillCard key={related.id} skill={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

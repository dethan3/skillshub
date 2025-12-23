import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Category, Platform } from "@/data/types";

const categories: Category[] = ["Development", "Docs", "Enterprise", "Design", "Data", "Automation", "Other"];
const platforms: Platform[] = ["Claude Code", "Claude.ai", "Claude API", "Codex CLI", "ChatGPT"];

interface SubmissionForm {
  repoUrl: string;
  name: string;
  description: string;
  category: Category | "";
  platforms: Platform[];
  tags: string;
}

export function Submit() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<SubmissionForm>({
    repoUrl: "",
    name: "",
    description: "",
    category: "",
    platforms: [],
    tags: "",
  });

  const handlePlatformToggle = (platform: Platform) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.repoUrl || !form.name || !form.description || !form.category) {
      toast({
        title: t("submit.missingFields"),
        description: t("submit.fillRequired"),
        variant: "destructive",
      });
      return;
    }

    const submissions = JSON.parse(localStorage.getItem("skillshub-submissions") || "[]");
    submissions.push({
      ...form,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: "pending",
    });
    localStorage.setItem("skillshub-submissions", JSON.stringify(submissions));

    setSubmitted(true);
    toast({
      title: t("submit.skillSubmitted"),
      description: t("submit.addedToQueue"),
    });
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">{t("submit.submissionReceived")}</h1>
            <p className="text-[hsl(var(--muted-foreground))] mb-6">
              {t("submit.submissionThanks")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setSubmitted(false)}>{t("submit.submitAnother")}</Button>
              <Button variant="outline" asChild>
                <Link to="/library">{t("common.browseSkills")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <SEO
        title={t("seo.submitTitle")}
        description={t("seo.submitDescription")}
        url="https://skillshub.dev/submit"
      />
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("submit.title")}</h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            {t("submit.description")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("submit.skillInfo")}</CardTitle>
                <CardDescription>
                  {t("submit.skillInfoDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="repoUrl">{t("submit.repoUrl")} *</Label>
                    <Input
                      id="repoUrl"
                      type="url"
                      placeholder={t("submit.repoUrlPlaceholder")}
                      value={form.repoUrl}
                      onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                      required
                    />
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {t("submit.repoUrlHelp")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">{t("submit.skillName")} *</Label>
                    <Input
                      id="name"
                      placeholder={t("submit.skillNamePlaceholder")}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t("submit.descriptionLabel")} *</Label>
                    <Input
                      id="description"
                      placeholder={t("submit.descriptionPlaceholder")}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">{t("submit.category")} *</Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) => setForm({ ...form, category: value as Category })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("submit.selectCategory")} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>{t("submit.compatiblePlatforms")}</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {platforms.map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox
                            id={`platform-${platform}`}
                            checked={form.platforms.includes(platform)}
                            onCheckedChange={() => handlePlatformToggle(platform)}
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

                  <div className="space-y-2">
                    <Label htmlFor="tags">{t("submit.tags")}</Label>
                    <Input
                      id="tags"
                      placeholder={t("submit.tagsPlaceholder")}
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    />
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {t("submit.tagsHelp")}
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    {t("submit.submitButton")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("submit.requirements")}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p>{t("submit.requirementsText")}</p>
                <ul className="list-disc list-inside space-y-1 text-[hsl(var(--muted-foreground))]">
                  <li>{t("submit.requirementName")}</li>
                  <li>{t("submit.requirementDesc")}</li>
                  <li>{t("submit.requirementUsage")}</li>
                  <li>{t("submit.requirementExamples")}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("submit.exampleSkillmd")}</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-[hsl(var(--muted))] p-3 rounded-lg overflow-x-auto">
{`---
name: My Skill
description: Does something useful
---

# My Skill

Instructions for using this skill...`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("submit.resources")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="https://github.com/anthropics/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:underline"
                >
                  {t("submit.officialRepo")}
                  <ExternalLink className="h-3 w-3" />
                </a>
                <Link to="/about" className="flex items-center gap-2 text-sm hover:underline">
                  {t("submit.skillmdSpec")}
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, CheckCircle } from "lucide-react";
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
        title: "Missing required fields",
        description: "Please fill in all required fields.",
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
      title: "Skill submitted",
      description: "Your skill has been added to the review queue.",
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
            <h1 className="text-2xl font-bold mb-4">Submission Received</h1>
            <p className="text-[hsl(var(--muted-foreground))] mb-6">
              Thank you for contributing to the SkillsHub ecosystem! Your skill has been 
              added to our review queue and will be reviewed shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setSubmitted(false)}>Submit Another</Button>
              <Button variant="outline" asChild>
                <Link to="/library">Browse Skills</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit a Skill</h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            Share your skills with the community. Make sure your skill follows the SKILL.md specification.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Skill Information</CardTitle>
                <CardDescription>
                  Provide details about your skill submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="repoUrl">Repository URL *</Label>
                    <Input
                      id="repoUrl"
                      type="url"
                      placeholder="https://github.com/username/skill-repo"
                      value={form.repoUrl}
                      onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                      required
                    />
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      GitHub, GitLab, or any public repository URL
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Skill Name *</Label>
                    <Input
                      id="name"
                      placeholder="My Awesome Skill"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Input
                      id="description"
                      placeholder="A brief description of what this skill does"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) => setForm({ ...form, category: value as Category })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
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
                    <Label>Compatible Platforms</Label>
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
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="git, automation, testing (comma-separated)"
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    />
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      Comma-separated list of relevant tags
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Skill
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Requirements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p>Your skill must include a <code className="text-xs px-1 py-0.5 bg-[hsl(var(--muted))] rounded">SKILL.md</code> file with:</p>
                <ul className="list-disc list-inside space-y-1 text-[hsl(var(--muted-foreground))]">
                  <li>YAML frontmatter with <code className="text-xs">name</code></li>
                  <li>YAML frontmatter with <code className="text-xs">description</code></li>
                  <li>Clear usage instructions</li>
                  <li>Examples when applicable</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Example SKILL.md</CardTitle>
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
                <CardTitle className="text-lg">Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="https://github.com/anthropics/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:underline"
                >
                  Official Skills Repo
                  <ExternalLink className="h-3 w-3" />
                </a>
                <Link to="/about" className="flex items-center gap-2 text-sm hover:underline">
                  SKILL.md Specification
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

#!/usr/bin/env tsx

/**
 * Dynamic Sitemap Generator
 *
 * Generates public/sitemap.xml with all skill and collection pages.
 * Run via: pnpm generate-sitemap
 * Automatically runs before builds via prebuild hook.
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://skillshub.dev";

// Import skills data by reading and evaluating the TypeScript file
// Since we run via tsx, we can import directly
async function main() {
  console.log("\n🗺️  Generating sitemap...\n");

  // Dynamic import to leverage tsx's TypeScript support
  const { skills, collections } = await import("../src/data/skills");

  const today = new Date().toISOString().split("T")[0];

  // Static pages
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/library", priority: "0.9", changefreq: "daily" },
    { url: "/collections", priority: "0.8", changefreq: "weekly" },
    { url: "/submit", priority: "0.7", changefreq: "monthly" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
  ];

  // Category pages
  const categories = [
    "Development",
    "Docs",
    "Enterprise",
    "Design",
    "Automation",
    "Data",
  ];
  const categoryPages = categories.map((cat) => ({
    url: `/library?category=${cat}`,
    priority: "0.6",
    changefreq: "weekly",
  }));

  // Skill pages
  const skillPages = skills.map((skill) => ({
    url: `/skill/${skill.id}`,
    priority: "0.7",
    changefreq: "weekly",
    lastmod: skill.updatedAt,
  }));

  // Collection pages
  const collectionPages = collections.map((collection) => ({
    url: `/collection/${collection.id}`,
    priority: "0.6",
    changefreq: "weekly",
  }));

  const allPages = [...staticPages, ...categoryPages, ...skillPages, ...collectionPages];

  const urls = allPages
    .map(
      (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const outputPath = path.join(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(outputPath, sitemap, "utf-8");

  console.log(`  Pages: ${allPages.length}`);
  console.log(`  - Static: ${staticPages.length}`);
  console.log(`  - Categories: ${categoryPages.length}`);
  console.log(`  - Skills: ${skillPages.length}`);
  console.log(`  - Collections: ${collectionPages.length}`);
  console.log(`\n✅ Sitemap written to ${outputPath}\n`);
}

main().catch((err) => {
  console.error("❌ Failed to generate sitemap:", err);
  process.exit(1);
});

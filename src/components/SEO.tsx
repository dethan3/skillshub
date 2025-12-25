import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const BASE_URL = "https://agentskills.dev";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

export function SEO({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = "website",
}: SEOProps) {
  const { t, i18n } = useTranslation();

  const defaultTitle = t("seo.defaultTitle", "AgentSkills - Discover & Share AI Agent Skills");
  const defaultDescription = t(
    "seo.defaultDescription",
    "A community-driven directory for discovering, sharing, and deploying AI Agent Skills following the open SKILL.md standard."
  );
  const defaultKeywords = t(
    "seo.defaultKeywords",
    "AI skills, agent skills, SKILL.md, Claude skills, ChatGPT skills, AI assistants, LLM tools"
  );

  const finalTitle = title ? `${title} | AgentSkills` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const currentLang = i18n.language;

  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={currentLang === "zh" ? "zh_CN" : "en_US"} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

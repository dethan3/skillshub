import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 text-center">
      <SEO
        title={t("notFound.title", "Page Not Found")}
        description={t(
          "notFound.description",
          "The page you're looking for doesn't exist."
        )}
      />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-[hsl(var(--muted-foreground))] mb-8">
        {t(
          "notFound.message",
          "The page you're looking for doesn't exist or has been moved."
        )}
      </p>
      <Button asChild>
        <Link to="/">{t("notFound.goHome", "Go Home")}</Link>
      </Button>
    </div>
  );
}

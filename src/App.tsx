import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/contexts/theme-context";
import { Layout } from "@/components/layout/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";

const Landing = lazy(() => import("./pages/Landing").then((m) => ({ default: m.Landing })));
const Library = lazy(() => import("./pages/Library").then((m) => ({ default: m.Library })));
const SkillDetail = lazy(() => import("./pages/SkillDetail").then((m) => ({ default: m.SkillDetail })));
const Collections = lazy(() => import("./pages/Collections").then((m) => ({ default: m.Collections })));
const CollectionDetail = lazy(() => import("./pages/CollectionDetail").then((m) => ({ default: m.CollectionDetail })));
const Submit = lazy(() => import("./pages/Submit").then((m) => ({ default: m.Submit })));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Authors = lazy(() => import("./pages/Authors").then((m) => ({ default: m.Authors })));
const AuthorDetail = lazy(() => import("./pages/AuthorDetail").then((m) => ({ default: m.AuthorDetail })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

function PageLoader() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <Skeleton className="h-8 w-64 mb-4" />
      <Skeleton className="h-4 w-96 mb-8" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="skillshub-theme">
        <BrowserRouter>
          <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="library" element={<Library />} />
                <Route path="skill/:id" element={<SkillDetail />} />
                <Route path="collections" element={<Collections />} />
                <Route path="collection/:id" element={<CollectionDetail />} />
                <Route path="submit" element={<Submit />} />
                <Route path="about" element={<About />} />
                <Route path="authors" element={<Authors />} />
                <Route path="author/:id" element={<AuthorDetail />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

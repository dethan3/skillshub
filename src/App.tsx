import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/contexts/theme-context";
import { Layout } from "@/components/layout/Layout";
import {
  Landing,
  Library,
  SkillDetail,
  Collections,
  CollectionDetail,
  Submit,
  About,
} from "@/pages";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="skillshub-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="library" element={<Library />} />
              <Route path="skill/:id" element={<SkillDetail />} />
              <Route path="collections" element={<Collections />} />
              <Route path="collection/:id" element={<CollectionDetail />} />
              <Route path="submit" element={<Submit />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

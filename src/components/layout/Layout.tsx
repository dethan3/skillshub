import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SearchCommand } from "./SearchCommand";
import { Toaster } from "@/components/ui/toaster";

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
      <Toaster />
    </div>
  );
}

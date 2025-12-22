import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Search, Layers, Tag } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { skills, collections } from "@/data/skills";
import { Badge } from "@/components/ui/badge";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase()) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  ).slice(0, 8);

  const filteredCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(search.toLowerCase()) ||
      collection.description.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 4);

  const handleSelect = (path: string) => {
    onOpenChange(false);
    setSearch("");
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search skills, collections, or tags..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {filteredSkills.length > 0 && (
          <CommandGroup heading="Skills">
            {filteredSkills.map((skill) => (
              <CommandItem
                key={skill.id}
                value={skill.name}
                onSelect={() => handleSelect(`/skill/${skill.id}`)}
                className="flex items-center gap-3 py-3"
              >
                <FileText className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{skill.name}</div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                    {skill.description}
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {skill.category}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredCollections.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Collections">
              {filteredCollections.map((collection) => (
                <CommandItem
                  key={collection.id}
                  value={collection.name}
                  onSelect={() => handleSelect(`/collection/${collection.id}`)}
                  className="flex items-center gap-3 py-3"
                >
                  <Layers className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{collection.name}</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                      {collection.description}
                    </div>
                  </div>
                  <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0">
                    {collection.skillIds.length} skills
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => handleSelect("/library")}>
            <Search className="mr-2 h-4 w-4" />
            Browse all skills
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/collections")}>
            <Layers className="mr-2 h-4 w-4" />
            View collections
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/submit")}>
            <Tag className="mr-2 h-4 w-4" />
            Submit a skill
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  FileCode,
  Building2,
  Code,
  FileText,
  Briefcase,
  Home,
  Shield,
  FileCheck,
  Search,
  Clock,
} from "lucide-react";
import { Button } from "./ui/button";
import { DialogDescription, DialogTitle } from "./ui/dialog";

interface SearchItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
  keywords?: string[];
}

const searchItems: SearchItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="mr-2 h-4 w-4" />,
    description: "Go to homepage",
    keywords: ["home", "main", "start"],
  },
  {
    title: "DSA Sheets",
    href: "/dsa-sheets",
    icon: <FileCode className="mr-2 h-4 w-4" />,
    description: "Practice data structures and algorithms",
    keywords: ["dsa", "data structures", "algorithms", "practice", "coding"],
  },
  {
    title: "Companies",
    href: "/companies",
    icon: <Building2 className="mr-2 h-4 w-4" />,
    description: "Browse companies and their interview questions",
    keywords: ["companies", "interview", "questions", "faang"],
  },
  {
    title: "Compiler",
    href: "/compiler",
    icon: <Code className="mr-2 h-4 w-4" />,
    description: "Write and test code online",
    keywords: ["compiler", "code", "editor", "online", "ide"],
  },
  {
    title: "Jobs",
    href: "/jobs",
    icon: <Briefcase className="mr-2 h-4 w-4" />,
    description: "Find job opportunities",
    keywords: ["jobs", "careers", "opportunities", "hiring"],
  },
  {
    title: "ATS Checker",
    href: "/ats-checker",
    icon: <FileCheck className="mr-2 h-4 w-4" />,
    description: "Check your resume with ATS",
    keywords: ["ats", "resume", "cv", "checker"],
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    icon: <Shield className="mr-2 h-4 w-4" />,
    description: "Read our privacy policy",
    keywords: ["privacy", "policy", "legal"],
  },
  {
    title: "Terms of Service",
    href: "/terms-of-service",
    icon: <FileText className="mr-2 h-4 w-4" />,
    description: "Read our terms of service",
    keywords: ["terms", "service", "legal"],
  },
];

export function QuickSearch() {
  const [open, setOpen] = React.useState(false);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const router = useRouter();

  // Load recent searches from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem("recent-searches");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const addRecentSearch = React.useCallback((href: string) => {
    setRecentSearches((prev) => {
      const updated = [href, ...prev.filter((item) => item !== href)].slice(
        0,
        5
      );
      localStorage.setItem("recent-searches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const runCommand = React.useCallback(
    (command: () => unknown, href?: string) => {
      setOpen(false);
      command();
      if (href) {
        addRecentSearch(href);
      }
    },
    [addRecentSearch]
  );

  const recentItems = searchItems.filter((item) =>
    recentSearches.includes(item.href)
  );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 relative w-full justify-start text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        aria-label="Open quick search"
        title="Quick search (⌘K)"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden sr-only">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle hidden>Quick Search</DialogTitle>
        <DialogDescription hidden>Quick Search</DialogDescription>
        <CommandInput placeholder="Search pages, commands, and more..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {recentItems.length > 0 && (
            <>
              <CommandGroup heading="Recent">
                {recentItems.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${item.title} ${item.keywords?.join(" ")}`}
                    onSelect={() => {
                      runCommand(() => router.push(item.href), item.href);
                    }}
                    className="cursor-pointer"
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          <CommandGroup heading="Pages">
            {searchItems.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} ${item.keywords?.join(" ")}`}
                onSelect={() => {
                  runCommand(() => router.push(item.href), item.href);
                }}
                className="cursor-pointer"
              >
                {item.icon}
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  {item.description && (
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

        </CommandList>
      </CommandDialog>
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { Bookmark, Menu } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSavedJobs } from "@/lib/storage/saved-jobs";

const NAV = [
  { to: "/jobs", label: "Jobs" },
  { to: "/companies", label: "Companies" },
  { to: "/employers", label: "Employers" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const savedCount = useSavedJobs((state) => state.ids.length);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors duration-150 hover:text-fg [&.active]:text-fg"
              activeProps={{ className: "text-fg" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="relative px-3">
            <Link to="/saved" aria-label="Saved jobs">
              <Bookmark className="size-4" />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 ? (
                <span className="ml-0.5 rounded-full bg-primary px-1.5 text-[11px] leading-5 text-primary-fg tabular-nums">
                  {savedCount}
                </span>
              ) : null}
            </Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/jobs">Browse jobs</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent title="Menu" side="right">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-lg px-3 py-3 text-base hover:bg-surface-hover"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/saved"
                  className="rounded-lg px-3 py-3 text-base hover:bg-surface-hover"
                >
                  Saved jobs
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

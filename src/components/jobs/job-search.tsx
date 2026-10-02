import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function JobSearch({
  defaultQuery = "",
  defaultLocation = "",
  compact = false,
}: {
  defaultQuery?: string;
  defaultLocation?: string;
  compact?: boolean;
}) {
  const navigate = useNavigate();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const q = String(data.get("q") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    void navigate({
      to: "/jobs",
      search: {
        q: q || undefined,
        location: location || undefined,
      },
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={
        compact
          ? "flex flex-col gap-2 sm:flex-row"
          : "grid gap-3 rounded-2xl bg-surface p-3 shadow-[var(--shadow-border)] sm:grid-cols-[1fr_1fr_auto] sm:p-2 sm:pl-4"
      }
    >
      <div className="min-w-0">
        {!compact ? (
          <Label htmlFor="job-q" className="sr-only">
            Role or keyword
          </Label>
        ) : (
          <Label htmlFor="job-q" className="mb-1.5 block text-xs text-muted">
            Role
          </Label>
        )}
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <Input
            id="job-q"
            name="q"
            defaultValue={defaultQuery}
            placeholder="Role, skill, or company"
            className={compact ? "pl-10" : "border-0 bg-transparent pl-10 shadow-none"}
          />
        </div>
      </div>
      <div className="min-w-0">
        {!compact ? (
          <Label htmlFor="job-location" className="sr-only">
            Location
          </Label>
        ) : (
          <Label htmlFor="job-location" className="mb-1.5 block text-xs text-muted">
            Location
          </Label>
        )}
        <Input
          id="job-location"
          name="location"
          defaultValue={defaultLocation}
          placeholder="City or remote"
          className={compact ? "" : "border-0 bg-transparent shadow-none"}
        />
      </div>
      <Button type="submit" size="lg" className="sm:min-w-32">
        Search jobs
      </Button>
    </form>
  );
}

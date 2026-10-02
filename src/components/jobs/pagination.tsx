import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JobFilters } from "@/lib/jobs/types";

export function Pagination({
  page,
  totalPages,
  search,
}: {
  page: number;
  totalPages: number;
  search: JobFilters;
}) {
  if (totalPages <= 1) return null;

  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return (
    <nav
      className="flex items-center justify-between gap-3 pt-2"
      aria-label="Pagination"
    >
      <Button asChild variant="outline" disabled={!prev}>
        {prev ? (
          <Link to="/jobs" search={{ ...search, page: prev === 1 ? undefined : prev }}>
            <ChevronLeft className="size-4" />
            Previous
          </Link>
        ) : (
          <span>
            <ChevronLeft className="size-4" />
            Previous
          </span>
        )}
      </Button>
      <p className="text-sm text-muted tabular-nums">
        Page {page} of {totalPages}
      </p>
      <Button asChild variant="outline" disabled={!next}>
        {next ? (
          <Link to="/jobs" search={{ ...search, page: next }}>
            Next
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <span>
            Next
            <ChevronRight className="size-4" />
          </span>
        )}
      </Button>
    </nav>
  );
}

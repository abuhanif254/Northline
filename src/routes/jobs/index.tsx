import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { JobCard } from "@/components/jobs/job-card";
import { JobFiltersPanel } from "@/components/jobs/job-filters";
import { JobSearch } from "@/components/jobs/job-search";
import { Pagination } from "@/components/jobs/pagination";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { filterJobs, paginateJobs, parseJobSearch } from "@/lib/jobs/query";
import type { JobFilters } from "@/lib/jobs/types";
import { pageDescription, pageTitle } from "@/lib/seo/site";

export const Route = createFileRoute("/jobs/")({
  validateSearch: (search: Record<string, unknown>): JobFilters => parseJobSearch(search),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    const matched = filterJobs(deps);
    return {
      result: paginateJobs(matched, deps.page ?? 1),
      total: matched.length,
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle("Jobs") },
      {
        name: "description",
        content: pageDescription(
          `Browse ${loaderData?.total ?? ""} open roles on Northline. Filter by discipline, location, workplace, and seniority.`,
        ),
      },
    ],
    links: [{ rel: "canonical", href: "/jobs" }],
  }),
  component: JobsPage,
});

function JobsPage() {
  const search = Route.useSearch();
  const { result, total } = Route.useLoaderData();

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Open roles"
        title="Find the next one."
        description="Every listing includes pay, workplace, and a description written for humans. Save what you like. Apply when you are ready."
      />
      <div className="mt-8">
        <JobSearch defaultQuery={search.q ?? ""} defaultLocation={search.location ?? ""} compact />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <div className="hidden lg:block">
          <JobFiltersPanel filters={search} resultCount={total} />
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
            <p className="text-sm text-muted tabular-nums">
              {total} {total === 1 ? "role" : "roles"}
            </p>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="size-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent title="Filters" side="left">
                <JobFiltersPanel filters={search} resultCount={total} />
              </SheetContent>
            </Sheet>
          </div>
          {result.items.length === 0 ? (
            <div className="rounded-2xl bg-surface p-8 text-center shadow-[var(--shadow-border)]">
              <h2 className="font-display text-2xl tracking-tight">No matching roles</h2>
              <p className="mt-2 text-sm text-muted">
                Try a broader keyword or clear the filters.
              </p>
              <Button asChild className="mt-5">
                <Link to="/jobs">
                  Clear filters
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {result.items.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
          <div className="mt-8">
            <Pagination page={result.page} totalPages={result.totalPages} search={search} />
          </div>
        </div>
      </div>
    </main>
  );
}

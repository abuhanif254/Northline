import { Link } from "@tanstack/react-router";
import { JobSearch } from "@/components/jobs/job-search";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-20 sm:px-6">
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">
        That URL does not match a role, company, or page on Northline. Search instead.
      </p>
      <div className="mt-8">
        <JobSearch compact />
      </div>
      <div className="mt-6">
        <Button asChild variant="outline">
          <Link to="/jobs">Browse all jobs</Link>
        </Button>
      </div>
    </main>
  );
}

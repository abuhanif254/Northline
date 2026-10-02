import { createFileRoute, Link } from "@tanstack/react-router";
import { JobCard } from "@/components/jobs/job-card";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { JOBS } from "@/data/jobs";
import { pageDescription, pageTitle } from "@/lib/seo/site";
import { useApplications } from "@/lib/storage/applications";
import { useSavedJobs } from "@/lib/storage/saved-jobs";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: pageTitle("Saved jobs") },
      {
        name: "description",
        content: pageDescription(
          "Your saved Northline roles and applications, kept on this device.",
        ),
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/saved" }],
  }),
  component: SavedPage,
});

function SavedPage() {
  const ids = useSavedJobs((state) => state.ids);
  const applications = useApplications((state) => state.items);
  const savedJobs = ids
    .map((id) => JOBS.find((job) => job.id === id))
    .filter((job): job is NonNullable<typeof job> => Boolean(job));

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Your board"
        title="Saved roles"
        description="Bookmarks and applications stay on this device. Nothing is sent to a server."
      />
      <section className="mt-10">
        <h2 className="font-display text-2xl tracking-tight">Bookmarks</h2>
        {savedJobs.length === 0 ? (
          <div className="mt-4 rounded-2xl bg-surface p-8 shadow-[var(--shadow-border)]">
            <p className="text-muted">You have not saved any roles yet.</p>
            <Button asChild className="mt-4">
              <Link to="/jobs">Browse jobs</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
      <section className="mt-12">
        <h2 className="font-display text-2xl tracking-tight">Applications</h2>
        {applications.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No applications submitted from this device.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border rounded-2xl bg-surface shadow-[var(--shadow-border)]">
            {applications.map((item) => (
              <li key={item.jobId} className="px-5 py-4">
                <Link
                  to="/jobs/$slug"
                  params={{ slug: item.jobSlug }}
                  className="font-medium hover:text-primary"
                >
                  {item.jobTitle}
                </Link>
                <p className="text-sm text-muted">
                  {item.companyName} · submitted{" "}
                  {new Date(item.submittedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

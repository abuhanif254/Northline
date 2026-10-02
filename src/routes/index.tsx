import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Layers, Search } from "lucide-react";
import { CompanyCard } from "@/components/companies/company-card";
import { JobCard } from "@/components/jobs/job-card";
import { JobSearch } from "@/components/jobs/job-search";
import { JsonLd } from "@/lib/seo/json-ld";
import { Button } from "@/components/ui/button";
import { COMPANIES } from "@/data/companies";
import { JOBS } from "@/data/jobs";
import { featuredJobs } from "@/lib/jobs/query";
import { CATEGORY_BLURB, CATEGORY_LABEL, CATEGORY_SLUGS } from "@/lib/jobs/types";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { pageDescription, pageTitle, SITE_DESCRIPTION } from "@/lib/seo/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle() },
      { name: "description", content: pageDescription(SITE_DESCRIPTION) },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = featuredJobs(6);
  const companies = COMPANIES.slice(0, 6);
  const remoteShare = Math.round(
    (JOBS.filter((job) => job.workplace === "remote").length / JOBS.length) * 100,
  );

  return (
    <main id="main">
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              The career marketplace
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl">
              Find work worth doing.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
              Northline lists roles from companies that take craft, pay, and
              management seriously. Search by skill, city, or the kind of team
              you want to join.
            </p>
            <div className="mt-8">
              <JobSearch />
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <span className="text-muted">Popular:</span>
              {["engineering", "design", "remote", "product"].map((term) => (
                <Link
                  key={term}
                  to="/jobs"
                  search={
                    term === "remote"
                      ? { workplace: "remote" as const }
                      : { q: term }
                  }
                  className="rounded-full bg-surface px-3 py-1 text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
          <aside className="grid grid-cols-2 gap-3 self-end rounded-2xl bg-primary p-6 text-primary-fg sm:p-8">
            <Stat value={String(JOBS.length)} label="Open roles" />
            <Stat value={String(COMPANIES.length)} label="Companies" />
            <Stat value={`${remoteShare}%`} label="Remote-friendly" />
            <Stat value="8" label="Disciplines" />
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              Featured
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight">Roles in the window</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/jobs">
              All jobs
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl tracking-tight">Browse by discipline</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Eight focused categories. No junk drawers, no “other.”
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_SLUGS.map((slug) => (
              <li key={slug}>
                <Link
                  to="/categories/$slug"
                  params={{ slug }}
                  className="block h-full rounded-2xl border border-border bg-bg p-5 transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
                >
                  <p className="font-display text-xl tracking-tight">
                    {CATEGORY_LABEL[slug]}
                  </p>
                  <p className="mt-2 text-sm text-muted">{CATEGORY_BLURB[slug]}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl tracking-tight">Companies on the board</h2>
            <p className="mt-2 text-muted">Independent teams with a point of view.</p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/companies">
              All companies
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {companies.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3">
          <Step
            icon={Search}
            title="Search with intent"
            body="Filter by discipline, workplace, and seniority. Every listing has pay, a city, and a real description."
          />
          <Step
            icon={Layers}
            title="Read the work"
            body="Roles are written like the job, not like an ad. Requirements, responsibilities, and the team you’ll join."
          />
          <Step
            icon={Compass}
            title="Apply once, track locally"
            body="Save roles and submit applications from this device. No account required to start."
          />
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl tracking-tight tabular-nums sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-primary-fg/70">{label}</p>
    </div>
  );
}

function Step({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Search;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]">
      <Icon className="size-5 text-primary" aria-hidden />
      <h3 className="mt-4 font-display text-xl tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}

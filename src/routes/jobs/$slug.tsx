import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Wallet } from "lucide-react";
import { CompanyMark } from "@/components/companies/company-mark";
import { JobCard } from "@/components/jobs/job-card";
import { SaveButton } from "@/components/jobs/save-button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCompany } from "@/data/companies";
import { getJob, relatedJobs } from "@/data/jobs";
import { daysAgo, formatDate, formatLocation, formatSalary } from "@/lib/format";
import {
  CATEGORY_LABEL,
  EMPLOYMENT_LABEL,
  EXPERIENCE_LABEL,
  WORKPLACE_LABEL,
} from "@/lib/jobs/types";
import { JsonLd } from "@/lib/seo/json-ld";
import { breadcrumbJsonLd, jobPostingJsonLd } from "@/lib/seo/jsonld";
import { pageDescription, pageTitle } from "@/lib/seo/site";

export const Route = createFileRoute("/jobs/$slug")({
  loader: ({ params }) => {
    const job = getJob(params.slug);
    if (!job) throw notFound();
    const company = getCompany(job.companySlug);
    if (!company) throw notFound();
    return { job, company, related: relatedJobs(job) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { job, company } = loaderData;
    const title = `${job.title} at ${company.name}`;
    return {
      meta: [
        { title: pageTitle(title) },
        { name: "description", content: pageDescription(job.summary) },
        { name: "robots", content: "index, follow" },
      ],
      links: [{ rel: "canonical", href: `/jobs/${job.slug}` }],
    };
  },
  component: JobDetailPage,
});

function JobDetailPage() {
  const { job, company, related } = Route.useLoaderData();

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <JsonLd
        data={[
          jobPostingJsonLd(job),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Jobs", path: "/jobs" },
            { name: job.title, path: `/jobs/${job.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Jobs", href: "/jobs" },
          { label: job.title },
        ]}
      />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <article>
          <div className="flex items-start gap-4">
            <CompanyMark mark={company.mark} className="size-14 rounded-xl" />
            <div>
              <p className="text-xs font-medium tracking-wide text-muted uppercase">
                {company.name} · {CATEGORY_LABEL[job.category]}
              </p>
              <h1 className="mt-1 font-display text-3xl tracking-tight sm:text-4xl">
                {job.title}
              </h1>
              <p className="mt-3 text-muted">{job.summary}</p>
            </div>
          </div>
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            <Meta
              icon={MapPin}
              label="Location"
              value={formatLocation(job.city, job.region, job.country)}
            />
            <Meta
              icon={Wallet}
              label="Salary"
              value={formatSalary(job.salaryMin, job.salaryMax)}
            />
            <Meta
              icon={Clock}
              label="Posted"
              value={daysAgo(job.postedAt)}
              datetime={job.postedAt}
            />
          </dl>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Badge tone="primary">{WORKPLACE_LABEL[job.workplace]}</Badge>
            <Badge>{EMPLOYMENT_LABEL[job.employmentType]}</Badge>
            <Badge>{EXPERIENCE_LABEL[job.experience]}</Badge>
            {job.tags.map((tag) => (
              <Badge key={tag} tone="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl tracking-tight">The role</h2>
            {job.description.map((paragraph) => (
              <p key={paragraph} className="text-muted">
                {paragraph}
              </p>
            ))}
          </section>
          <List title="What you’ll do" items={job.responsibilities} />
          <List title="What you’ll bring" items={job.requirements} />
          <List title="Benefits" items={job.benefits} />
          <p className="mt-8 text-sm text-muted">
            Applications close <time dateTime={job.expiresAt}>{formatDate(job.expiresAt)}</time>
            . Role ID {job.id}.
          </p>
        </article>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-display text-xl tracking-tight">Apply</p>
            <p className="mt-1 text-sm text-muted">
              {formatSalary(job.salaryMin, job.salaryMax, true)} ·{" "}
              {WORKPLACE_LABEL[job.workplace]}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button asChild>
                <Link to="/jobs/$slug/apply" params={{ slug: job.slug }}>
                  Apply now
                </Link>
              </Button>
              <SaveButton jobId={job.id} title={job.title} variant="labeled" />
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">
                Hiring company
              </p>
              <Link
                to="/companies/$slug"
                params={{ slug: company.slug }}
                className="mt-2 flex items-center justify-between gap-2 text-sm hover:text-primary"
              >
                <span>
                  {company.name}
                  <span className="mt-0.5 block text-muted">{company.hq}</span>
                </span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl tracking-tight">Related roles</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {related.map((item) => (
              <JobCard key={item.id} job={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
  datetime,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  datetime?: string;
}) {
  return (
    <div className="rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
      <dt className="flex items-center gap-1.5 text-xs tracking-wide text-muted uppercase">
        <Icon className="size-3.5" aria-hidden />
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium">
        {datetime ? <time dateTime={datetime}>{value}</time> : value}
      </dd>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl tracking-tight">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}



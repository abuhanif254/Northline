import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { CompanyMark } from "@/components/companies/company-mark";
import { SaveButton } from "@/components/jobs/save-button";
import { Badge } from "@/components/ui/badge";
import { requireCompany } from "@/data/companies";
import { daysAgo, formatLocation, formatSalary } from "@/lib/format";
import type { Job } from "@/lib/jobs/types";
import { EMPLOYMENT_LABEL, WORKPLACE_LABEL } from "@/lib/jobs/types";

export function JobCard({ job }: { job: Job }) {
  const company = requireCompany(job.companySlug);

  return (
    <article className="group relative rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)] sm:p-5">
      <div className="flex gap-3 sm:gap-4">
        <CompanyMark mark={company.mark} title={company.name} className="size-12 rounded-xl" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">
                {company.name}
              </p>
              <h3 className="mt-1 font-display text-xl leading-snug tracking-tight">
                <Link
                  to="/jobs/$slug"
                  params={{ slug: job.slug }}
                  className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {job.title}
                </Link>
              </h3>
            </div>
            <div className="relative z-10">
              <SaveButton jobId={job.id} title={job.title} />
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{job.summary}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden />
              {formatLocation(job.city, job.region, job.country)}
            </span>
            <span aria-hidden className="text-border">
              ·
            </span>
            <span className="tabular-nums">
              {formatSalary(job.salaryMin, job.salaryMax, true)}
            </span>
            <span aria-hidden className="text-border">
              ·
            </span>
            <time dateTime={job.postedAt}>{daysAgo(job.postedAt)}</time>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge tone="primary">{WORKPLACE_LABEL[job.workplace]}</Badge>
            <Badge>{EMPLOYMENT_LABEL[job.employmentType]}</Badge>
            {job.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} tone="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

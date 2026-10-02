import { Link } from "@tanstack/react-router";
import { CompanyMark } from "@/components/companies/company-mark";
import { jobsByCompany } from "@/data/jobs";
import type { Company } from "@/lib/jobs/types";

export function CompanyCard({ company }: { company: Company }) {
  const openRoles = jobsByCompany(company.slug).length;

  return (
    <article className="relative rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]">
      <div className="flex items-start gap-4">
        <CompanyMark mark={company.mark} className="size-12 rounded-xl" />
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {company.industry}
          </p>
          <h3 className="mt-1 font-display text-xl tracking-tight">
            <Link
              to="/companies/$slug"
              params={{ slug: company.slug }}
              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {company.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{company.about}</p>
          <p className="mt-3 text-sm text-fg tabular-nums">
            {openRoles} open {openRoles === 1 ? "role" : "roles"}
            <span className="text-muted"> · {company.hq}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

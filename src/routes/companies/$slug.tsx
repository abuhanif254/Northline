import { createFileRoute, notFound } from "@tanstack/react-router";
import { CompanyMark } from "@/components/companies/company-mark";
import { JobCard } from "@/components/jobs/job-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { getCompany } from "@/data/companies";
import { jobsByCompany } from "@/data/jobs";
import { JsonLd } from "@/lib/seo/json-ld";
import { breadcrumbJsonLd, companyJsonLd } from "@/lib/seo/jsonld";
import { pageDescription, pageTitle } from "@/lib/seo/site";

export const Route = createFileRoute("/companies/$slug")({
  loader: ({ params }) => {
    const company = getCompany(params.slug);
    if (!company) throw notFound();
    return { company, jobs: jobsByCompany(company.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: pageTitle(`${loaderData.company.name} jobs`) },
        {
          name: "description",
          content: pageDescription(
            `${loaderData.company.about} Browse ${loaderData.jobs.length} open roles.`,
          ),
        },
      ],
      links: [{ rel: "canonical", href: `/companies/${loaderData.company.slug}` }],
    };
  },
  component: CompanyPage,
});

function CompanyPage() {
  const { company, jobs } = Route.useLoaderData();

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <JsonLd
        data={[
          companyJsonLd(company),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Companies", path: "/companies" },
            { name: company.name, path: `/companies/${company.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Companies", href: "/companies" },
          { label: company.name },
        ]}
      />
      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
        <CompanyMark mark={company.mark} className="size-16 rounded-2xl" />
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {company.industry} · Est. {company.founded}
          </p>
          <h1 className="mt-1 font-display text-4xl tracking-tight">{company.name}</h1>
          <p className="mt-3 max-w-2xl text-muted">{company.about}</p>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-muted">Headquarters</dt>
              <dd className="font-medium">{company.hq}</dd>
            </div>
            <div>
              <dt className="text-muted">Team size</dt>
              <dd className="font-medium">{company.size}</dd>
            </div>
            <div>
              <dt className="text-muted">Mission</dt>
              <dd className="font-medium">{company.mission}</dd>
            </div>
          </dl>
        </div>
      </header>
      <section className="mt-12">
        <h2 className="font-display text-2xl tracking-tight">
          Open roles
          <span className="ml-2 text-muted tabular-nums">({jobs.length})</span>
        </h2>
        {jobs.length === 0 ? (
          <p className="mt-4 text-muted">No open roles at the moment.</p>
        ) : (
          <div className="mt-6 grid gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

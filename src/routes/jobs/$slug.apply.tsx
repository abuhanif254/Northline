import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ApplyForm } from "@/components/jobs/apply-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { getCompany } from "@/data/companies";
import { getJob } from "@/data/jobs";
import { pageDescription, pageTitle } from "@/lib/seo/site";

export const Route = createFileRoute("/jobs/$slug/apply")({
  loader: ({ params }) => {
    const job = getJob(params.slug);
    if (!job) throw notFound();
    const company = getCompany(job.companySlug);
    if (!company) throw notFound();
    return { job, company };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: pageTitle(`Apply — ${loaderData.job.title}`) },
        {
          name: "description",
          content: pageDescription(
            `Apply for ${loaderData.job.title} at ${loaderData.company.name} on Northline.`,
          ),
        },
        { name: "robots", content: "noindex, follow" },
      ],
      links: [{ rel: "canonical", href: `/jobs/${loaderData.job.slug}/apply` }],
    };
  },
  component: ApplyPage,
});

function ApplyPage() {
  const { job, company } = Route.useLoaderData();

  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Jobs", href: "/jobs" },
          { label: job.title, href: `/jobs/${job.slug}` },
          { label: "Apply" },
        ]}
      />
      <h1 className="mt-6 font-display text-3xl tracking-tight sm:text-4xl">
        Apply to {job.title}
      </h1>
      <p className="mt-2 text-muted">
        {company.name} ·{" "}
        <Link to="/jobs/$slug" params={{ slug: job.slug }} className="underline">
          Review the role
        </Link>
      </p>
      <div className="mt-8">
        <ApplyForm job={job} companyName={company.name} />
      </div>
    </main>
  );
}

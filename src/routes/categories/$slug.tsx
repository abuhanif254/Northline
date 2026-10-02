import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { JobCard } from "@/components/jobs/job-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageIntro } from "@/components/layout/page-intro";
import { jobsByCategory } from "@/data/jobs";
import {
  CATEGORY_BLURB,
  CATEGORY_LABEL,
  CATEGORY_SLUGS,
  type CategorySlug,
} from "@/lib/jobs/types";
import { JsonLd } from "@/lib/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageDescription, pageTitle } from "@/lib/seo/site";

function isCategory(value: string): value is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(value);
}

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    if (!isCategory(params.slug)) throw notFound();
    return {
      slug: params.slug,
      jobs: jobsByCategory(params.slug),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: pageTitle(`${CATEGORY_LABEL[loaderData.slug]} jobs`) },
        {
          name: "description",
          content: pageDescription(
            `${CATEGORY_BLURB[loaderData.slug]} ${loaderData.jobs.length} open ${CATEGORY_LABEL[loaderData.slug].toLowerCase()} roles on Northline.`,
          ),
        },
      ],
      links: [{ rel: "canonical", href: `/categories/${loaderData.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug, jobs } = Route.useLoaderData();
  const label = CATEGORY_LABEL[slug];

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Jobs", path: "/jobs" },
          { name: label, path: `/categories/${slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Jobs", href: "/jobs" },
          { label },
        ]}
      />
      <div className="mt-6">
        <PageIntro
          eyebrow="Category"
          title={`${label} roles`}
          description={CATEGORY_BLURB[slug]}
        />
      </div>
      <p className="mt-6 text-sm text-muted tabular-nums">
        {jobs.length} open {jobs.length === 1 ? "role" : "roles"} ·{" "}
        <Link to="/jobs" search={{ category: slug }} className="underline">
          Filter all jobs
        </Link>
      </p>
      <div className="mt-8 grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </main>
  );
}

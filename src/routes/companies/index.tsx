import { createFileRoute } from "@tanstack/react-router";
import { CompanyCard } from "@/components/companies/company-card";
import { PageIntro } from "@/components/layout/page-intro";
import { COMPANIES } from "@/data/companies";
import { JsonLd } from "@/lib/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageDescription, pageTitle } from "@/lib/seo/site";

export const Route = createFileRoute("/companies/")({
  head: () => ({
    meta: [
      { title: pageTitle("Companies") },
      {
        name: "description",
        content: pageDescription(
          "Meet the companies hiring on Northline — independent teams in product, climate, health, logistics, and research.",
        ),
      },
    ],
    links: [{ rel: "canonical", href: "/companies" }],
  }),
  component: CompaniesPage,
});

function CompaniesPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Companies", path: "/companies" },
        ])}
      />
      <PageIntro
        eyebrow="Companies"
        title="Teams with a spine."
        description="Twelve companies. Real work, published pay, and a point of view about how they operate."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {COMPANIES.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
    </main>
  );
}

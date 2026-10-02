import { requireCompany } from "@/data/companies";
import type { Company, Job } from "@/lib/jobs/types";
import { SCHEMA_EMPLOYMENT } from "@/lib/jobs/types";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/seo/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    url: "/",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    potentialAction: {
      "@type": "SearchAction",
      target: "/jobs?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  };
}

export function jobPostingJsonLd(job: Job) {
  const company = requireCompany(job.companySlug);
  const remote = job.workplace === "remote";
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.summary, ...job.description].join("\n\n"),
    identifier: {
      "@type": "PropertyValue",
      name: SITE_NAME,
      value: job.id,
    },
    datePosted: job.postedAt,
    validThrough: job.expiresAt,
    employmentType: SCHEMA_EMPLOYMENT[job.employmentType],
    hiringOrganization: {
      "@type": "Organization",
      name: company.name,
      sameAs: company.website,
    },
    jobLocation: remote
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: job.country,
          },
        }
      : {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.city,
            addressRegion: job.region,
            addressCountry: job.country === "United States" ? "US" : job.country,
          },
        },
    jobLocationType: remote ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: remote
      ? { "@type": "Country", name: job.country }
      : undefined,
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: "YEAR",
      },
    },
    directApply: true,
    url: `/jobs/${job.slug}`,
  };
}

export function companyJsonLd(company: Company) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: company.about,
    url: `/companies/${company.slug}`,
    foundingDate: String(company.founded),
    numberOfEmployees: company.size,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.hq,
    },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

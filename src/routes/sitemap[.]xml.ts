import { createFileRoute } from "@tanstack/react-router";
import { COMPANIES } from "@/data/companies";
import { JOBS } from "@/data/jobs";
import { CATEGORY_SLUGS } from "@/lib/jobs/types";

function url(path: string, changefreq: string, priority: string) {
  return `  <url>
    <loc>${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          url("/", "daily", "1.0"),
          url("/jobs", "hourly", "0.9"),
          url("/companies", "weekly", "0.8"),
          url("/about", "monthly", "0.5"),
          url("/employers", "monthly", "0.5"),
        ];
        const jobs = JOBS.map((job) => url(`/jobs/${job.slug}`, "weekly", "0.8"));
        const companies = COMPANIES.map((company) =>
          url(`/companies/${company.slug}`, "weekly", "0.6"),
        );
        const categories = CATEGORY_SLUGS.map((slug) =>
          url(`/categories/${slug}`, "daily", "0.7"),
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPaths, ...jobs, ...companies, ...categories].join("\n")}
</urlset>
`;
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

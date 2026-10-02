import type { Company } from "@/lib/jobs/types";

export const COMPANIES: Company[] = [
  {
    slug: "helio-systems",
    name: "Helio Systems",
    industry: "Developer tools",
    size: "120–200",
    founded: 2018,
    hq: "San Francisco, CA",
    website: "https://helio.example",
    about:
      "Helio builds the control plane for modern software delivery — observability, deploys, and the quiet tools that keep teams shipping without drama.",
    mission:
      "Make the path from commit to production feel inevitable, not heroic.",
    mark: "sun",
  },
  {
    slug: "pale-oak",
    name: "Pale Oak Studio",
    industry: "Product design",
    size: "40–80",
    founded: 2016,
    hq: "Brooklyn, NY",
    website: "https://paleoak.example",
    about:
      "Pale Oak is a product studio for companies that want their software to feel considered. We design systems, interfaces, and the language around them.",
    mission: "Give serious products a visual and verbal spine.",
    mark: "oak",
  },
  {
    slug: "meridian-health",
    name: "Meridian Health",
    industry: "Healthcare",
    size: "400–700",
    founded: 2012,
    hq: "Boston, MA",
    website: "https://meridian.example",
    about:
      "Meridian runs clinical operations software for regional health systems. We care about reliability, privacy, and the people on both sides of the appointment.",
    mission: "Give clinicians time back without compromising the record.",
    mark: "cross",
  },
  {
    slug: "copperline",
    name: "Copperline",
    industry: "Fintech",
    size: "180–250",
    founded: 2019,
    hq: "New York, NY",
    website: "https://copperline.example",
    about:
      "Copperline provides treasury and payments infrastructure for mid-market companies. Clear money movement, no theater.",
    mission: "Make corporate finance as dependable as a well-run ledger.",
    mark: "coin",
  },
  {
    slug: "arcadia-labs",
    name: "Arcadia Labs",
    industry: "Climate technology",
    size: "80–140",
    founded: 2020,
    hq: "Denver, CO",
    website: "https://arcadia.example",
    about:
      "Arcadia models energy systems and helps utilities plan for a grid that actually holds. Science first, slides second.",
    mission: "Put better numbers under the energy transition.",
    mark: "peak",
  },
  {
    slug: "fold-finance",
    name: "Fold Finance",
    industry: "Payments",
    size: "60–110",
    founded: 2021,
    hq: "London, UK",
    website: "https://fold.example",
    about:
      "Fold is a remote-first payments company building reconciliation and payouts for platforms that operate across borders.",
    mission: "Collapse messy money into a single, honest picture.",
    mark: "fold",
  },
  {
    slug: "nimbus-climate",
    name: "Nimbus Climate",
    industry: "Carbon markets",
    size: "50–90",
    founded: 2022,
    hq: "Seattle, WA",
    website: "https://nimbus.example",
    about:
      "Nimbus measures, reports, and verifies carbon projects with satellite data and field partners. We sell rigor, not hope.",
    mission: "Make climate claims that can survive an audit.",
    mark: "cloud",
  },
  {
    slug: "atlas-civic",
    name: "Atlas Civic",
    industry: "Civic technology",
    size: "90–150",
    founded: 2015,
    hq: "Washington, DC",
    website: "https://atlascivic.example",
    about:
      "Atlas Civic builds permitting, records, and resident services software for cities that still run on paper and patience.",
    mission: "Make public services feel as considered as private ones.",
    mark: "column",
  },
  {
    slug: "brightline-media",
    name: "Brightline Media",
    industry: "Publishing",
    size: "70–120",
    founded: 2014,
    hq: "Chicago, IL",
    website: "https://brightline.example",
    about:
      "Brightline is an independent publisher of long-form reporting and newsletters. We hire people who can write, edit, and ship on a deadline.",
    mission: "Keep serious journalism economically viable.",
    mark: "line",
  },
  {
    slug: "cedar-and-co",
    name: "Cedar & Co.",
    industry: "Consumer",
    size: "150–220",
    founded: 2017,
    hq: "Portland, OR",
    website: "https://cedar.example",
    about:
      "Cedar makes considered home goods and the digital shop that sells them. Product, supply chain, and a storefront that does not shout.",
    mission: "Build objects — and a company — meant to last.",
    mark: "tree",
  },
  {
    slug: "orbit-freight",
    name: "Orbit Freight",
    industry: "Logistics",
    size: "220–350",
    founded: 2013,
    hq: "Austin, TX",
    website: "https://orbit.example",
    about:
      "Orbit runs freight brokerage software for carriers and shippers who still live in email threads. We replace chaos with a schedule.",
    mission: "Make freight predictable without making it brittle.",
    mark: "orbit",
  },
  {
    slug: "lumen-research",
    name: "Lumen Research",
    industry: "Biotechnology",
    size: "100–180",
    founded: 2011,
    hq: "Cambridge, MA",
    website: "https://lumen.example",
    about:
      "Lumen is a research organization building computational tools for early-stage biology. Scientists, engineers, and people who can talk to both.",
    mission: "Shorten the distance between a question and a reliable answer.",
    mark: "lens",
  },
];

const bySlug = new Map(COMPANIES.map((c) => [c.slug, c]));

export function getCompany(slug: string) {
  return bySlug.get(slug);
}

export function requireCompany(slug: string) {
  const company = bySlug.get(slug);
  if (!company) throw new Error(`Unknown company: ${slug}`);
  return company;
}

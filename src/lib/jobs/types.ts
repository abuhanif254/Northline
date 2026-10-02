export const CATEGORY_SLUGS = [
  "engineering",
  "design",
  "product",
  "data",
  "marketing",
  "operations",
  "sales",
  "finance",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const EMPLOYMENT_TYPES = [
  "full-time",
  "part-time",
  "contract",
  "internship",
] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const WORKPLACES = ["remote", "hybrid", "on-site"] as const;
export type Workplace = (typeof WORKPLACES)[number];

export const EXPERIENCE_LEVELS = [
  "entry",
  "mid",
  "senior",
  "lead",
  "executive",
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export const COMPANY_MARKS = [
  "sun",
  "oak",
  "cross",
  "coin",
  "peak",
  "fold",
  "cloud",
  "column",
  "line",
  "tree",
  "orbit",
  "lens",
] as const;

export type CompanyMark = (typeof COMPANY_MARKS)[number];

export type Company = {
  slug: string;
  name: string;
  industry: string;
  size: string;
  founded: number;
  hq: string;
  website: string;
  about: string;
  mission: string;
  mark: CompanyMark;
};

export type Job = {
  id: string;
  slug: string;
  title: string;
  companySlug: string;
  category: CategorySlug;
  employmentType: EmploymentType;
  workplace: Workplace;
  experience: ExperienceLevel;
  city: string;
  region: string;
  country: string;
  salaryMin: number;
  salaryMax: number;
  postedAt: string;
  expiresAt: string;
  featured?: boolean;
  summary: string;
  description: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  tags: string[];
};

export type JobFilters = {
  q?: string;
  location?: string;
  category?: CategorySlug;
  type?: EmploymentType;
  workplace?: Workplace;
  experience?: ExperienceLevel;
  sort?: "newest" | "salary";
  page?: number;
};

export const EMPLOYMENT_LABEL: Record<EmploymentType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

export const WORKPLACE_LABEL: Record<Workplace, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  "on-site": "On-site",
};

export const EXPERIENCE_LABEL: Record<ExperienceLevel, string> = {
  entry: "Entry level",
  mid: "Mid level",
  senior: "Senior",
  lead: "Lead",
  executive: "Executive",
};

export const CATEGORY_LABEL: Record<CategorySlug, string> = {
  engineering: "Engineering",
  design: "Design",
  product: "Product",
  data: "Data",
  marketing: "Marketing",
  operations: "Operations",
  sales: "Sales",
  finance: "Finance",
};

export const CATEGORY_BLURB: Record<CategorySlug, string> = {
  engineering: "Build the systems people rely on — from product to platform.",
  design: "Shape how products look, feel, and make sense.",
  product: "Set the direction and ship work that matters.",
  data: "Turn signal into decisions, models, and infrastructure.",
  marketing: "Tell the story and grow the audience with craft.",
  operations: "Keep the machine running with care and precision.",
  sales: "Open doors and close work with people who want it.",
  finance: "Steward the numbers that keep ambitious companies honest.",
};

export const SCHEMA_EMPLOYMENT: Record<EmploymentType, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
};

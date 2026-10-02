import { JOBS } from "@/data/jobs";
import { getCompany } from "@/data/companies";
import {
  CATEGORY_SLUGS,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  WORKPLACES,
  type CategorySlug,
  type EmploymentType,
  type ExperienceLevel,
  type Job,
  type JobFilters,
  type Workplace,
} from "@/lib/jobs/types";

export const PAGE_SIZE = 8;

export type JobSearchInput = {
  q?: unknown;
  location?: unknown;
  category?: unknown;
  type?: unknown;
  workplace?: unknown;
  experience?: unknown;
  sort?: unknown;
  page?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function inList<T extends string>(value: string, list: readonly T[]): T | undefined {
  return (list as readonly string[]).includes(value) ? (value as T) : undefined;
}

export function parseJobSearch(search: JobSearchInput): JobFilters {
  const pageRaw =
    typeof search.page === "number"
      ? search.page
      : typeof search.page === "string"
        ? Number.parseInt(search.page, 10)
        : undefined;
  const page =
    pageRaw && Number.isFinite(pageRaw) && pageRaw > 1 ? Math.floor(pageRaw) : undefined;

  const sort = search.sort === "salary" ? "salary" : undefined;

  return {
    q: asString(search.q) || undefined,
    location: asString(search.location) || undefined,
    category: inList(asString(search.category), CATEGORY_SLUGS),
    type: inList(asString(search.type), EMPLOYMENT_TYPES),
    workplace: inList(asString(search.workplace), WORKPLACES),
    experience: inList(asString(search.experience), EXPERIENCE_LEVELS),
    sort,
    page,
  };
}

export function jobMatches(job: Job, filters: JobFilters) {
  if (filters.q) {
    const hay = [
      job.title,
      job.summary,
      job.tags.join(" "),
      job.city,
      getCompany(job.companySlug)?.name ?? "",
    ]
      .join(" ")
      .toLowerCase();
    const terms = filters.q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.every((term) => hay.includes(term))) return false;
  }

  if (filters.location) {
    const loc = filters.location.toLowerCase();
    const blob = `${job.city} ${job.region} ${job.country} ${job.workplace}`.toLowerCase();
    if (!blob.includes(loc)) return false;
  }

  if (filters.category && job.category !== filters.category) return false;
  if (filters.type && job.employmentType !== filters.type) return false;
  if (filters.workplace && job.workplace !== filters.workplace) return false;
  if (filters.experience && job.experience !== filters.experience) return false;

  return true;
}

export function filterJobs(filters: JobFilters, source: Job[] = JOBS) {
  const matched = source.filter((job) => jobMatches(job, filters));
  const sorted = [...matched].sort((a, b) => {
    if (filters.sort === "salary") return b.salaryMax - a.salaryMax;
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });
  return sorted;
}

export function paginateJobs(jobs: Job[], page = 1, pageSize = PAGE_SIZE) {
  const total = jobs.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    items: jobs.slice(start, start + pageSize),
    page: current,
    totalPages,
    total,
  };
}

export function uniqueLocations() {
  const set = new Set<string>();
  for (const job of JOBS) {
    if (job.workplace === "remote") set.add("Remote");
    else if (job.country === "United States") set.add(`${job.city}, ${job.region}`);
    else set.add(`${job.city}, ${job.country}`);
  }
  return [...set].sort();
}

export function categoryCount(slug: CategorySlug) {
  return JOBS.filter((job) => job.category === slug).length;
}

export function employmentCount(type: EmploymentType) {
  return JOBS.filter((job) => job.employmentType === type).length;
}

export function workplaceCount(workplace: Workplace) {
  return JOBS.filter((job) => job.workplace === workplace).length;
}

export function experienceCount(level: ExperienceLevel) {
  return JOBS.filter((job) => job.experience === level).length;
}

export function featuredJobs(limit = 6) {
  return JOBS.filter((job) => job.featured).slice(0, limit);
}

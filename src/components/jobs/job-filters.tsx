import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  CATEGORY_LABEL,
  CATEGORY_SLUGS,
  EMPLOYMENT_LABEL,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LABEL,
  EXPERIENCE_LEVELS,
  WORKPLACE_LABEL,
  WORKPLACES,
  type JobFilters,
} from "@/lib/jobs/types";

function FilterSelect({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs tracking-wide text-muted uppercase">
        {label}
      </Label>
      <Select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </Select>
    </div>
  );
}

export function JobFiltersPanel({
  filters,
  resultCount,
}: {
  filters: JobFilters;
  resultCount: number;
}) {
  const navigate = useNavigate();

  function patch(next: JobFilters) {
    void navigate({
      to: "/jobs",
      search: {
        q: next.q,
        location: next.location,
        category: next.category,
        type: next.type,
        workplace: next.workplace,
        experience: next.experience,
        sort: next.sort,
        page: undefined,
      },
    });
  }

  const hasFilters = Boolean(
    filters.q ||
      filters.location ||
      filters.category ||
      filters.type ||
      filters.workplace ||
      filters.experience,
  );

  return (
    <aside className="space-y-5">
      <div>
        <p className="font-display text-xl tracking-tight">Filter roles</p>
        <p className="mt-1 text-sm text-muted tabular-nums">
          {resultCount} {resultCount === 1 ? "role" : "roles"}
        </p>
      </div>
      <FilterSelect
        id="filter-category"
        label="Category"
        value={filters.category ?? ""}
        onChange={(value) =>
          patch({
            ...filters,
            category: value ? (value as JobFilters["category"]) : undefined,
          })
        }
      >
        <option value="">All categories</option>
        {CATEGORY_SLUGS.map((slug) => (
          <option key={slug} value={slug}>
            {CATEGORY_LABEL[slug]}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect
        id="filter-type"
        label="Employment"
        value={filters.type ?? ""}
        onChange={(value) =>
          patch({
            ...filters,
            type: value ? (value as JobFilters["type"]) : undefined,
          })
        }
      >
        <option value="">Any type</option>
        {EMPLOYMENT_TYPES.map((type) => (
          <option key={type} value={type}>
            {EMPLOYMENT_LABEL[type]}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect
        id="filter-workplace"
        label="Workplace"
        value={filters.workplace ?? ""}
        onChange={(value) =>
          patch({
            ...filters,
            workplace: value ? (value as JobFilters["workplace"]) : undefined,
          })
        }
      >
        <option value="">Any workplace</option>
        {WORKPLACES.map((workplace) => (
          <option key={workplace} value={workplace}>
            {WORKPLACE_LABEL[workplace]}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect
        id="filter-experience"
        label="Experience"
        value={filters.experience ?? ""}
        onChange={(value) =>
          patch({
            ...filters,
            experience: value ? (value as JobFilters["experience"]) : undefined,
          })
        }
      >
        <option value="">Any level</option>
        {EXPERIENCE_LEVELS.map((level) => (
          <option key={level} value={level}>
            {EXPERIENCE_LABEL[level]}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect
        id="filter-sort"
        label="Sort"
        value={filters.sort ?? "newest"}
        onChange={(value) =>
          patch({ ...filters, sort: value === "salary" ? "salary" : "newest" })
        }
      >
        <option value="newest">Newest</option>
        <option value="salary">Highest salary</option>
      </FilterSelect>
      {hasFilters ? (
        <Button asChild variant="ghost" className="w-full">
          <Link to="/jobs">
            Clear filters
          </Link>
        </Button>
      ) : null}
    </aside>
  );
}

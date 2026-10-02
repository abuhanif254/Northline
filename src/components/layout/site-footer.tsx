import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/layout/logo";
import { CATEGORY_LABEL, CATEGORY_SLUGS } from "@/lib/jobs/types";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">
            A curated marketplace for people who take the work seriously.
          </p>
        </div>
        <FooterCol title="Explore">
          <Link to="/jobs">All jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/saved">Saved jobs</Link>
          <Link to="/employers">For employers</Link>
        </FooterCol>
        <FooterCol title="Categories">
          {CATEGORY_SLUGS.slice(0, 6).map((slug) => (
            <Link key={slug} to="/categories/$slug" params={{ slug }}>
              {CATEGORY_LABEL[slug]}
            </Link>
          ))}
        </FooterCol>
        <FooterCol title="Northline">
          <Link to="/about">About</Link>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/robots.txt">Robots</a>
        </FooterCol>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Northline. All rights reserved.</p>
          <p>Built for serious hiring — not noise.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-muted uppercase">{title}</p>
      <div className="mt-3 flex flex-col gap-2 text-sm text-fg [&>a]:w-fit [&>a]:hover:text-primary">
        {children}
      </div>
    </div>
  );
}

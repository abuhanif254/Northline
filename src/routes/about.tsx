import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/lib/seo/json-ld";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { pageDescription, pageTitle } from "@/lib/seo/site";

const FAQS = [
  {
    q: "Is Northline a job board or a recruiting firm?",
    a: "Northline is a curated job marketplace. We list roles with published pay and a real description. We do not place candidates for a fee.",
  },
  {
    q: "Do I need an account to apply?",
    a: "No. You can search, save roles, and apply from this device. Saved jobs and applications stay in your browser.",
  },
  {
    q: "Are salaries always listed?",
    a: "Yes. Every Northline listing includes a salary range. We do not accept roles that hide compensation.",
  },
  {
    q: "How do companies get listed?",
    a: "Employers can submit a briefing on the Employers page. We review for clarity, pay transparency, and a real hiring need.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: pageTitle("About") },
      {
        name: "description",
        content: pageDescription(
          "Northline is a curated job marketplace for ambitious professionals. Pay is published. Descriptions are written for humans.",
        ),
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageIntro
        eyebrow="About"
        title="A quieter job board."
        description="Most hiring sites optimize for volume. Northline optimizes for whether you can tell, in one sitting, if the work is real."
      />
      <div className="mt-10 space-y-5 text-muted">
        <p>
          We list a small number of companies at a time. Each role has a salary
          range, a workplace, and a description that could survive a skeptical
          read. If it reads like a brochure, it does not ship.
        </p>
        <p>
          Candidates should be able to search without creating an account, save
          what they like, and apply without a dark pattern. Employers should be
          able to describe the work without inventing a culture deck.
        </p>
      </div>
      <section className="mt-12">
        <h2 className="font-display text-2xl tracking-tight">Questions</h2>
        <dl className="mt-6 space-y-6">
          {FAQS.map((item) => (
            <div key={item.q}>
              <dt className="font-medium">{item.q}</dt>
              <dd className="mt-1 text-sm text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/jobs">Browse jobs</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/employers">Hire on Northline</Link>
        </Button>
      </div>
    </main>
  );
}

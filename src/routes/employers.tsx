import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { pageDescription, pageTitle } from "@/lib/seo/site";

export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { title: pageTitle("For employers") },
      {
        name: "description",
        content: pageDescription(
          "List a role on Northline. We require published pay, a real description, and a hiring manager who can answer questions.",
        ),
      },
    ],
    links: [{ rel: "canonical", href: "/employers" }],
  }),
  component: EmployersPage,
});

function EmployersPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      role: String(data.get("role") ?? ""),
      note: String(data.get("note") ?? ""),
      submittedAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("northline-employer-briefs") ?? "[]") as unknown[];
    localStorage.setItem(
      "northline-employer-briefs",
      JSON.stringify([payload, ...existing]),
    );
    setSent(true);
    toast.success("Brief received");
  }

  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Employers"
        title="List work, not theater."
        description="Northline accepts a limited number of roles. We require a salary range, a hiring manager, and a description that could be read aloud without embarrassment."
      />
      <ul className="mt-8 grid gap-3 text-sm text-muted sm:grid-cols-3">
        <li className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          Published compensation
        </li>
        <li className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          No bait-and-switch titles
        </li>
        <li className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          A human on the other side
        </li>
      </ul>
      <section className="mt-12">
        <h2 className="font-display text-2xl tracking-tight">Send a briefing</h2>
        {sent ? (
          <p className="mt-4 rounded-2xl bg-surface p-6 text-muted shadow-[var(--shadow-border)]">
            Thank you. We review new briefs during the week and will follow up
            at the email you provided.
          </p>
        ) : (
          <form className="mt-5 space-y-4" onSubmit={onSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" required minLength={2} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role">Role title</Label>
              <Input id="role" name="role" required minLength={2} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="note">What should we know?</Label>
              <Textarea id="note" name="note" required minLength={20} />
            </div>
            <Button type="submit">Submit briefing</Button>
          </form>
        )}
      </section>
    </main>
  );
}

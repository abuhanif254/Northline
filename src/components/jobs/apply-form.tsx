import type { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Job } from "@/lib/jobs/types";
import { useApplications } from "@/lib/storage/applications";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z
    .string()
    .trim()
    .min(1, "Enter a valid email.")
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Enter a valid email."),
  linkedin: z.string().trim(),
  coverLetter: z
    .string()
    .trim()
    .min(40, "A short note of at least 40 characters helps the hiring team."),
});

type Values = z.infer<typeof schema>;

export function ApplyForm({
  job,
  companyName,
}: {
  job: Job;
  companyName: string;
}) {
  const apply = useApplications((state) => state.apply);
  const hasApplied = useApplications((state) => state.hasApplied(job.id));

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", linkedin: "", coverLetter: "" },
  });

  if (hasApplied) {
    return (
      <div className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-5" />
        </div>
        <h2 className="mt-4 font-display text-2xl tracking-tight">Application sent</h2>
        <p className="mt-2 text-sm text-muted">
          Your application for {job.title} at {companyName} is saved on this device.
          The hiring team will follow up by email.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6"
      onSubmit={form.handleSubmit((values) => {
        apply({
          jobId: job.id,
          jobSlug: job.slug,
          jobTitle: job.title,
          companyName,
          name: values.name,
          email: values.email,
          linkedin: values.linkedin || undefined,
          coverLetter: values.coverLetter,
          submittedAt: new Date().toISOString(),
        });
        toast.success("Application submitted");
      })}
      noValidate
    >
      <div>
        <h2 className="font-display text-2xl tracking-tight">Apply for this role</h2>
        <p className="mt-1 text-sm text-muted">
          Applications are stored on this device so you can track them in Saved.
        </p>
      </div>
      <Field label="Full name" error={form.formState.errors.name?.message}>
        <Input autoComplete="name" {...form.register("name")} />
      </Field>
      <Field label="Email" error={form.formState.errors.email?.message}>
        <Input type="email" autoComplete="email" {...form.register("email")} />
      </Field>
      <Field label="LinkedIn or portfolio URL" error={form.formState.errors.linkedin?.message}>
        <Input
          type="url"
          placeholder="https://"
          autoComplete="url"
          {...form.register("linkedin")}
        />
      </Field>
      <Field label="Note to the hiring team" error={form.formState.errors.coverLetter?.message}>
        <Textarea rows={6} {...form.register("coverLetter")} />
      </Field>
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        Submit application
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}

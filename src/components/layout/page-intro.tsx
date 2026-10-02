import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? (
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>
      ) : null}
      {actions ? <div className="mt-6">{actions}</div> : null}
    </header>
  );
}

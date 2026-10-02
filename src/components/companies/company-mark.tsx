import type { CompanyMark } from "@/lib/jobs/types";
import { cn } from "@/lib/cn";

type MarkProps = {
  mark: CompanyMark;
  className?: string;
  title?: string;
};

function glyph(mark: CompanyMark) {
  switch (mark) {
    case "sun":
      return (
        <>
          <circle cx="16" cy="16" r="5" />
          <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.8 7.8l2.1 2.1M22.1 22.1l2.1 2.1M7.8 24.2l2.1-2.1M22.1 9.9l2.1-2.1" />
        </>
      );
    case "oak":
      return (
        <path d="M16 6c4 3 7 7 7 12a7 7 0 1 1-14 0c0-5 3-9 7-12Zm0 12v8" />
      );
    case "cross":
      return <path d="M13 6h6v6h6v6h-6v6h-6v-6H7v-6h6V6Z" />;
    case "coin":
      return (
        <>
          <circle cx="16" cy="16" r="9" />
          <path d="M13 12h4.5a2.5 2.5 0 0 1 0 5H14v5" />
        </>
      );
    case "peak":
      return <path d="m4 24 8-14 4 7 4-5 8 12H4Z" />;
    case "fold":
      return <path d="M7 8h12l6 6v10H7V8Zm12 0v6h6" />;
    case "cloud":
      return (
        <path d="M10 22h12a5 5 0 0 0-.4-10 7 7 0 0 0-13.2 2.2A4.5 4.5 0 0 0 10 22Z" />
      );
    case "column":
      return <path d="M8 7h16M10 7v3h12V7M12 10v12h8V10M8 25h16M11 22h10" />;
    case "line":
      return <path d="M6 11h20M6 16h14M6 21h17" />;
    case "tree":
      return <path d="M16 5 8 16h5l-5 7h16l-5-7h5L16 5Zm0 18v4" />;
    case "orbit":
      return (
        <>
          <circle cx="16" cy="16" r="3" />
          <ellipse cx="16" cy="16" rx="12" ry="6" />
        </>
      );
    case "lens":
      return (
        <>
          <circle cx="16" cy="16" r="8" />
          <circle cx="16" cy="16" r="3" />
        </>
      );
  }
}

export function CompanyMark({ mark, className, title }: MarkProps) {
  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-fg",
        className,
      )}
      title={title}
      aria-hidden={title ? undefined : true}
    >
      <svg
        viewBox="0 0 32 32"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyph(mark)}
      </svg>
    </span>
  );
}

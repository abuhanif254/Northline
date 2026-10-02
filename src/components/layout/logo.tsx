import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5 text-fg", className)}
      aria-label="Northline home"
    >
      <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-fg">
        <svg viewBox="0 0 32 32" className="size-5" aria-hidden>
          <path
            d="M16 6v8M10 14h12M8 22h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="m16 6 3.2 4H12.8L16 6Z" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-lg tracking-tight">Northline</span>
    </Link>
  );
}

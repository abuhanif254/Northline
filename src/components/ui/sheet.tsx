import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({
  children,
  side = "right",
  title,
  className,
}: {
  children: ReactNode;
  side?: "left" | "right";
  title: string;
  className?: string;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/40" />
      <Dialog.Content
        className={cn(
          "fixed inset-y-0 z-50 flex w-[min(100%,22rem)] flex-col bg-bg shadow-[var(--shadow-border-hover)]",
          "transition-transform duration-[var(--motion-slow,400ms)] ease-[cubic-bezier(0.22,1,0.36,1)]",
          "data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full",
          side === "left" &&
            "left-0 data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0",
          side === "right" && "right-0",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Dialog.Title className="font-display text-lg tracking-tight">{title}</Dialog.Title>
          <Dialog.Close asChild>
            <Button variant="ghost" size="icon" aria-label="Close">
              <X className="size-5" />
            </Button>
          </Dialog.Close>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useSavedJobs } from "@/lib/storage/saved-jobs";

export function SaveButton({
  jobId,
  title,
  variant = "icon",
}: {
  jobId: string;
  title: string;
  variant?: "icon" | "labeled";
}) {
  const saved = useSavedJobs((state) => state.ids.includes(jobId));
  const toggle = useSavedJobs((state) => state.toggle);

  if (variant === "labeled") {
    return (
      <Button
        type="button"
        variant={saved ? "secondary" : "outline"}
        onClick={() => toggle(jobId)}
        aria-pressed={saved}
      >
        <Bookmark className={cn("size-4", saved && "fill-current")} />
        {saved ? "Saved" : "Save role"}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-10 shrink-0"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(jobId);
      }}
      aria-label={saved ? `Remove ${title} from saved jobs` : `Save ${title}`}
      aria-pressed={saved}
    >
      <Bookmark className={cn("size-4", saved && "fill-current text-primary")} />
    </Button>
  );
}

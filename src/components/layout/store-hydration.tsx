import { useEffect } from "react";
import { useApplications } from "@/lib/storage/applications";
import { useSavedJobs } from "@/lib/storage/saved-jobs";

export function StoreHydration() {
  useEffect(() => {
    void useSavedJobs.persist.rehydrate();
    void useApplications.persist.rehydrate();
  }, []);
  return null;
}

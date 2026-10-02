import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Application = {
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  companyName: string;
  name: string;
  email: string;
  linkedin?: string;
  coverLetter: string;
  submittedAt: string;
};

type ApplicationsState = {
  items: Application[];
  apply: (application: Application) => void;
  hasApplied: (jobId: string) => boolean;
};

export const useApplications = create<ApplicationsState>()(
  persist(
    (set, get) => ({
      items: [],
      hasApplied: (jobId) => get().items.some((item) => item.jobId === jobId),
      apply: (application) =>
        set((state) => {
          if (state.items.some((item) => item.jobId === application.jobId)) {
            return state;
          }
          return { items: [application, ...state.items] };
        }),
    }),
    { name: "northline-applications", skipHydration: true },
  ),
);

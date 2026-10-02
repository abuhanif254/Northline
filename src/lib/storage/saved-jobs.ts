import { create } from "zustand";
import { persist } from "zustand/middleware";

type SavedState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

export const useSavedJobs = create<SavedState>()(
  persist(
    (set, get) => ({
      ids: [],
      has: (id) => get().ids.includes(id),
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((item) => item !== id)
            : [id, ...state.ids],
        })),
    }),
    { name: "northline-saved-jobs", skipHydration: true },
  ),
);

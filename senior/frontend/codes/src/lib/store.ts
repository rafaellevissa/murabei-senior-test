import { create } from "zustand";

interface FilterState {
  filters: Record<string, string>;
  selectedField: "title" | "author" | "author_bio";
  setFilter: (key: string, value: string) => void;
  setSelectedField: (field: "title" | "author" | "author_bio") => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: {
    title: "",
    author: "",
    author_bio: "",
  },
  selectedField: "title",
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
  setSelectedField: (field) => set({ selectedField: field }),
  clearFilters: () =>
    set({
      filters: {
        title: "",
        author: "",
        author_bio: "",
      },
    }),
}));
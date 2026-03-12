import { create } from "zustand";

type FilterCategory = "all" | "robotics" | "iot" | "software" | "ml";

interface ProjectStore {
  activeFilter: FilterCategory;
  searchQuery: string;
  setFilter: (filter: FilterCategory) => void;
  setSearchQuery: (query: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  activeFilter: "all",
  searchQuery: "",
  setFilter: (filter) => set({ activeFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

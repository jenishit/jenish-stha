import { create } from "zustand";

interface NavStore {
  activeRoute: string;
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
  setActiveRoute: (route: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setScrolled: (scrolled: boolean) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  activeRoute: "/",
  isMobileMenuOpen: false,
  isScrolled: false,
  setActiveRoute: (route) => set({ activeRoute: route }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),
}));

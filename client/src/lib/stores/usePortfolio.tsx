import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type PortfolioSection =
  | "hub"
  | "about"
  | "projects"
  | "skills"
  | "connect";

interface PortfolioState {
  currentSection: PortfolioSection;
  isTransitioning: boolean;
  
  // Actions
  setCurrentSection: (section: PortfolioSection) => void;
  setTransitioning: (transitioning: boolean) => void;
}

export const usePortfolio = create<PortfolioState>()(
  subscribeWithSelector((set) => ({
    currentSection: "hub",
    isTransitioning: false,
    
    setCurrentSection: (section: PortfolioSection) => {
      set((state) => {
        if (state.currentSection !== section) {
          console.log(`Navigating to section: ${section}`);
          return { currentSection: section };
        }
        return {};
      });
    },
    
    setTransitioning: (transitioning: boolean) => {
      set({ isTransitioning: transitioning });
    }
  }))
);

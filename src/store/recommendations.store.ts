import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface RecommendationI {
  type: string;
  paragraph: string;
  tables: {
    modelsAliases: string[];
    similarDatasetsAliases: string[];
  };
}

export interface RecommendationsI {
  alias: string;
  title: string;
  recommendations: RecommendationI[];
}

interface RecommendationsStore {
  recommendations: RecommendationsI | null;
  setRecommendations: (newRecommendations: RecommendationsI) => void;
  clearRecommendations: () => void;
}

export const useRecommendationsStore = create<RecommendationsStore>()(
  persist(
    (set) => ({
      recommendations: null,
      setRecommendations: (newRecommendations) => {
        sessionStorage.setItem("recommendations", JSON.stringify(newRecommendations));
        set({ recommendations: newRecommendations });
      },
      clearRecommendations: () => {
        sessionStorage.removeItem("recommendations");
        set({ recommendations: null });
      },
    }),
    {
      name: "recommendations",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Analysis, RecommendationsResponse } from '@/types/analysis.types';

interface CurrentAnalysisStore {
  currentAnalysis: Analysis | null;
  setCurrentAnalysis: (analysis: Analysis | null) => void;
  updateStreamingRecommendations: (partial: Partial<RecommendationsResponse>) => void;
  toggleCurrentFavorite: () => void;
  clearCurrentAnalysis: () => void;
}

export const useCurrentAnalysisStore = create<CurrentAnalysisStore>()(
  persist(
    (set, get) => ({
      currentAnalysis: null,
      setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),

      updateStreamingRecommendations: (partial) => {
        const current = get().currentAnalysis;
        if (!current) return;

        set({
          currentAnalysis: {
            ...current,
            recommendationsTitle: partial.recommendationsTitle ?? current.recommendationsTitle,
            modelsIntroText: partial.modelsIntroText ?? current.modelsIntroText,
            recommendations: partial.recommendations ?? current.recommendations,
          },
        });
      },

      toggleCurrentFavorite: () => {
        const current = get().currentAnalysis;
        if (!current) return;
        const updated = { ...current, isFavorite: !current.isFavorite };
        set({ currentAnalysis: updated });
      },

      clearCurrentAnalysis: () => set({ currentAnalysis: null }),
    }),
    {
      name: 'current-analysis-storage',
      partialize: (state) => ({ currentAnalysis: state.currentAnalysis }),
    }
  )
);
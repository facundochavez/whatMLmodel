import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import generateRandomUUID from '@/utils/generateRandomUUID';
import { Analysis, AnalysisInfo } from '@/types/analysis.types';
import { analysesMock } from '@/mocks/analyses.mock';
import { useAnalysesStore } from './analyses.store';
import { useGlobalStore } from './global.store';


interface CurrentAnalysisStore {
  currentAnalysis: Analysis | null;
  setCurrentAnalysis: (analysis: Analysis | null) => void;
  toggleCurrentFavorite: () => void;
  clearCurrentAnalysis: () => void;
}

export const useCurrentAnalysisStore = create<CurrentAnalysisStore>()(
  persist(
    (set, get) => ({
      currentAnalysis: null,
      setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),

/*       getAnalysisRecommendations: async (info: AnalysisInfo) => {
        const current = get().currentAnalysis;
        if (!current || !current.info) return;

        const mock = analysesMock[0];
        const updatedAnalysis: Analysis = {
          ...current,
          recommendationsTitle: mock.recommendationsTitle,
          recommendations: mock.recommendations,
          updatedAt: new Date(),
        };

        set({ currentAnalysis: updatedAnalysis });

        const analysesStore = useAnalysesStore.getState();
        const existsInView = analysesStore.analyses.some((a) => a.id === updatedAnalysis.id);

        if (existsInView) {
          analysesStore.updateRecommendations(updatedAnalysis);
        } else {
          analysesStore.addAnalysis(updatedAnalysis);
        }
      }, */

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
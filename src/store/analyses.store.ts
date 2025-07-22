import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { analysesMock } from '@/mocks/analyses.mock';
import { Analysis } from '@/types/analysis.types';
import { useCurrentAnalysisStore } from './currentAnalysis.store';
import { useGlobalStore } from './global.store';
import sleep from '@/utils/sleep';

interface AnalysesStore {
  analyses: Analysis[];
  markedAnalysisId: string;

  setMarkedAnalysisId: (id: string) => void;
  toggleFavorite: (id: string) => void;
  deleteAnalysis: (id: string) => void;
  addAnalysis: (analysis: Analysis) => void;
  updateRecommendations: (analysis: Analysis) => void;
}

export const useAnalysesStore = create<AnalysesStore>()(
  persist(
    (set, get) => ({
      analyses: analysesMock,

      markedAnalysisId: '',
      setMarkedAnalysisId: (id: string) => set({ markedAnalysisId: id }),

      toggleFavorite: (id: string) => {
        const updated = get().analyses.map((a) =>
          a.id === id ? { ...a, isFavorite: !a.isFavorite, updatedAt: new Date() } : a
        );

        set({ analyses: updated });

        const current = useCurrentAnalysisStore.getState().currentAnalysis;
        if (current?.id === id) {
          useCurrentAnalysisStore.getState().toggleCurrentFavorite();
        }
      },

      deleteAnalysis: (id: string) => {
        const updated = get().analyses.filter((a) => a.id !== id);
        set({ analyses: updated });

        const current = useCurrentAnalysisStore.getState().currentAnalysis;
        if (current?.id === id) {
          useGlobalStore.getState().toggleTransitionToHomePage();
          sleep(300);
          useCurrentAnalysisStore.getState().clearCurrentAnalysis();
        }
      },

      addAnalysis: (analysis: Analysis) => {
        set((state) => ({ analyses: [analysis, ...state.analyses] }));
      },

      updateRecommendations: (analysis: Analysis) => {
        const updated = get().analyses.map((a) =>
          a.id === analysis.id
            ? {
              ...a,
              info: analysis.info,
              recommendationsTitle: analysis.recommendationsTitle,
              recommendations: analysis.recommendations,
              updatedAt: new Date(),
            }
            : a
        );

        set({ analyses: updated });
      },
    }),
    {
      name: 'analyses-storage',
      partialize: (state) => ({
        analyses: state.analyses,
      }),
      merge: (persistedState, currentState) => {
        const typedState = persistedState as { analyses: any[] };

        return {
          ...currentState,
          ...typedState,
          analyses: typedState.analyses.map((a) => ({
            ...a,
            createdAt: new Date(a.createdAt),
            updatedAt: new Date(a.updatedAt),
          })),
        };
      }
    }
  )
);

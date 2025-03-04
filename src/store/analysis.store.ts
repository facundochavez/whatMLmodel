import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AnalysisI {
  datasetDescription: string;
  info: {
    datasetSize: number,
    hasComplexData: boolean,
    mainFeatures: string,
    numberOfFeatures: number,
    problemDescription: string,
    targetVariable: string,
  }
  language: string;
  title: string;
}

interface AnalysisStore {
  analysis: AnalysisI | null;
  setAnalysis: (newAnalysis: AnalysisI) => void;
  clearAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisStore>()(
  persist(
    (set) => ({
      analysis: null,
      setAnalysis: (newAnalysis) => {
        sessionStorage.setItem("analysis", JSON.stringify(newAnalysis));
        set({ analysis: newAnalysis });
      },
      clearAnalysis: () => {
        sessionStorage.removeItem("analysis");
        set({ analysis: null });
      },
    }),
    {
      name: "analysis",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

import { create } from "zustand";
import {
  Model,
  ProblemType,
  SimilarDataset,
} from "@/components/TablesGroup/types";
import getModels from "@/utils/getModel";
import getSimilarDatasets from "@/utils/getSimilarDatasets";
import getPerformanceMetrics from "@/utils/getPerformanceMetrics";
import columnsRegression from "@/components/TablesGroup/SimilarDatasetsTable/columnsRegression";
import columnsClassification from "@/components/TablesGroup/SimilarDatasetsTable/columnsClassification";
import columnsClustering from "@/components/TablesGroup/SimilarDatasetsTable/columnsClustering";
import columnsDimensionalityReduction from "@/components/TablesGroup/SimilarDatasetsTable/columnsDimensionalityReduction";
import { persist, createJSONStorage } from "zustand/middleware";

interface TablesGroupState {
  type: ProblemType;
  selectedDatasetIndex: string;
  models: Model[];
  similarDatasets: SimilarDataset[];
  performanceMetrics: any;
  columnsPerformanceMetrics: Record<string, any>;
  setSelectedDatasetIndex: (index: string) => void;
  initializeTables: (recommendations: any, analysis: any) => void;
  setTablesData: (data: Partial<TablesGroupState>) => void;
  clearTablesData: () => void;
}

export const useTablesGroupStore = create<TablesGroupState>()(
  persist(
    (set) => ({
      type: "regression",
      selectedDatasetIndex: "0",
      models: [],
      similarDatasets: [],
      performanceMetrics: null,
      columnsPerformanceMetrics: {
        regression: columnsRegression,
        classification: columnsClassification,
        clustering: columnsClustering,
        dimensionalityReduction: columnsDimensionalityReduction,
      },

      setSelectedDatasetIndex: (index) => set({ selectedDatasetIndex: index }),

      initializeTables: (recommendations, analysis) => {
        if (!recommendations || !analysis) {
          console.error("❌ No hay datos de análisis o recomendaciones disponibles");
          return;
        }

        const type: ProblemType = analysis.problemType || "regression";

        const modelsAliases =
          recommendations.recommendations
            ?.flatMap((rec: any) => rec.tables?.modelsAliases || [])
            .filter((alias: string) => alias) || [];

        const similarDatasetsAliases =
          recommendations.recommendations
            ?.flatMap((rec: any) => rec.tables?.similarDatasetsAliases || [])
            .filter((alias: string) => alias) || [];

        const models = getModels({ type, modelsAliases });
        const similarDatasets = getSimilarDatasets({
          similarDatasetAliases: similarDatasetsAliases,
        });
        const performanceMetrics = getPerformanceMetrics({
          type,
          modelsAliases,
          datasetAlias: similarDatasetsAliases[0] || "",
        });

        set({
          type,
          models,
          similarDatasets,
          performanceMetrics,
        });
      },

      setTablesData: (data) => {
        set((state) => ({
          ...state,
          ...data,
        }));
      },

      clearTablesData: () => {
        set({
          type: "regression",
          models: [],
          similarDatasets: [],
          performanceMetrics: null,
          selectedDatasetIndex: "0",
        });
      },
    }),
    {
      name: "tablesGroup",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

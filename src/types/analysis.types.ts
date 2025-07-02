import { ClassificationModelAlias, ClusteringModelAlias, DimensionalityReductionModelAlias, RegressionModelAlias } from "./models.types";
import { ProblemType } from "./common.types";

export interface Analysis {
  id: string;
  createdAt: string;
  isFavorite: boolean;
  title: string;
  alias: string;
  userDatasetDescription: string;
  language: string;
  info?: {
    problemDescription: string;
    mainFeatures: string;
    targetVariable: string;
    columns: number;
    rows: number;
    needsDimensionalityReduction: boolean;
  },
  recommendationsTitle?: string;
  recommendations?: Array<{
    type: ProblemType;
    paragraph: string;
    tables: {
      modelsAlias: RegressionModelAlias[] | ClassificationModelAlias[] | ClusteringModelAlias[] | DimensionalityReductionModelAlias[];
      similarPipelinesAlias: string[];
    };
  }>;
}
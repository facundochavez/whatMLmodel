import { ClassificationModelAlias, ClusteringModelAlias, DimensionalityReductionModelAlias, RegressionModelAlias } from "./models.types";
import { ProblemType } from "./pipeline.types";

export interface Analysis {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
  title?: string;
  alias?: string;
  userDatasetDescription?: string;
  language?: string;
  info?: AnalysisInfo;
  recommendationsTitle?: string;
  recommendations?: AnalysisRecommendation[];
}

export interface AnalysisInfo {
  problemDescription: string;
  mainFeatures: string;
  targetVariable: string;
  columns: number;
  rows: number;
  needsDimensionalityReduction: boolean;
}

export interface AnalysisRecommendation {
  type: ProblemType;
  paragraph: string;
  tables: {
    modelsAlias: RegressionModelAlias[] | ClassificationModelAlias[] | ClusteringModelAlias[] | DimensionalityReductionModelAlias[];
    similarPipelinesAlias: string[];
  };
}
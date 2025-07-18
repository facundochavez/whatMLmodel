import { ClassificationModelAlias, ClusteringModelAlias, DimensionalityReductionModelAlias, RegressionModelAlias } from "./models.types";
import { ClassificationMetrics, ClusteringMetrics, DimensionalityReductionMetrics, RegressionMetrics } from "./performanceMetrics.types";
import { ProblemType } from "./analysis.types";


export interface Pipeline {
  id: string;
  title: string;
  alias: string;
  problemType: ProblemType;
  icon: number;
  link: {
    platform: string;
    url: string;
  };
  problemDescription: string;
  notebook: {
    preprocessingCode: string;
    dRTraining?: DimensionalityReductionTraining[];
    training:
    | RegressionTraining[]
    | ClassificationTraining[]
    | ClusteringTraining[]
  }
}

type RegressionTraining = {
  modelAlias: RegressionModelAlias;
  trainingCode: string;
  performance: RegressionMetrics;
};

type ClassificationTraining = {
  modelAlias: ClassificationModelAlias;
  trainingCode: string;
  performance: ClassificationMetrics;
};

type ClusteringTraining = {
  modelAlias: ClusteringModelAlias;
  trainingCode: string;
  performance: ClusteringMetrics;
};

type DimensionalityReductionTraining = {
  modelAlias: DimensionalityReductionModelAlias;
  performance: DimensionalityReductionMetrics;
};
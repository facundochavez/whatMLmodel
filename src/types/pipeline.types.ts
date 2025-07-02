import { ClassificationModelAlias, ClusteringModelAlias, DimensionalityReductionModelAlias, RegressionModelAlias } from "./models.types";
import { ProblemType } from "./common.types";


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
    dimensionalityReduction?: DimensionalityReductionTraining[];
    training:
    | RegressionTraining[]
    | ClassificationTraining[]
    | ClusteringTraining[]
  }
}

// TRAINING TYPES

type RegressionTraining = {
  modelAlias: RegressionModelAlias;
  trainingCode: string;
  performance: RegressionPerformances;
};


type ClassificationTraining = {
  modelAlias: ClassificationModelAlias;
  trainingCode: string;
  performance: ClassificationPerformances;
};

type ClusteringTraining = {
  modelAlias: ClusteringModelAlias;
  trainingCode: string;
  performance: ClusteringPerformances;
};

type DimensionalityReductionTraining = {
  modelAlias: DimensionalityReductionModelAlias;
  performance: DimensionalityReductionPerformances;
};


// PERFORMANCES TYPES

type RegressionPerformances = {
  meanAbsoluteError?: number;
  meanSquaredError?: number;
  rootMeanSquaredError?: number;
  rSquared?: number;
  adjustedRSquared?: number;
};

type ClassificationPerformances = {
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  rocAuc?: number;
  crossEntropy?: number;
};

type ClusteringPerformances = {
  inertia?: number;
  silhouetteScore?: number;
  daviesBouldinIndex?: number;
  calinskiHarabaszIndex?: number;
  adjustedRandIndex?: number;
  normalizedMutualInformation?: number;
  fowlkesMallowsScore?: number;
  homogeneity?: number;
  completeness?: number;
  vMeasure?: number;
};

type DimensionalityReductionPerformances = {
  explainedVarianceRatio?: number;
  reconstructionError?: number;
  perplexity?: number;
  coherenceScore?: number;
  isolationForestAnomalyDetection?: number;
};

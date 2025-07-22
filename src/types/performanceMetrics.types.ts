export type PerformanceMetrics =
  | RegressionMetrics[]
  | ClassificationMetrics[]
  | ClusteringMetrics[]
  | DimensionalityReductionMetrics[];


export interface RegressionMetrics {
  meanAbsoluteError?: number;
  meanSquaredError?: number;
  rootMeanSquaredError?: number;
  rSquared?: number;
  adjustedRSquared?: number;
};

export interface ClassificationMetrics {
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  rocAuc?: number;
  crossEntropy?: number;
};

export interface ClusteringMetrics {
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

export interface DimensionalityReductionMetrics {
  explainedVarianceRatio?: number;
  reconstructionError?: number;
  perplexity?: number;
  coherenceScore?: number;
  outlierScoreMean?: number;
};
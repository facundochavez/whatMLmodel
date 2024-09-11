import { ColumnDef } from '@tanstack/react-table';

export type ProblemType =
  | 'regression'
  | 'classification'
  | 'clustering'
  | 'dimensionalityReduction';

// TABLES INTERFACES:

export interface TablesProps {
  type: ProblemType;
  tables: {
    modelsAliases: string[];
    similarDatasetsAliases: string[];
  };
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// MODELS:

export type Model = {
  id: string;
  alias: string;
  name: string;
  type: ProblemType;
  icon: number;
  metrics: {
    trainingTime: string;
    predictionSpeed: string;
    memoryUsage: string;
  };
};

export interface ModelsData {
  [key: string]: Model[];
}

// SIMILAR DATASETS:

export type SimilarDataset = {
  name: string;
  alias: string;
  description: string;
  features: string[];
  targetVariable: string;
  performance: Performance;
};

export type SimilarDatasetsData = SimilarDataset[];

export type DatasetSelectorProps = {
  similarDatasets: SimilarDataset[];
  setSelectedDataset: (value: string) => void;
};

export type ModelsAccordionProps = {
  models: Model[];
  type: ProblemType;
  similarDatasets: SimilarDataset[];
  performanceMetrics: PerformanceMetrics;
  columnsPerformanceMetrics: Record<string, any>;
  setSelectedDataset: (value: string) => void;
};

// PERFORMANCE METRICS:

export type Performance = {
  regression?: RegressionMetrics[];
  classification?: ClassificationMetrics[];
  clustering?: ClusteringMetrics[];
  dimensionalityReduction?: DimensionalityReductionMetrics[];
};

export type PerformanceMetrics =
  | RegressionMetrics[]
  | ClassificationMetrics[]
  | ClusteringMetrics[]
  | DimensionalityReductionMetrics[];

export type PerformanceMetricsByType = {
  regression: RegressionMetrics[];
  classification: ClassificationMetrics[];
  clustering: ClusteringMetrics[];
  dimensionalityReduction: DimensionalityReductionMetrics[];
};

export type PerformanceMetricsList = {
  regression: (keyof RegressionMetrics)[];
  classification: (keyof ClassificationMetrics)[];
  clustering: (keyof ClusteringMetrics)[];
  dimensionalityReduction: (keyof DimensionalityReductionMetrics)[];
};

// PERFORMANCE METRICS BY MODEL:

export type RegressionMetrics = {
  modelAlias: string;
  meanSquaredError: number | string;
  meanAbsoluteError: number | string;
  rootMeanSquaredError: number | string;
  rSquared: number | string;
  adjustedRSquared: number | string;
};

export type ClassificationMetrics = {
  modelAlias: string;
  accuracy: number | string;
  precision: number | string;
  recall: number | string;
  f1Score: number | string;
  rocAuc: number | string;
  crossEntropy: number | string;
};

export type ClusteringMetrics = {
  modelAlias: string;
  silhouetteScore: number | string;
  daviesBouldinScore: number | string;
  adjustedRandIndex: number | string;
  normalizedMutualInformation: number | string;
  homogeneity: number | string;
  completeness: number | string;
  vMeasure: number | string;
};

export type DimensionalityReductionMetrics = {
  modelAlias: string;
  explainedVarianceRatio: number | string;
  reconstructionError: number | string;
  perplexity: number | string;
  coherenceScore: number | string;
  isolationForestAnomalyDetection: number | string;
};

export type RegressionMetricsKeys = keyof RegressionMetrics;
export type ClassificationMetricsKeys = keyof ClassificationMetrics;
export type ClusteringMetricsKeys = keyof ClusteringMetrics;
export type DimensionalityReductionMetricsKeys =
  keyof DimensionalityReductionMetrics;

export type MetricsKeysByProblemType<T extends ProblemType> =
  T extends 'regression'
    ? RegressionMetricsKeys
    : T extends 'classification'
    ? ClassificationMetricsKeys
    : T extends 'clustering'
    ? ClusteringMetricsKeys
    : T extends 'dimensionalityReduction'
    ? DimensionalityReductionMetricsKeys
    : never;

    export type MetricsByModelType<T extends ProblemType> = 
  T extends 'regression' ? RegressionMetrics[] :
  T extends 'classification' ? ClassificationMetrics[] :
  T extends 'clustering' ? ClusteringMetrics[] :
  T extends 'dimensionalityReduction' ? DimensionalityReductionMetrics[] :
  never;
import { ProblemType } from "./common.types";

export interface Model {
  id: string;
  alias: string;
  name: string;
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

export interface Metric {
  alias: string;
  name: string;
}

export interface PerformanceMetrics {
  [key: string]: Metric[]
}

export type RegressionModelAlias =
  | 'linear-regression'
  | 'polynomial-regression'
  | 'elastic-net-regression'
  | 'gradient-boosting-regression'
  | 'neural-networks-regression'
  | 'support-vector-machines-regression'
  | 'decision-tree-regression'
  | 'random-forest-regression'
  | 'xgboost-regression'
  | 'lightgbm-regression'
  | 'catboost-regression'
  | 'ensemble-methods-regression'
  | 'multilayer-perceptron-regression'
  | 'extreme-learning-machines-regression'
  | 'convolutional-neural-networks-regression'

export type ClassificationModelAlias =
  | 'logistic-regression'
  | 'naive-bayes-classification'
  | 'adaboost-classification'
  | 'gaussian-naive-bayes-classification'
  | 'quadratic-discriminant-analysis-classification'
  | 'k-nearest-neighbors-classification'
  | 'bayesian-networks-classification'
  | 'gradient-boosting-classification'
  | 'neural-networks-classification'
  | 'support-vector-machines-classification'
  | 'decision-tree-classification'
  | 'random-forest-classification'
  | 'xgboost-classification'
  | 'lightgbm-classification'
  | 'catboost-classification'
  | 'ensemble-methods-classification'
  | 'multilayer-perceptron-classification'
  | 'extreme-learning-machines-classification'
  | 'convolutional-neural-networks-classification';

export type ClusteringModelAlias =
  | 'k-means-clustering'
  | 'hierarchical-clustering'
  | 'dbscan-clustering'
  | 'mean-shift-clustering'
  | 'gaussian-mixture-clustering'
  | 'spectral-clustering'

export type DimensionalityReductionModelAlias =
  | 'principal-component-analysis'
  | 'linear-discriminant-analysis'
  | 't-distributed-stochastic-neighbor-embedding'
  | 'isomap'
  | 'autoencoders'
  | 'umap'
  | 'independent-component-analysis'
  | 'local-linear-embedding'
import { PerformanceMetrics } from "@/types/models.types";

export const performanceMetrics: PerformanceMetrics = {
  regression: [
    {
      alias: "meanAbsoluteError",
      name: "Mean Absolute Error",
    },
    {
      alias: "meanSquaredError",
      name: "Mean Squared Error",
    },
    {
      alias: "rootMeanSquaredError",
      name: "Root Mean Squared Error",
    },
    {
      alias: "rSquared",
      name: "R-Squared",
    },
    {
      alias: "adjustedRSquared",
      name: "Adjusted R-Squared",
    },
  ],
  classification: [
    {
      alias: "accuracy",
      name: "Accuracy",
    },
    {
      alias: "precision",
      name: "Precision",
    },
    {
      alias: "recall",
      name: "Recall",
    },
    {
      alias: "f1Score",
      name: "F1 Score",
    },
    {
      alias: "rocAuc",
      name: "ROC AUC",
    },
    {
      alias: "crossEntropy",
      name: "Cross-Entropy",
    }
  ],
  clustering: [
    {
      alias: "inertia",
      name: "Inertia",
    },
    {
      alias: "silhouetteScore",
      name: "Silhouette Score",
    },
    {
      alias: "daviesBouldinIndex",
      name: "Davies-Bouldin Index",
    },
    {
      alias: "calinskiHarabaszIndex",
      name: "Calinski-Harabasz Index",
    },
    {
      alias: "adjustedRandIndex",
      name: "Adjusted Rand Index",
    },
    {
      alias: "normalizedMutualInformation",
      name: "Normalized Mutual Information",
    },
    {
      alias: "fowlkesMallowsScore",
      name: "Fowlkes-Mallows Score",
    },
    {
      alias: "homogeneity",
      name: "Homogeneity",
    },
    {
      alias: "completeness",
      name: "Completeness",
    },
    {
      alias: "vMeasure",
      name: "V-Measure",
    },
  ],
  dimensionalityReduction: [
    {
      alias: "explainedVarianceRatio",
      name: "Explained Variance Ratio",
    },
    {
      alias: "reconstructionError",
      name: "Reconstruction Error",
    },
    {
      alias: "perplexity",
      name: "Perplexity",
    },
    {
      alias: "coherenceScore",
      name: "Coherence Score",
    },
    {
      alias: "isolationForestAnomalyDetection",
      name: "Isolation Forest Anomaly Detection",
    }
  ],
}

import { ModelsData } from "@/types/models.types";

export const modelsData: ModelsData = {
  regression: [
    {
      id: "REG-001",
      alias: "linear-regression",
      name: "Linear Regression",
      icon: 1,
      metrics: {
        trainingTime: "Short",
        predictionSpeed: "Fast",
        memoryUsage: "Light"
      }
    },
    {
      id: "REG-002",
      alias: "polynomial-regression",
      name: "Polynomial Regression",
      icon: 2,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "REG-003",
      alias: "elastic-net-regression",
      name: "Elastic Net Regression",
      icon: 3,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "REG-004",
      alias: "gradient-boosting-regression",
      name: "Gradient Boosting (R)",
      icon: 4,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "REG-005",
      alias: "neural-networks-regression",
      name: "Neural Networks (R)",
      icon: 5,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "REG-006",
      alias: "support-vector-machines-regression",
      name: "Support Vector Machine (SVM) (R)",
      icon: 6,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "REG-007",
      alias: "decision-tree-regression",
      name: "Decision Tree (R)",
      icon: 7,
      metrics: {
        trainingTime: "Short",
        predictionSpeed: "Fast",
        memoryUsage: "Medium"
      }
    },
    {
      id: "REG-008",
      alias: "random-forest-regression",
      name: "Random Forest (R)",
      icon: 8,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "REG-009",
      alias: "xgboost-regression",
      name: "XGBoost (R)",
      icon: 9,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "REG-010",
      alias: "lightgbm-regression",
      name: "LightGBM (R)",
      icon: 4,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "REG-011",
      alias: "catboost-regression",
      name: "CatBoost (R)",
      icon: 4,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "REG-012",
      alias: "ensemble-methods-regression",
      name: "Ensemble Methods (R)",
      icon: 5,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "REG-013",
      alias: "multilayer-perceptron-regression",
      name: "Multilayer Perceptron (MLP) (R)",
      icon: 5,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "REG-014",
      alias: "extreme-learning-machines-regression",
      name: "Extreme Learning Machines (ELM) (R)",
      icon: 5,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "REG-015",
      alias: "convolutional-neural-networks-regression",
      name: "Convolutional Neural Networks (R)",
      icon: 5,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    }
  ],
  classification: [
    {
      id: "CLA-001",
      alias: "logistic-regression",
      name: "Logistic Regression",
      icon: 10,
      metrics: {
        trainingTime: "Short",
        predictionSpeed: "Fast",
        memoryUsage: "Light"
      }
    },
    {
      id: "CLA-002",
      alias: "naive-bayes-classification",
      name: "Naive Bayes Classification",
      icon: 11,
      metrics: {
        trainingTime: "Short",
        predictionSpeed: "Fast",
        memoryUsage: "Light"
      }
    },
    {
      id: "CLA-003",
      alias: "adaboost-classification",
      name: "AdaBoost Classification",
      icon: 12,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-004",
      alias: "gaussian-naive-bayes-classification",
      name: "Gaussian Naive Bayes",
      icon: 11,
      metrics: {
        trainingTime: "Short",
        predictionSpeed: "Fast",
        memoryUsage: "Light"
      }
    },
    {
      id: "CLA-005",
      alias: "quadratic-discriminant-analysis-classification",
      name: "Quadratic Discriminant Analysis",
      icon: 13,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-006",
      alias: "k-nearest-neighbors-classification",
      name: "K-Nearest Neighbors",
      icon: 14,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-007",
      alias: "bayesian-networks-classification",
      name: "Bayesian Networks",
      icon: 15,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-008",
      alias: "gradient-boosting-classification",
      name: "Gradient Boosting (C)",
      icon: 4,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "CLA-009",
      alias: "neural-networks-classification",
      name: "Neural Networks (C)",
      icon: 5,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "CLA-010",
      alias: "support-vector-machines-classification",
      name: "Support Vector Machines (SVM) (C)",
      icon: 16,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-011",
      alias: "decision-tree-classification",
      name: "Decision Tree (C)",
      icon: 17,
      metrics: {
        trainingTime: "Short",
        predictionSpeed: "Fast",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-012",
      alias: "random-forest-classification",
      name: "Random Forest (C)",
      icon: 18,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "CLA-013",
      alias: "xgboost-classification",
      name: "XGBoost (C)",
      icon: 9,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-014",
      alias: "lightgbm-classification",
      name: "LightGBM (C)",
      icon: 4,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-015",
      alias: "catboost-classification",
      name: "CatBoost (C)",
      icon: 4,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-016",
      alias: "ensemble-methods-classification",
      name: "Ensemble Methods (C)",
      icon: 5,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-017",
      alias: "multilayer-perceptron-classification",
      name: "Multilayer Perceptron (MLP) (C)",
      icon: 5,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Medium",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "CLA-018",
      alias: "extreme-learning-machines-classification",
      name: "Extreme Learning Machines (ELM) (C)",
      icon: 5,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLA-019",
      alias: "convolutional-neural-networks-classification",
      name: "Convolutional Neural Networks (CNN) (C)",
      icon: 5,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    }
  ],
  clustering: [
    {
      id: "CLU-001",
      alias: "k-means-clustering",
      name: "K-Means Clustering",
      icon: 19,
      metrics: {
        trainingTime: "Short",
        predictionSpeed: "Fast",
        memoryUsage: "Light"
      }
    },
    {
      id: "CLU-002",
      alias: "hierarchical-clustering",
      name: "Hierarchical Clustering",
      icon: 20,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLU-003",
      alias: "dbscan-clustering",
      name: "DBSCAN",
      icon: 21,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLU-004",
      alias: "mean-shift-clustering",
      name: "Mean Shift",
      icon: 19,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLU-005",
      alias: "gaussian-mixture-clustering",
      name: "Gaussian Mixture Models (GMM)",
      icon: 22,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "CLU-006",
      alias: "spectral-clustering",
      name: "Spectral Clustering",
      icon: 21,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    }
  ],
  dimensionalityReduction: [
    {
      id: "DR-001",
      alias: "principal-component-analysis",
      name: "Principal Component Analysis (PCA)",
      icon: 23,
      metrics: {
        trainingTime: "Short",
        predictionSpeed: "Fast",
        memoryUsage: "Light"
      }
    },
    {
      id: "DR-002",
      alias: "linear-discriminant-analysis",
      name: "Linear Discriminant Analysis (LDA)",
      icon: 24,
      metrics: {
        trainingTime: "Medium",
        predictionSpeed: "Medium",
        memoryUsage: "Medium"
      }
    },
    {
      id: "DR-003",
      alias: "t-distributed-stochastic-neighbor-embedding",
      name: "t-Distributed Stochastic Neighbor Embedding (t-SNE)",
      icon: 19,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "DR-004",
      alias: "isomap",
      name: "Isomap",
      icon: 25,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "DR-005",
      alias: "autoencoders",
      name: "Autoencoders",
      icon: 26,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "DR-006",
      alias: "umap",
      name: "Uniform Manifold Approximation and Projection (UMAP)",
      icon: 8,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "DR-007",
      alias: "independent-component-analysis",
      name: "Independent Component Analysis (ICA)",
      icon: 27,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    },
    {
      id: "DR-008",
      alias: "locally-linear-embedding",
      name: "Locally Linear Embedding (LLE)",
      icon: 25,
      metrics: {
        trainingTime: "Long",
        predictionSpeed: "Slow",
        memoryUsage: "Heavy"
      }
    }
  ]
}

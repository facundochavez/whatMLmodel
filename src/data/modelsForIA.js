
// "MODELS" FOR IA
{
  "regression": [
    {
      "alias": "linear-regression",
      "name": "Linear Regression"
    },
    {
      "alias": "polynomial-regression",
      "name": "Polynomial Regression"
    },
    {
      "alias": "elastic-net-regression",
      "name": "Elastic Net Regression"
    },
    {
      "alias": "gradient-boosting-r",
      "name": "Gradient Boosting (R)"
    },
    {
      "alias": "neural-networks-r",
      "name": "Neural Networks (R)"
    },
    {
      "alias": "svm-r",
      "name": "Support Vector Machine (SVM) (R)"
    },
    {
      "alias": "decision-tree-r",
      "name": "Decision Tree (R)"
    },
    {
      "alias": "random-forest-r",
      "name": "Random Forest (R)"
    },
    {
      "alias": "xgboost-r",
      "name": "XGBoost (R)"
    },
    {
      "alias": "lightgbm-r",
      "name": "LightGBM (R)"
    },
    {
      "alias": "catboost-r",
      "name": "CatBoost (R)"
    },
    {
      "alias": "ensemble-methods-r",
      "name": "Ensemble Methods (R)"
    },
    {
      "alias": "mlp-r",
      "name": "Multilayer Perceptron (MLP) (R)"
    },
    {
      "alias": "elm-r",
      "name": "Extreme Learning Machines (ELM) (R)"
    }
  ],
  "classification": [
    {
      "alias": "logistic-regression",
      "name": "Logistic Regression"
    },
    {
      "alias": "naive-bayes-classification",
      "name": "Naive Bayes Classification"
    },
    {
      "alias": "adaboost-classification",
      "name": "AdaBoost Classification"
    },
    {
      "alias": "gaussian-naive-bayes",
      "name": "Gaussian Naive Bayes"
    },
    {
      "alias": "qda",
      "name": "Quadratic Discriminant Analysis"
    },
    {
      "alias": "knn",
      "name": "K-Nearest Neighbors"
    },
    {
      "alias": "bayesian-networks",
      "name": "Bayesian Networks"
    },
    {
      "alias": "gradient-boosting-c",
      "name": "Gradient Boosting (C)"
    },
    {
      "alias": "neural-networks-c",
      "name": "Neural Networks (C)"
    },
    {
      "alias": "svm-c",
      "name": "Support Vector Machine (SVM) (C)"
    },
    {
      "alias": "decision-tree-c",
      "name": "Decision Tree (C)"
    },
    {
      "alias": "random-forest-c",
      "name": "Random Forest (C)"
    },
    {
      "alias": "xgboost-c",
      "name": "XGBoost (C)"
    },
    {
      "alias": "lightgbm-c",
      "name": "LightGBM (C)"
    },
    {
      "alias": "catboost-c",
      "name": "CatBoost (C)"
    },
    {
      "alias": "ensemble-methods-c",
      "name": "Ensemble Methods (C)"
    },
    {
      "alias": "mlp-c",
      "name": "Multilayer Perceptron (MLP) (C)"
    },
    {
      "alias": "elm-c",
      "name": "Extreme Learning Machines (ELM) (C)"
    }
  ],
  "clustering": [
    {
      "alias": "k-means-clustering",
      "name": "K-Means Clustering"
    },
    {
      "alias": "hierarchical-clustering",
      "name": "Hierarchical Clustering"
    },
  ],
  "dimensionality-reduction": [
    {
      "alias": "pca",
      "name": "Principal Component Analysis (PCA)"
    },
    {
      "alias": "tsne",
      "name": "t-SNE"
    },
    {
      "alias": "lda",
      "name": "Linear Discriminant Analysis (LDA)"
    },
    {
      "alias": "autoencoder",
      "name": "Autoencoder"
    },
    {
      "alias": "isomap",
      "name": "Isomap"
    },
  ]
}

// "SIMILAR DATASETS"  FOR IA
// 1ro revisar que esten bien clasificados los 3 ejemplos principales (titanic, hose prices y el otro)
// 2do Alimentar con eso el similar-datasets.data

{
  "regression": [
    {
      "alias": "house-prices",
      "name": "House Prices",
      "features": "Various aspects of residential homes: size, number of bedrooms, building class, etc.",
      "targetVariable": "The final price of a house",
      "idealModel": "linear-regression"
    },
    {
      "alias": "boston-housing",
      "name": "Boston Housing",
      "features": "Attributes of housing in Boston: crime rate, average number of rooms, age of houses, etc.",
      "targetVariable": "Median value of owner-occupied homes",
      "idealModel": "gradient-boosting-r"
    },
    {
      "alias": "auto-mpg",
      "name": "Auto MPG",
      "features": "Various aspects of automobile features: weight, horsepower, number of cylinders, etc.",
      "targetVariable": "Miles per gallon (MPG)",
      "idealModel": "polynomial-regression"
    },
    {
      "alias": "diamonds",
      "name": "Diamonds",
      "features": "Characteristics of diamonds: carat, cut, color, clarity, etc.",
      "targetVariable": "Price of the diamond",
      "idealModel": "xgboost-r"
    },
    {
      "alias": "california-housing",
      "name": "California Housing",
      "features": "Attributes of California housing: location, population, median income, etc.",
      "targetVariable": "Median house value",
      "idealModel": "neural-networks-r"
    }
  ],
  "classification": [
    {
      "alias": "titanic",
      "name": "Titanic",
      "features": "The features of Titanic passengers: sex, age, p-class, etc.",
      "targetVariable": "Probability of survival",
      "idealModel": "logistic-regression"
    },
    {
      "alias": "digit-recognizer",
      "name": "Digit Recognizer",
      "features": "Pixel values of handwritten digits",
      "targetVariable": "Digit class (0-9)",
      "idealModel": "random-forest-c"
    },
    {
      "alias": "iris",
      "name": "Iris",
      "features": "Measurements of iris flowers: sepal length, sepal width, petal length, petal width",
      "targetVariable": "Species of iris flower",
      "idealModel": "svm-c"
    },
    {
      "alias": "wine-quality",
      "name": "Wine Quality",
      "features": "Attributes of wine: fixed acidity, volatile acidity, citric acid, etc.",
      "targetVariable": "Quality score of wine",
      "idealModel": "decision-tree-c"
    },
    {
      "alias": "cifar-10",
      "name": "CIFAR-10",
      "features": "Pixel values of images from 10 different classes",
      "targetVariable": "Class label (10 classes)",
      "idealModel": "neural-networks-c"
    }
  ],
  "clustering": [
    {
      "alias": "iris",
      "name": "Iris",
      "features": "Measurements of iris flowers: sepal length, sepal width, petal length, petal width",
      "targetVariable": "Species of iris flower (for reference)",
      "idealModel": "k-means-clustering"
    },
    {
      "alias": "customer-segmentation",
      "name": "Customer Segmentation",
      "features": "Attributes of customers: annual income, spending score, etc.",
      "targetVariable": "Customer segments (for interpretation)",
      "idealModel": "hierarchical-clustering"
    },
    {
      "alias": "mall-customers",
      "name": "Mall Customers",
      "features": "Customer data: gender, age, annual income, spending score",
      "targetVariable": "Customer segments (for interpretation)",
      "idealModel": "k-means-clustering"
    },
    {
      "alias": "color-image-clustering",
      "name": "Color Image Clustering",
      "features": "Pixel values from color images",
      "targetVariable": "Image clusters (for interpretation)",
      "idealModel": "hierarchical-clustering"
    },
    {
      "alias": "wine-data",
      "name": "Wine Data",
      "features": "Chemical properties of wine",
      "targetVariable": "Wine clusters (for interpretation)",
      "idealModel": "k-means-clustering"
    }
  ],
  "dimensionality-reduction": [
    {
      "alias": "pca",
      "name": "Principal Component Analysis (PCA)",
      "features": "High-dimensional data from the MNIST dataset",
      "targetVariable": "Digit class (0-9, for visualization)",
      "idealModel": "pca"
    },
    {
      "alias": "tsne",
      "name": "t-SNE",
      "features": "High-dimensional data from the CIFAR-10 dataset",
      "targetVariable": "Class label (10 classes, for visualization)",
      "idealModel": "tsne"
    },
    {
      "alias": "lda",
      "name": "Linear Discriminant Analysis (LDA)",
      "features": "High-dimensional data from the Iris dataset",
      "targetVariable": "Species of iris flower",
      "idealModel": "lda"
    },
    {
      "alias": "autoencoder",
      "name": "Autoencoder",
      "features": "High-dimensional image data from the CelebA dataset",
      "targetVariable": "Facial features (for reconstruction)",
      "idealModel": "autoencoder"
    },
    {
      "alias": "isomap",
      "name": "Isomap",
      "features": "High-dimensional data from the Swiss Roll dataset",
      "targetVariable": "Intrinsic geometry (for visualization)",
      "idealModel": "isomap"
    }
  ]
}
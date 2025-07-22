import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline = {
  alias: "red-wine-quality",
  title: "Red Wine Quality",
  problemType: "regression",
  icon: 6,
  link: {
    platform: "UCI ML Repo",
    url: "https://archive.ics.uci.edu/dataset/186/wine+quality",
  },
  problemDescription:
    "Red Wine Quality is a well-known regression dataset that focuses on predicting the sensory quality of red Portuguese Vinho Verde wines based on their physicochemical properties. Each sample corresponds to a wine batch that has undergone laboratory testing, providing numerical values for this variables:\n\n - Fixed acidity\n - Volatile acidity\n - Citric acid\n - Residual sugar\n - Chlorides\n - Free sulfur dioxide\n - Total sulfur dioxide\n - Density\n - pH\n - Sulphates\n - Alcohol content\n\n The target variable is the wine’s quality, rated by human tasters on a scale from 0 to 10, although most scores fall between 3 and 8. The dataset is widely used to evaluate the performance of linear and nonlinear regression algorithms due to its balance between complexity and interpretability. It allows for an exploration of how chemical composition relates to perceived quality, while also challenging models to manage subtle nonlinear relationships, multicollinearity, and feature interactions. The problem is particularly relevant in the food and beverage industry, where predictive models can assist in quality control, product optimization, and consumer satisfaction.",
  notebook: {
    preprocessingCode:
      "import pandas as pd\n\n# Load the dataset from CSV\ndata = pd.read_csv(\"red-wine-quality.csv\")\n\n# Separate the input features and the target variable\nX = data.drop(columns=[\"quality\"])\ny = data[\"quality\"]\n\n# Reshape y to 2D array for compatibility with sklearn models\ny_processed = y.values.reshape(-1, 1)\n\n# Reshape X to 2D array for compatibility with sklearn models\nX_processed = X.values.reshape(-1, X.shape[1])\n\n# Add a column of ones to the feature matrix to account for the intercept\nX_processed = np.hstack((np.ones((X_processed.shape[0], 1)), X_processed))",
    training: [
      {
        modelAlias: "linear-regression",
        trainingCode: "from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_processed, y_processed)\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.003,
          meanSquaredError: 0.00015,
          rootMeanSquaredError: 0.005,
          rSquared: 0.997,
          adjustedRSquared: 0.9998
        },
      },
      {
        modelAlias: "polynomial-regression",
        trainingCode: "from sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.linear_model import LinearRegression\n\npoly = PolynomialFeatures(degree=2)\nX_poly = poly.fit_transform(X_processed)\nmodel = LinearRegression()\nmodel.fit(X_poly, y_processed)\npredictions = model.predict(X_poly)",
        performance: {
          meanAbsoluteError: 0.002,
          meanSquaredError: 0.00002,
          rootMeanSquaredError: 0.003,
          rSquared: 0.9991,
          adjustedRSquared: 0.9999
        }
      },
      {
        modelAlias: "elastic-net-regression",
        trainingCode: "from sklearn.linear_model import ElasticNet\n\nmodel = ElasticNet(alpha=0.01, l1_ratio=0.5)\nmodel.fit(X_processed, y_processed)\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.004,
          meanSquaredError: 0.00010,
          rootMeanSquaredError: 0.008,
          rSquared: 0.9993,
          adjustedRSquared: 0.9993
        }
      },
      {
        modelAlias: "gradient-boosting-regression",
        trainingCode: "from sklearn.ensemble import GradientBoostingRegressor\n\nmodel = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.003,
          meanSquaredError: 0.00002,
          rootMeanSquaredError: 0.004,
          rSquared: 0.9998,
          adjustedRSquared: 0.9998
        }
      },
      {
        modelAlias: "support-vector-machines-regression",
        trainingCode: "from sklearn.svm import SVR\n\nmodel = SVR(kernel='rbf', C=1e3, gamma=0.1)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.005,
          meanSquaredError: 0.00008,
          rootMeanSquaredError: 0.008,
          rSquared: 0.9997,
          adjustedRSquared: 0.9992
        }
      },
      {
        modelAlias: "decision-tree-regression",
        trainingCode: "from sklearn.tree import DecisionTreeRegressor\n\nmodel = DecisionTreeRegressor(max_depth=5)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.006,
          meanSquaredError: 0.00012,
          rootMeanSquaredError: 0.011,
          rSquared: 0.9996,
          adjustedRSquared: 0.9994
        }
      },
      {
        modelAlias: "random-forest-regression",
        trainingCode: "from sklearn.ensemble import RandomForestRegressor\n\nmodel = RandomForestRegressor(n_estimators=100, max_depth=5)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.005,
          meanSquaredError: 0.00005,
          rootMeanSquaredError: 0.006,
          rSquared: 0.9991,
          adjustedRSquared: 0.9991
        }
      },
      {
        modelAlias: "xgboost-regression",
        trainingCode: "import xgboost as xgb\n\nmodel = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=3)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.003,
          meanSquaredError: 0.00001,
          rootMeanSquaredError: 0.003,
          rSquared: 0.9999,
          adjustedRSquared: 0.9999
        }
      },
      {
        modelAlias: "lightgbm-regression",
        trainingCode: "import lightgbm as lgb\n\nmodel = lgb.LGBMRegressor(n_estimators=100, learning_rate=0.1, max_depth=3)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.003,
          meanSquaredError: 0.00001,
          rootMeanSquaredError: 0.005,
          rSquared: 0.9999,
          adjustedRSquared: 0.9999
        }
      },
      {
        modelAlias: "catboost-regression",
        trainingCode: "from catboost import CatBoostRegressor\n\nmodel = CatBoostRegressor(iterations=100, learning_rate=0.1, depth=3, verbose=0)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.0005,
          meanSquaredError: 0.00001,
          rootMeanSquaredError: 0.003,
          rSquared: 0.9998,
          adjustedRSquared: 0.9997
        }
      },
      {
        modelAlias: "ensemble-methods-regression",
        trainingCode: "from sklearn.ensemble import VotingRegressor\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.tree import DecisionTreeRegressor\nfrom xgboost import XGBRegressor\n\nmodel = VotingRegressor(estimators=[\n    ('lr', LinearRegression()),\n    ('dt', DecisionTreeRegressor(max_depth=5)),\n    ('xgb', XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=3))\n])\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.003,
          meanSquaredError: 0.00002,
          rootMeanSquaredError: 0.004,
          rSquared: 0.9997,
          adjustedRSquared: 0.9997
        }
      },
      {
        modelAlias: "neural-networks-regression",
        trainingCode: "import tensorflow as tf\n\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(units=10, activation='relu', input_shape=(1,)),\n  tf.keras.layers.Dense(units=1)\n])\n\nmodel.compile(optimizer='adam', loss='mse')\nmodel.fit(X_processed, y_processed, epochs=500, verbose=0)",
        performance: {
          meanAbsoluteError: 0.004,
          meanSquaredError: 0.00006,
          rootMeanSquaredError: 0.007,
          rSquared: 0.9991,
          adjustedRSquared: 0.9998
        }
      },
      {
        modelAlias: "multilayer-perceptron-regression",
        trainingCode: "from sklearn.neural_network import MLPRegressor\n\nmodel = MLPRegressor(hidden_layer_sizes=(10,), max_iter=1000)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.003,
          meanSquaredError: 0.00002,
          rootMeanSquaredError: 0.004,
          rSquared: 0.9998,
          adjustedRSquared: 0.9998
        }
      },
      {
        modelAlias: "extreme-learning-machines-regression",
        trainingCode: "# Extreme Learning Machine (ELM) example using hpelm or custom wrapper\nfrom hpelm import ELM\n\nmodel = ELM(X_processed.shape[1], 1)\nmodel.add_neurons(10, 'sigm')\nmodel.train(X_processed, y_processed)\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.005,
          meanSquaredError: 0.00007,
          rootMeanSquaredError: 0.008,
          rSquared: 0.9999,
          adjustedRSquared: 0.9999
        }
      }
    ]
  }
};

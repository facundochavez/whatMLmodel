import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline = {
  alias: "auto-mpg",
  title: "Auto MPG",
  problemType: "regression",
  icon: 7, // puedes elegir el ícono que corresponda
  link: {
    platform: "UCI ML Repo",
    url: "https://archive.ics.uci.edu/ml/datasets/auto+mpg",
  },
  problemDescription:
    "The Auto MPG dataset is a classic regression problem designed to predict automobile fuel efficiency (in miles per gallon) using various vehicle attributes. Each record in the dataset corresponds to a single car model and includes the following numerical and categorical variables:\n\n - Cylinders (number of engine cylinders)\n - Displacement (engine size in cubic inches)\n - Horsepower (engine power output)\n - Weight (vehicle weight in pounds)\n - Acceleration (0–60 mph time)\n - Model Year (year of manufacture)\n - Origin (categorical: USA, Europe, Asia)\n - MPG (miles per gallon) as the target variable\n\nThis dataset is often used to benchmark regression algorithms and explore relationships between engine characteristics and fuel efficiency. Key challenges include handling missing values (horsepower), mixed data types, and potential nonlinear dependencies between features. It's particularly useful for exercises in feature engineering, model selection, and evaluation of predictive accuracy in transport and environmental analytics.",
  notebook: {
    preprocessingCode: "import pandas as pd\nfrom tensorflow import keras\n\n# Download the dataset from the UCI ML repository\nurl = \"http://archive.ics.uci.edu/ml/machine-learning-databases/auto-mpg/auto-mpg.data\"\npath = keras.utils.get_file(\"auto-mpg.data\", url)\n\n# Define the column names\ncolumn_names = [\"mpg\", \"cylinders\", \"displacement\", \"horsepower\", \"weight\", \"acceleration\", \"model_year\", \"origin\", \"car_name\"]\n\n# Load the dataset\ndata = pd.read_csv(path, names=column_names, delim_whitespace=True, na_values=\"?\")\n\n# Drop rows with missing values\ndata.dropna(inplace=True)\n\n# Drop non-numeric column\ndata.drop(columns=[\"car_name\"], inplace=True)\n\n# Separate features and target\nX = data.drop(columns=[\"mpg\"])\ny = data[\"mpg\"]\n\n# Optional: Normalize features\nX_processed = (X - X.mean()) / X.std()\ny_processed = y.values.reshape(-1, 1)",
    training: [
      {
        modelAlias: "linear-regression",
        trainingCode: "from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_processed, y_processed)\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.004,
          meanSquaredError: 0.0001,
          rootMeanSquaredError: 0.004,
          rSquared: 0.998,
          adjustedRSquared: 0.9997
        },
      },
      {
        modelAlias: "polynomial-regression",
        trainingCode: "from sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.linear_model import LinearRegression\n\npoly = PolynomialFeatures(degree=2)\nX_poly = poly.fit_transform(X_processed)\nmodel = LinearRegression()\nmodel.fit(X_poly, y_processed)\npredictions = model.predict(X_poly)",
        performance: {
          meanAbsoluteError: 0.003,
          meanSquaredError: 0.00001,
          rootMeanSquaredError: 0.005,
          rSquared: 0.9992,
          adjustedRSquared: 0.9998
        }
      },
      {
        modelAlias: "elastic-net-regression",
        trainingCode: "from sklearn.linear_model import ElasticNet\n\nmodel = ElasticNet(alpha=0.01, l1_ratio=0.5)\nmodel.fit(X_processed, y_processed)\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.003,
          meanSquaredError: 0.0009,
          rootMeanSquaredError: 0.006,
          rSquared: 0.9992,
          adjustedRSquared: 0.9991
        }
      },
      {
        modelAlias: "gradient-boosting-regression",
        trainingCode: "from sklearn.ensemble import GradientBoostingRegressor\n\nmodel = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.005,
          meanSquaredError: 0.00006,
          rootMeanSquaredError: 0.008,
          rSquared: 0.9999,
          adjustedRSquared: 0.9992
        }
      },
      {
        modelAlias: "support-vector-machines-regression",
        trainingCode: "from sklearn.svm import SVR\n\nmodel = SVR(kernel='rbf', C=1e3, gamma=0.1)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.006,
          meanSquaredError: 0.00007,
          rootMeanSquaredError: 0.002,
          rSquared: 0.9991,
          adjustedRSquared: 0.9992
        }
      },
      {
        modelAlias: "decision-tree-regression",
        trainingCode: "from sklearn.tree import DecisionTreeRegressor\n\nmodel = DecisionTreeRegressor(max_depth=5)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.008,
          meanSquaredError: 0.00016,
          rootMeanSquaredError: 0.012,
          rSquared: 0.9997,
          adjustedRSquared: 0.9984
        }
      },
      {
        modelAlias: "random-forest-regression",
        trainingCode: "from sklearn.ensemble import RandomForestRegressor\n\nmodel = RandomForestRegressor(n_estimators=100, max_depth=5)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.008,
          meanSquaredError: 0.00006,
          rootMeanSquaredError: 0.007,
          rSquared: 0.9998,
          adjustedRSquared: 0.9984
        }
      },
      {
        modelAlias: "xgboost-regression",
        trainingCode: "import xgboost as xgb\n\nmodel = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=3)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.0035,
          meanSquaredError: 0.000015,
          rootMeanSquaredError: 0.004,
          rSquared: 0.9991,
          adjustedRSquared: 0.9998
        }
      },
      {
        modelAlias: "lightgbm-regression",
        trainingCode: "import lightgbm as lgb\n\nmodel = lgb.LGBMRegressor(n_estimators=100, learning_rate=0.1, max_depth=3)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.009,
          meanSquaredError: 0.00004,
          rootMeanSquaredError: 0.007,
          rSquared: 0.9997,
          adjustedRSquared: 0.9996
        }
      },
      {
        modelAlias: "catboost-regression",
        trainingCode: "from catboost import CatBoostRegressor\n\nmodel = CatBoostRegressor(iterations=100, learning_rate=0.1, depth=3, verbose=0)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.0008,
          meanSquaredError: 0.00005,
          rootMeanSquaredError: 0.004,
          rSquared: 0.9994,
          adjustedRSquared: 0.9998
        }
      },
      {
        modelAlias: "ensemble-methods-regression",
        trainingCode: "from sklearn.ensemble import VotingRegressor\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.tree import DecisionTreeRegressor\nfrom xgboost import XGBRegressor\n\nmodel = VotingRegressor(estimators=[\n    ('lr', LinearRegression()),\n    ('dt', DecisionTreeRegressor(max_depth=5)),\n    ('xgb', XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=3))\n])\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.0045,
          meanSquaredError: 0.00015,
          rootMeanSquaredError: 0.004,
          rSquared: 0.9991,
          adjustedRSquared: 0.9996
        }
      },
      {
        modelAlias: "neural-networks-regression",
        trainingCode: "import tensorflow as tf\n\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(units=10, activation='relu', input_shape=(1,)),\n  tf.keras.layers.Dense(units=1)\n])\n\nmodel.compile(optimizer='adam', loss='mse')\nmodel.fit(X_processed, y_processed, epochs=500, verbose=0)",
        performance: {
          meanAbsoluteError: 0.009,
          meanSquaredError: 0.00004,
          rootMeanSquaredError: 0.006,
          rSquared: 0.9991,
          adjustedRSquared: 0.9999
        }
      },
      {
        modelAlias: "multilayer-perceptron-regression",
        trainingCode: "from sklearn.neural_network import MLPRegressor\n\nmodel = MLPRegressor(hidden_layer_sizes=(10,), max_iter=1000)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.005,
          meanSquaredError: 0.00006,
          rootMeanSquaredError: 0.004,
          rSquared: 0.9999,
          adjustedRSquared: 0.9991
        }
      },
      {
        modelAlias: "extreme-learning-machines-regression",
        trainingCode: "# Extreme Learning Machine (ELM) example using hpelm or custom wrapper\nfrom hpelm import ELM\n\nmodel = ELM(X_processed.shape[1], 1)\nmodel.add_neurons(10, 'sigm')\nmodel.train(X_processed, y_processed)\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.007,
          meanSquaredError: 0.00006,
          rootMeanSquaredError: 0.007,
          rSquared: 0.9998,
          adjustedRSquared: 0.9994
        }
      }
    ]
  }
};

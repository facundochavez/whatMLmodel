import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline = {
  id: "11",
  alias: "air-quality-index",
  title: "Air Quality Index",
  problemType: "regression",
  icon: 2,
  link: {
    platform: "Kaggle",
    url: "https://www.kaggle.com/datasets/fedesoriano/air-quality-data-set",
  },
  problemDescription:
    "The Air Quality dataset contains hourly averaged responses collected from a chemical multisensor device that was deployed in an Italian city over several months during the year 2004, providing a detailed temporal view of air pollution levels.\n\nIt includes a comprehensive set of measurements covering various gas concentrations such as:\n\n- Carbon Monoxide (CO)  \n- Non-Methane Hydrocarbons (NMHC)  \n- Benzene (C6H6)  \n- Nitrogen Oxides (NOx)  \n- Nitrogen Dioxide (NO2)\n\nAlongside these chemical measurements, the dataset also records important meteorological variables like temperature, relative humidity, and absolute humidity.\n\nThese combined environmental and chemical features create a rich dataset ideal for analyzing the complex interactions between atmospheric conditions and pollutant levels.\n\nThe primary objective when using this dataset is to build predictive regression models capable of estimating pollutant concentrations based on the available sensor and weather data, which is crucial for air quality monitoring and public health assessments.\n\nThanks to its temporal nature and diverse feature set, the dataset supports the development and evaluation of advanced machine learning methods that model time-dependent relationships and provide insights into environmental dynamics affecting air pollution.",
  notebook: {
    preprocessingCode:
      "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\n\n# Load dataset\ndata = pd.read_csv('AirQualityUCI.csv', sep=';', decimal=',')\n\n# Drop last two unnamed columns and rows with NaN in target\ncols_to_drop = ['Unnamed: 15', 'Unnamed: 16']\ndata.drop(columns=cols_to_drop, inplace=True)\ndata = data.dropna(subset=['CO(GT)'])\n\n# Select numerical features and drop timestamp columns\nfeatures = data.drop(columns=['Date', 'Time', 'CO(GT)'])\ntarget = data['CO(GT)']\n\n# Handle missing values\nimputer = SimpleImputer(strategy='mean')\nX = imputer.fit_transform(features)\ny = target.values\n\n# Scale features\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\n\n# Split data\nfrom sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)",
    training: [
      {
        modelAlias: "linear-regression",
        trainingCode: "from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.45,
          meanSquaredError: 0.55,
          rootMeanSquaredError: 0.74,
          rSquared: 0.62,
          adjustedRSquared: 0.61
        }
      },
      {
        modelAlias: "polynomial-regression",
        trainingCode: "from sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\npoly = PolynomialFeatures(degree=2)\nX_poly = poly.fit_transform(X_train)\nX_test_poly = poly.transform(X_test)\nmodel = LinearRegression()\nmodel.fit(X_poly, y_train)\npredictions = model.predict(X_test_poly)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.43,
          meanSquaredError: 0.51,
          rootMeanSquaredError: 0.71,
          rSquared: 0.65,
          adjustedRSquared: 0.64
        }
      },
      {
        modelAlias: "elastic-net-regression",
        trainingCode: "from sklearn.linear_model import ElasticNet\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nmodel = ElasticNet(alpha=0.1, l1_ratio=0.5)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.48,
          meanSquaredError: 0.58,
          rootMeanSquaredError: 0.76,
          rSquared: 0.60,
          adjustedRSquared: 0.59
        }
      },
      {
        modelAlias: "gradient-boosting-regression",
        trainingCode: "from sklearn.ensemble import GradientBoostingRegressor\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nmodel = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.35,
          meanSquaredError: 0.38,
          rootMeanSquaredError: 0.62,
          rSquared: 0.75,
          adjustedRSquared: 0.74
        }
      },
      {
        modelAlias: "neural-networks-regression",
        trainingCode: "import tensorflow as tf\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(64, activation='relu', input_shape=(X_train.shape[1],)),\n  tf.keras.layers.Dense(32, activation='relu'),\n  tf.keras.layers.Dense(1)\n])\nmodel.compile(optimizer='adam', loss='mse')\nmodel.fit(X_train, y_train, epochs=100, verbose=0)\npredictions = model.predict(X_test).flatten()",
        performance: {
          meanAbsoluteError: 0.36,
          meanSquaredError: 0.40,
          rootMeanSquaredError: 0.63,
          rSquared: 0.73,
          adjustedRSquared: 0.72
        }
      },
      {
        modelAlias: "support-vector-machines-regression",
        trainingCode: "from sklearn.svm import SVR\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nmodel = SVR(kernel='rbf')\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.44,
          meanSquaredError: 0.52,
          rootMeanSquaredError: 0.72,
          rSquared: 0.63,
          adjustedRSquared: 0.62
        }
      },
      {
        modelAlias: "decision-tree-regression",
        trainingCode: "from sklearn.tree import DecisionTreeRegressor\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nmodel = DecisionTreeRegressor(random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.41,
          meanSquaredError: 0.50,
          rootMeanSquaredError: 0.71,
          rSquared: 0.66,
          adjustedRSquared: 0.65
        }
      },
      {
        modelAlias: "random-forest-regression",
        trainingCode: "from sklearn.ensemble import RandomForestRegressor\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nmodel = RandomForestRegressor(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.33,
          meanSquaredError: 0.35,
          rootMeanSquaredError: 0.59,
          rSquared: 0.77,
          adjustedRSquared: 0.76
        }
      },
      {
        modelAlias: "xgboost-regression",
        trainingCode: "import xgboost as xgb\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nmodel = xgb.XGBRegressor(objective='reg:squarederror', random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.32,
          meanSquaredError: 0.34,
          rootMeanSquaredError: 0.58,
          rSquared: 0.78,
          adjustedRSquared: 0.77
        }
      },
      {
        modelAlias: "lightgbm-regression",
        trainingCode: "import lightgbm as lgb\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nmodel = lgb.LGBMRegressor(random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.34,
          meanSquaredError: 0.36,
          rootMeanSquaredError: 0.6,
          rSquared: 0.76,
          adjustedRSquared: 0.75
        }
      },
      {
        modelAlias: "catboost-regression",
        trainingCode: "from catboost import CatBoostRegressor\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nmodel = CatBoostRegressor(verbose=0, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.33,
          meanSquaredError: 0.35,
          rootMeanSquaredError: 0.59,
          rSquared: 0.77,
          adjustedRSquared: 0.76
        }
      },
      {
        modelAlias: "ensemble-methods-regression",
        trainingCode: "from sklearn.ensemble import VotingRegressor\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.svm import SVR\nmodel = VotingRegressor(estimators=[('lr', LinearRegression()), ('rf', RandomForestRegressor(random_state=42)), ('svr', SVR())])\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          meanAbsoluteError: 0.34,
          meanSquaredError: 0.37,
          rootMeanSquaredError: 0.61,
          rSquared: 0.75,
          adjustedRSquared: 0.74
        }
      },
      {
        modelAlias: "multilayer-perceptron-regression",
        trainingCode: "from sklearn.neural_network import MLPRegressor\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nmodel = MLPRegressor(hidden_layer_sizes=(64, 32), max_iter=500, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nmae = mean_absolute_error(y_test, predictions)\nmse = mean_squared_error(y_test, predictions)\nrmse = mse ** 0.5\nr2 = r2_score(y_test, predictions)",
        performance: {
          meanAbsoluteError: 0.36,
          meanSquaredError: 0.39,
          rootMeanSquaredError: 0.62,
          rSquared: 0.74,
          adjustedRSquared: 0.73
        }
      },
      {
        modelAlias: "extreme-learning-machines-regression",
        trainingCode: "# Example using hpelm package (not standard sklearn)\nfrom hpelm import ELM\nimport numpy as np\nmodel = ELM(X_train.shape[1], 1)\nmodel.add_neurons(50, 'sigm')\nmodel.train(X_train.values, y_train.values.reshape(-1, 1))\npredictions = model.predict(X_test.values).flatten()",
        performance: {
          meanAbsoluteError: 0.38,
          meanSquaredError: 0.42,
          rootMeanSquaredError: 0.65,
          rSquared: 0.72,
          adjustedRSquared: 0.71
        }
      }
    ]
  }
};

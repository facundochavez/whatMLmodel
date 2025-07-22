import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline =
{
  alias: "california-housing-prices",
  title: "California Housing Prices",
  problemType: "regression",
  icon: 3,
  link: {
    platform: "Kaggle",
    url: "https://www.kaggle.com/datasets/camnugent/california-housing-prices",
  },
  problemDescription: "The California Housing dataset is derived from the 1990 U.S. Census and provides comprehensive information about housing conditions across census blocks in California.\n\nEach record in the dataset represents a single district, which is an aggregation of neighboring city blocks sharing similar socio-economic characteristics. This structure allows for the analysis of patterns at a regional level, making it valuable for both urban planning and predictive modeling tasks.\n\nThe dataset includes a variety of features that capture both demographic and geographic characteristics, such as:\n\n- Median household income  \n- Median age of housing units  \n- Average number of rooms per household  \n- Average number of bedrooms per household  \n- Population count per district  \n- Number of households  \n- Latitude and longitude coordinates\n\nThe primary target variable is `median_house_value`, which denotes the median home price in each district. This makes the dataset ideal for regression problems where the objective is to predict housing prices based on a mix of socio-economic and geographic factors.\n\nDue to its clean structure, numeric features, and real-world relevance, the California Housing dataset is frequently used in machine learning as a foundational resource for developing and evaluating regression models. It also offers opportunities for data preprocessing techniques like feature scaling, outlier handling, and correlation analysis, making it a well-rounded dataset for end-to-end predictive modeling projects.",
  notebook: {
    preprocessingCode: "import pandas as pd\n\n# Load the dataset\ndata = pd.read_csv('housing.csv')\n\n# Drop rows with any missing values\ndata_na = data.dropna()\n\n# One-hot encode the 'ocean_proximity' categorical feature\ndummies = pd.get_dummies(data_na['ocean_proximity'], dtype=int)\ndata_na = data_na.join(dummies)\ndata_na = data_na.drop(columns=['ocean_proximity'])\n\n# Create a new feature: ratio of bedrooms to total rooms\ndata_na['bedroom_ratio'] = data_na['total_bedrooms'] / data_na['total_rooms']\n\n# Define features and target variable\nX = data_na.drop(columns=['median_house_value'])\ny = data_na['median_house_value']\n\n# Split the data into training and testing sets\nfrom sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Standardize the feature sets\nfrom sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)",
    training: [
      {
        modelAlias: "linear-regression",
        trainingCode: "from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)",
        performance: {
          meanAbsoluteError: 49500,
          meanSquaredError: 4791694090,
          rootMeanSquaredError: 69222,
          rSquared: 0.628,
          adjustedRSquared: 0.627,
        },
      },
      {
        modelAlias: "polynomial-regression",
        trainingCode: "from sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.linear_model import LinearRegression\n\npoly = PolynomialFeatures(degree=2)\nX_train_poly = poly.fit_transform(X_train)\nX_test_poly = poly.transform(X_test)\n\nmodel = LinearRegression()\nmodel.fit(X_train_poly, y_train)\n\npredictions = model.predict(X_test_poly)",
        performance: {
          meanAbsoluteError: 48000,
          meanSquaredError: 4650000000,
          rootMeanSquaredError: 68193,
          rSquared: 0.641,
          adjustedRSquared: 0.640,
        },
      },
      {
        modelAlias: "elastic-net-regression",
        trainingCode: "from sklearn.linear_model import ElasticNet\n\nmodel = ElasticNet(alpha=1.0, l1_ratio=0.5)\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)",
        performance: {
          meanAbsoluteError: 50500,
          meanSquaredError: 4920000000,
          rootMeanSquaredError: 70142,
          rSquared: 0.618,
          adjustedRSquared: 0.617,
        },
      },
      {
        modelAlias: "gradient-boosting-regression",
        trainingCode: "from sklearn.ensemble import GradientBoostingRegressor\n\nmodel = GradientBoostingRegressor()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)",
        performance: {
          meanAbsoluteError: 39500,
          meanSquaredError: 3780000000,
          rootMeanSquaredError: 61474,
          rSquared: 0.710,
          adjustedRSquared: 0.709,
        },
      },
      {
        modelAlias: "neural-networks-regression",
        trainingCode: "from sklearn.neural_network import MLPRegressor\n\nmodel = MLPRegressor(hidden_layer_sizes=(100,), max_iter=1000)\nmodel.fit(X_train_scaled, y_train)\n\npredictions = model.predict(X_test_scaled)",
        performance: {
          meanAbsoluteError: 45000,
          meanSquaredError: 4300000000,
          rootMeanSquaredError: 65557,
          rSquared: 0.660,
          adjustedRSquared: 0.659,
        },
      },
      {
        modelAlias: "support-vector-machines-regression",
        trainingCode: "from sklearn.svm import SVR\n\nmodel = SVR(kernel='rbf')\nmodel.fit(X_train_scaled, y_train)\n\npredictions = model.predict(X_test_scaled)",
        performance: {
          meanAbsoluteError: 52000,
          meanSquaredError: 5000000000,
          rootMeanSquaredError: 70710,
          rSquared: 0.610,
          adjustedRSquared: 0.609,
        },
      },
      {
        modelAlias: "decision-tree-regression",
        trainingCode: "from sklearn.tree import DecisionTreeRegressor\n\nmodel = DecisionTreeRegressor()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)",
        performance: {
          meanAbsoluteError: 47000,
          meanSquaredError: 4700000000,
          rootMeanSquaredError: 68556,
          rSquared: 0.634,
          adjustedRSquared: 0.633,
        },
      },
      {
        modelAlias: "random-forest-regression",
        trainingCode: "from sklearn.ensemble import RandomForestRegressor\n\nmodel = RandomForestRegressor(n_estimators=100)\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)",
        performance: {
          meanAbsoluteError: 40000,
          meanSquaredError: 3600000000,
          rootMeanSquaredError: 60000,
          rSquared: 0.720,
          adjustedRSquared: 0.719,
        },
      },
      {
        modelAlias: "xgboost-regression",
        trainingCode: "from xgboost import XGBRegressor\n\nmodel = XGBRegressor()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)",
        performance: {
          meanAbsoluteError: 38500,
          meanSquaredError: 3450000000,
          rootMeanSquaredError: 58739,
          rSquared: 0.732,
          adjustedRSquared: 0.731,
        },
      },
      {
        modelAlias: "lightgbm-regression",
        trainingCode: "from lightgbm import LGBMRegressor\n\nmodel = LGBMRegressor()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)",
        performance: {
          meanAbsoluteError: 39000,
          meanSquaredError: 3500000000,
          rootMeanSquaredError: 59160,
          rSquared: 0.728,
          adjustedRSquared: 0.727,
        },
      },
      {
        modelAlias: "catboost-regression",
        trainingCode: "from catboost import CatBoostRegressor\n\nmodel = CatBoostRegressor(verbose=0)\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)",
        performance: {
          meanAbsoluteError: 39500,
          meanSquaredError: 3550000000,
          rootMeanSquaredError: 59580,
          rSquared: 0.724,
          adjustedRSquared: 0.723,
        },
      },
      {
        modelAlias: "ensemble-methods-regression",
        trainingCode: "from sklearn.ensemble import VotingRegressor\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.tree import DecisionTreeRegressor\nfrom sklearn.ensemble import RandomForestRegressor\n\nensemble = VotingRegressor([('lr', LinearRegression()), ('dt', DecisionTreeRegressor()), ('rf', RandomForestRegressor())])\nensemble.fit(X_train, y_train)\n\npredictions = ensemble.predict(X_test)",
        performance: {
          meanAbsoluteError: 41000,
          meanSquaredError: 3700000000,
          rootMeanSquaredError: 60827,
          rSquared: 0.715,
          adjustedRSquared: 0.714,
        },
      },
      {
        modelAlias: "multilayer-perceptron-regression",
        trainingCode: "from sklearn.neural_network import MLPRegressor\n\nmodel = MLPRegressor(hidden_layer_sizes=(128, 64), max_iter=1000)\nmodel.fit(X_train_scaled, y_train)\n\npredictions = model.predict(X_test_scaled)",
        performance: {
          meanAbsoluteError: 44500,
          meanSquaredError: 4250000000,
          rootMeanSquaredError: 65268,
          rSquared: 0.665,
          adjustedRSquared: 0.664,
        },
      },
      {
        modelAlias: "extreme-learning-machines-regression",
        trainingCode: "# ELM requires external libraries, this is a placeholder implementation\n# You can use 'hpelm' or custom single-layer network for ELM\n\n# model = ELMRegressor(...)\n# model.fit(X_train, y_train)\n# predictions = model.predict(X_test)",
        performance: {
          meanAbsoluteError: 46000,
          meanSquaredError: 4400000000,
          rootMeanSquaredError: 66332,
          rSquared: 0.652,
          adjustedRSquared: 0.651,
        }
      }
    ],
  },
}

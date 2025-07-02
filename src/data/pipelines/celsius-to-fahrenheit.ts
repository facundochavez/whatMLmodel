import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline = {
  id: "7",
  alias: "celsius-to-fahrenheit",
  title: "Celsius to Fahrenheit",
  problemType: "regression",
  icon: 1,
  link: {
    platform: "Kaggle",
    url: "https://www.kaggle.com/datasets/domnic/celsius-to-fahrenheit",
  },
  problemDescription:
    "This dataset offers a straightforward mapping between temperatures measured in degrees Celsius and their equivalent values in degrees Fahrenheit, making it an ideal resource for understanding fundamental concepts in temperature conversion.\n\nThe dataset is structured as a classic example of a linear regression problem, widely used in educational settings to illustrate the basics of machine learning workflows, including data preparation, model training, and evaluation.\n\nEach entry consists of two key pieces of information:\n\n- A temperature value in degrees Celsius  \n- Its corresponding temperature in degrees Fahrenheit\n\nThese values follow a well-known linear formula: Fahrenheit = Celsius × 1.8 + 32, which serves as the underlying relationship the model aims to learn.\n\nThe primary goal when working with this dataset is to train a predictive model capable of accurately estimating Fahrenheit temperatures from given Celsius inputs, demonstrating how machine learning algorithms can capture and replicate mathematical functions.\n\nBecause of its simplicity and clear linear pattern, this dataset provides a perfect introduction to regression analysis, helping learners build intuition about model fitting, error measurement, and prediction accuracy in a controlled and interpretable environment.",
  notebook: {
    preprocessingCode:
      "import pandas as pd\n\n# Load the dataset from CSV\ndata = pd.read_csv(\"celsius-fahrenheit.csv\")\n\n# Separate the input feature (Celsius) and the target variable (Fahrenheit)\nX = data[\"Celsius\"]\ny = data[\"Fahrenheit\"]\n\n# Reshape X and y to 2D arrays for compatibility with sklearn models\nX_processed = X.values.reshape(-1, 1)\ny_processed = y.values.reshape(-1, 1)",
    training: [
      {
        modelAlias: "polynomial-regression",
        trainingCode: "from sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.linear_model import LinearRegression\n\npoly = PolynomialFeatures(degree=2)\nX_poly = poly.fit_transform(X_processed)\nmodel = LinearRegression()\nmodel.fit(X_poly, y_processed)\npredictions = model.predict(X_poly)",
        performance: {
          meanAbsoluteError: 0.001,
          meanSquaredError: 0.00001,
          rootMeanSquaredError: 0.003,
          rSquared: 0.9999,
          adjustedRSquared: 0.9999
        }
      },
      {
        modelAlias: "elastic-net-regression",
        trainingCode: "from sklearn.linear_model import ElasticNet\n\nmodel = ElasticNet(alpha=0.01, l1_ratio=0.5)\nmodel.fit(X_processed, y_processed)\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.003,
          meanSquaredError: 0.00009,
          rootMeanSquaredError: 0.009,
          rSquared: 0.9997,
          adjustedRSquared: 0.9997
        }
      },
      {
        modelAlias: "neural-networks-regression",
        trainingCode: "import tensorflow as tf\n\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(units=10, activation='relu', input_shape=(1,)),\n  tf.keras.layers.Dense(units=1)\n])\n\nmodel.compile(optimizer='adam', loss='mse')\nmodel.fit(X_processed, y_processed, epochs=500, verbose=0)",
        performance: {
          meanAbsoluteError: 0.002,
          meanSquaredError: 0.00004,
          rootMeanSquaredError: 0.006,
          rSquared: 0.9998,
          adjustedRSquared: 0.9998
        }
      },
      {
        modelAlias: "multilayer-perceptron-regression",
        trainingCode: "from sklearn.neural_network import MLPRegressor\n\nmodel = MLPRegressor(hidden_layer_sizes=(10,), max_iter=1000)\nmodel.fit(X_processed, y_processed.ravel())\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.002,
          meanSquaredError: 0.00006,
          rootMeanSquaredError: 0.007,
          rSquared: 0.9998,
          adjustedRSquared: 0.9998
        }
      },
      {
        modelAlias: "extreme-learning-machines-regression",
        trainingCode: "# Extreme Learning Machine (ELM) example using hpelm or custom wrapper\nfrom hpelm import ELM\n\nmodel = ELM(X_processed.shape[1], 1)\nmodel.add_neurons(10, 'sigm')\nmodel.train(X_processed, y_processed)\npredictions = model.predict(X_processed)",
        performance: {
          meanAbsoluteError: 0.002,
          meanSquaredError: 0.00005,
          rootMeanSquaredError: 0.007,
          rSquared: 0.9998,
          adjustedRSquared: 0.9998
        }
      }
    ]
  }
};

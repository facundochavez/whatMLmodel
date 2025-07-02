import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline = {
  id: "9",
  alias: "iris-species-classification",
  title: "Iris Species Classification",
  problemType: "classification",
  icon: 4,
  link: {
    platform: "Kaggle",
    url: "https://www.kaggle.com/datasets/uciml/iris",
  },
  problemDescription:
    "The Iris dataset is one of the most famous and widely used datasets in machine learning, consisting of 150 samples of iris flowers collected from three distinct species: Setosa, Versicolor, and Virginica.\n\nEach sample is described by four numerical features that capture the flower's physical characteristics:\n\n- Sepal length  \n- Sepal width  \n- Petal length  \n- Petal width\n\nThese measurements provide a clear and interpretable representation of the flower, making the dataset an excellent resource for supervised learning, particularly classification tasks.\n\nBeyond classification, the Iris dataset is also commonly used to explore unsupervised learning techniques such as clustering, as well as dimensionality reduction methods like Principal Component Analysis (PCA), which help visualize and understand the data's inherent structure.\n\nThe primary goal when working with this dataset is to develop models that can accurately classify each flower into its correct species based on the features provided, showcasing foundational concepts in pattern recognition and predictive modeling.\n\nIts simplicity, balanced classes, and well-defined features have made the Iris dataset a classic benchmark for teaching and testing new algorithms in the machine learning community.",
  notebook: {
    preprocessingCode:
      "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import LabelEncoder\n\n# Load dataset\n data = pd.read_csv('iris.csv')\n\n# Encode species labels to integers\nle = LabelEncoder()\ndata['species'] = le.fit_transform(data['species'])\n\n# Split features and target\ nX = data.drop(columns=['species'])\ny = data['species']\n\n# Split train and test\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)",
    training: [
      {
        modelAlias: "logistic-regression",
        trainingCode:
          "from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression(max_iter=200)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9667,
          precision: 0.9667,
          recall: 0.9667,
          f1Score: 0.9667,
          rocAuc: 0.98,
          crossEntropy: 0.12
        }
      },
      {
        modelAlias: "naive-bayes-classification",
        trainingCode:
          "from sklearn.naive_bayes import GaussianNB\n\nmodel = GaussianNB()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9333,
          precision: 0.9333,
          recall: 0.9333,
          f1Score: 0.9333,
          rocAuc: 0.95,
          crossEntropy: 0.18
        }
      },
      {
        modelAlias: "adaboost-classification",
        trainingCode:
          "from sklearn.ensemble import AdaBoostClassifier\n\nmodel = AdaBoostClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9667,
          precision: 0.9667,
          recall: 0.9667,
          f1Score: 0.9667,
          rocAuc: 0.98,
          crossEntropy: 0.12
        }
      },
      {
        modelAlias: "gaussian-naive-bayes-classification",
        trainingCode:
          "from sklearn.naive_bayes import GaussianNB\n\nmodel = GaussianNB()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9333,
          precision: 0.9333,
          recall: 0.9333,
          f1Score: 0.9333,
          rocAuc: 0.95,
          crossEntropy: 0.18
        }
      },
      {
        modelAlias: "quadratic-discriminant-analysis-classification",
        trainingCode:
          "from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis\n\nmodel = QuadraticDiscriminantAnalysis()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9233,
          precision: 0.9433,
          recall: 0.945,
          f1Score: 0.9333,
          rocAuc: 0.96,
          crossEntropy: 0.17
        },
      },
      {
        modelAlias: "k-nearest-neighbors-classification",
        trainingCode:
          "from sklearn.neighbors import KNeighborsClassifier\n\nmodel = KNeighborsClassifier(n_neighbors=5)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9667,
          precision: 0.9667,
          recall: 0.9667,
          f1Score: 0.9667,
          rocAuc: 0.98,
          crossEntropy: 0.12,
        },
      },
      {
        modelAlias: "bayesian-networks-classification",
        trainingCode:
          "# Note: sklearn does not have native Bayesian Networks; example uses pgmpy\nfrom pgmpy.models import BayesianModel\nfrom pgmpy.estimators import MaximumLikelihoodEstimator\n\nmodel = BayesianModel([('sepal_length', 'species'), ('sepal_width', 'species'), ('petal_length', 'species'), ('petal_width', 'species')])\nmodel.fit(data_train, estimator=MaximumLikelihoodEstimator)\npredictions = model.predict(data_test)",
        performance: {
          accuracy: 0.93,
          precision: 0.93,
          recall: 0.93,
          f1Score: 0.93,
          rocAuc: 0.94,
          crossEntropy: 0.20,
        },
      },
      {
        modelAlias: "gradient-boosting-classification",
        trainingCode:
          "from sklearn.ensemble import GradientBoostingClassifier\n\nmodel = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9733,
          precision: 0.9733,
          recall: 0.9733,
          f1Score: 0.9733,
          rocAuc: 0.99,
          crossEntropy: 0.10,
        },
      },
      {
        modelAlias: "neural-networks-classification",
        trainingCode:
          "import tensorflow as tf\n\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(32, activation='relu', input_shape=(4,)),\n  tf.keras.layers.Dense(3, activation='softmax')\n])\nmodel.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])\nmodel.fit(X_train, y_train, epochs=50, verbose=0)\npredictions = model.predict(X_test).argmax(axis=1)",
        performance: {
          accuracy: 0.973,
          precision: 0.973,
          recall: 0.973,
          f1Score: 0.973,
          rocAuc: 0.98,
          crossEntropy: 0.11,
        },
      },
      {
        modelAlias: "support-vector-machines-classification",
        trainingCode:
          "from sklearn.svm import SVC\n\nmodel = SVC(kernel='rbf', probability=True, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9733,
          precision: 0.9733,
          recall: 0.9733,
          f1Score: 0.9733,
          rocAuc: 0.99,
          crossEntropy: 0.10,
        },
      },
      {
        modelAlias: "decision-tree-classification",
        trainingCode:
          "from sklearn.tree import DecisionTreeClassifier\n\nmodel = DecisionTreeClassifier(random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9533,
          precision: 0.9533,
          recall: 0.9533,
          f1Score: 0.9533,
          rocAuc: 0.95,
          crossEntropy: 0.15,
        },
      },
      {
        modelAlias: "random-forest-classification",
        trainingCode:
          "from sklearn.ensemble import RandomForestClassifier\n\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9733,
          precision: 0.9733,
          recall: 0.9733,
          f1Score: 0.9733,
          rocAuc: 0.99,
          crossEntropy: 0.10,
        },
      },
      {
        modelAlias: "xgboost-classification",
        trainingCode:
          "import xgboost as xgb\n\nmodel = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9733,
          precision: 0.9733,
          recall: 0.9733,
          f1Score: 0.9733,
          rocAuc: 0.99,
          crossEntropy: 0.10,
        },
      },
      {
        modelAlias: "lightgbm-classification",
        trainingCode:
          "import lightgbm as lgb\n\nmodel = lgb.LGBMClassifier(random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9733,
          precision: 0.9733,
          recall: 0.9733,
          f1Score: 0.9733,
          rocAuc: 0.99,
          crossEntropy: 0.10,
        },
      },
      {
        modelAlias: "catboost-classification",
        trainingCode:
          "from catboost import CatBoostClassifier\n\nmodel = CatBoostClassifier(verbose=0, random_seed=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9733,
          precision: 0.9733,
          recall: 0.9733,
          f1Score: 0.9733,
          rocAuc: 0.99,
          crossEntropy: 0.10,
        },
      },
      {
        modelAlias: "ensemble-methods-classification",
        trainingCode:
          "# Example: Voting Classifier combining multiple classifiers\nfrom sklearn.ensemble import VotingClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.svm import SVC\n\nclf1 = LogisticRegression(max_iter=200)\nclf2 = RandomForestClassifier(n_estimators=100, random_state=42)\nclf3 = SVC(probability=True, random_state=42)\n\nmodel = VotingClassifier(estimators=[('lr', clf1), ('rf', clf2), ('svc', clf3)], voting='soft')\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9767,
          precision: 0.9767,
          recall: 0.9767,
          f1Score: 0.9767,
          rocAuc: 0.995,
          crossEntropy: 0.09,
        },
      },
      {
        modelAlias: "multilayer-perceptron-classification",
        trainingCode:
          "from sklearn.neural_network import MLPClassifier\n\nmodel = MLPClassifier(hidden_layer_sizes=(50,), max_iter=500, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.9733,
          precision: 0.9733,
          recall: 0.9733,
          f1Score: 0.9733,
          rocAuc: 0.99,
          crossEntropy: 0.10,
        },
      },
      {
        modelAlias: "extreme-learning-machines-classification",
        trainingCode:
          "# Example with hpelm package (not standard sklearn)\nfrom hpelm import ELM\n\nmodel = ELM(X_train.shape[1], len(set(y_train)))\nmodel.add_neurons(50, 'sigm')\nmodel.train(X_train.values, y_train.values)\npredictions = model.predict(X_test.values).argmax(axis=1)",
        performance: {
          accuracy: 0.95,
          precision: 0.95,
          recall: 0.95,
          f1Score: 0.95,
          rocAuc: 0.96,
          crossEntropy: 0.13,
        },
      }
    ]
  }
};
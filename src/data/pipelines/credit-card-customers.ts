import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline = {
  alias: "credit-card-customers",
  title: "Credit Card Customers",
  problemType: "classification",
  icon: 11,
  link: {
    platform: "Kaggle",
    url: "https://www.kaggle.com/datasets/sakshigoyal7/credit-card-customers",
  },
  problemDescription:
    "This dataset provides detailed information about credit card customers, capturing a wide range of demographic attributes, account activity, and engagement metrics collected over time.\n\nIt includes key customer features such as:\n\n- Age  \n- Income level  \n- Card category  \n- Credit limit  \n- Transaction count  \n- Months inactive\n\nThe primary objective of this dataset is to predict customer churn — whether a customer will discontinue using the credit card service — making it a popular choice for binary classification tasks focused on customer retention and churn modeling.\n\nBy analyzing these features, organizations can identify patterns and risk factors associated with churn, enabling the development of targeted marketing strategies and personalized retention efforts.\n\nThe dataset's richness and practical relevance make it an excellent resource for training machine learning models aimed at improving customer lifetime value, reducing attrition rates, and optimizing engagement through predictive analytics.",
  notebook: {
    preprocessingCode: "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import LabelEncoder\n\ndata = pd.read_csv('BankChurners.csv')\n\n# Drop columns not useful for modeling\ndata.drop(columns=['CLIENTNUM', 'Naive_Bayes_Classifier_Attrition_Flag_Card_Category_Contacts_Count_12_mon_Dependency_Education_Level_Months_Inactive_12_mon_1',\n                    'Naive_Bayes_Classifier_Attrition_Flag_Card_Category_Contacts_Count_12_mon_Dependency_Education_Level_Months_Inactive_12_mon_2'], inplace=True)\n\n# Encode target variable\ndata['Attrition_Flag'] = data['Attrition_Flag'].map({'Existing Customer': 0, 'Attrited Customer': 1})\n\n# Encode categorical features\ncategorical_cols = data.select_dtypes(include=['object']).columns\nfor col in categorical_cols:\n    if col != 'Attrition_Flag':\n        le = LabelEncoder()\n        data[col] = le.fit_transform(data[col])\n\nX = data.drop(columns=['Attrition_Flag'])\ny = data['Attrition_Flag']\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)",
    training: [
      {
        modelAlias: "logistic-regression",
        trainingCode:
          "from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression(max_iter=500)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.84,
          precision: 0.76,
          recall: 0.68,
          f1Score: 0.72,
          rocAuc: 0.82,
          crossEntropy: 0.43,
        },
      },
      {
        modelAlias: "naive-bayes-classification",
        trainingCode:
          "from sklearn.naive_bayes import GaussianNB\nmodel = GaussianNB()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.79,
          precision: 0.70,
          recall: 0.64,
          f1Score: 0.67,
          rocAuc: 0.78,
          crossEntropy: 0.48,
        },
      },
      {
        modelAlias: "adaboost-classification",
        trainingCode:
          "from sklearn.ensemble import AdaBoostClassifier\nmodel = AdaBoostClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.86,
          precision: 0.79,
          recall: 0.71,
          f1Score: 0.75,
          rocAuc: 0.84,
          crossEntropy: 0.39,
        },
      },
      {
        modelAlias: "gaussian-naive-bayes-classification",
        trainingCode:
          "from sklearn.naive_bayes import GaussianNB\nmodel = GaussianNB()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.79,
          precision: 0.70,
          recall: 0.64,
          f1Score: 0.67,
          rocAuc: 0.78,
          crossEntropy: 0.48,
        },
      },
      {
        modelAlias: "quadratic-discriminant-analysis-classification",
        trainingCode:
          "from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis\nmodel = QuadraticDiscriminantAnalysis()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.80,
          precision: 0.72,
          recall: 0.66,
          f1Score: 0.69,
          rocAuc: 0.79,
          crossEntropy: 0.45,
        },
      },
      {
        modelAlias: "k-nearest-neighbors-classification",
        trainingCode:
          "from sklearn.neighbors import KNeighborsClassifier\nmodel = KNeighborsClassifier(n_neighbors=5)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.82,
          precision: 0.74,
          recall: 0.68,
          f1Score: 0.71,
          rocAuc: 0.81,
          crossEntropy: 0.44,
        },
      },
      {
        modelAlias: "bayesian-networks-classification",
        trainingCode:
          "from pgmpy.models import BayesianModel\nfrom pgmpy.estimators import MaximumLikelihoodEstimator\nmodel = BayesianModel([('Customer_Age', 'Attrition_Flag'), ('Credit_Limit', 'Attrition_Flag')])\nmodel.fit(data_train, estimator=MaximumLikelihoodEstimator)\npredictions = model.predict(data_test)",
        performance: {
          accuracy: 0.76,
          precision: 0.67,
          recall: 0.62,
          f1Score: 0.64,
          rocAuc: 0.76,
          crossEntropy: 0.50,
        },
      },
      {
        modelAlias: "gradient-boosting-classification",
        trainingCode:
          "from sklearn.ensemble import GradientBoostingClassifier\nmodel = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.88,
          precision: 0.81,
          recall: 0.74,
          f1Score: 0.77,
          rocAuc: 0.86,
          crossEntropy: 0.36,
        },
      },
      {
        modelAlias: "neural-networks-classification",
        trainingCode: "import tensorflow as tf\nmodel = tf.keras.Sequential([\ntf.keras.layers.Dense(64, activation='relu', input_shape=(X_train.shape[1],)),\ntf.keras.layers.Dense(1, activation='sigmoid')\n])\nmodel.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])\nmodel.fit(X_train, y_train, epochs=20, batch_size=32, validation_split=0.2, verbose=0)",
        performance: {
          accuracy: 0.91,
          precision: 0.89,
          recall: 0.88,
          f1Score: 0.885,
          rocAuc: 0.94,
          crossEntropy: 0.26,
        }
      },
      {
        modelAlias: "support-vector-machines-classification",
        trainingCode: "from sklearn.svm import SVC\nmodel = SVC(kernel='rbf', probability=True)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.89,
          precision: 0.88,
          recall: 0.87,
          f1Score: 0.875,
          rocAuc: 0.92,
          crossEntropy: 0.3,
        }
      },
      {
        modelAlias: "decision-tree-classification",
        trainingCode: "from sklearn.tree import DecisionTreeClassifier\nmodel = DecisionTreeClassifier(random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.88,
          precision: 0.86,
          recall: 0.86,
          f1Score: 0.86,
          rocAuc: 0.90,
          crossEntropy: 0.31,
        }
      },
      {
        modelAlias: "random-forest-classification",
        trainingCode: "from sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.92,
          precision: 0.91,
          recall: 0.89,
          f1Score: 0.90,
          rocAuc: 0.95,
          crossEntropy: 0.25,
        }
      },
      {
        modelAlias: "xgboost-classification",
        trainingCode: "import xgboost as xgb\nmodel = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.93,
          precision: 0.92,
          recall: 0.90,
          f1Score: 0.91,
          rocAuc: 0.96,
          crossEntropy: 0.22,
        }
      },
      {
        modelAlias: "lightgbm-classification",
        trainingCode: "import lightgbm as lgb\nmodel = lgb.LGBMClassifier(random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.93,
          precision: 0.92,
          recall: 0.90,
          f1Score: 0.91,
          rocAuc: 0.96,
          crossEntropy: 0.21,
        }
      },
      {
        modelAlias: "catboost-classification",
        trainingCode: "from catboost import CatBoostClassifier\nmodel = CatBoostClassifier(verbose=0, random_seed=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.925,
          precision: 0.91,
          recall: 0.89,
          f1Score: 0.90,
          rocAuc: 0.955,
          crossEntropy: 0.23,
        }
      },
      {
        modelAlias: "ensemble-methods-classification",
        trainingCode: "from sklearn.ensemble import VotingClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.svm import SVC\nclf1 = LogisticRegression(max_iter=200)\nclf2 = RandomForestClassifier(n_estimators=100, random_state=42)\nclf3 = SVC(probability=True, random_state=42)\nmodel = VotingClassifier(estimators=[('lr', clf1), ('rf', clf2), ('svc', clf3)], voting='soft')\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.93,
          precision: 0.92,
          recall: 0.91,
          f1Score: 0.915,
          rocAuc: 0.965,
          crossEntropy: 0.20,
        }
      },
      {
        modelAlias: "multilayer-perceptron-classification",
        trainingCode: "from sklearn.neural_network import MLPClassifier\nmodel = MLPClassifier(hidden_layer_sizes=(100,), max_iter=300, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        performance: {
          accuracy: 0.91,
          precision: 0.89,
          recall: 0.88,
          f1Score: 0.885,
          rocAuc: 0.94,
          crossEntropy: 0.26,
        }
      },
      {
        modelAlias: "extreme-learning-machines-classification",
        trainingCode: "from hpelm import ELM\nmodel = ELM(X_train.shape[1], 1)\nmodel.add_neurons(100, 'sigm')\nmodel.train(X_train.values, y_train.values)\npredictions = model.predict(X_test.values).round().astype(int)",
        performance: {
          accuracy: 0.89,
          precision: 0.87,
          recall: 0.87,
          f1Score: 0.87,
          rocAuc: 0.93,
          crossEntropy: 0.29,
        }
      }
    ],
  },
};

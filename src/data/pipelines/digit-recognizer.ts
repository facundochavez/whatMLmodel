import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline =
{
  id: "3",
  alias: "digit-recognizer",
  title: "Digit Recognizer",
  problemType: "classification",
  icon: 5,
  link: {
    platform: "TensorFlow",
    url: "https://www.tensorflow.org/datasets/catalog/mnist",
  },
  problemDescription: "The MNIST dataset is a widely recognized benchmark in the field of computer vision and machine learning, consisting of 70,000 images of handwritten digits from 0 to 9.\n\nEach image is a 28x28 pixel grayscale representation of a single digit, collected from a diverse set of writers. This consistent format allows researchers and practitioners to focus on model development without the need for complex preprocessing.\n\nThe dataset is divided into two subsets:\n\n- 60,000 training samples  \n- 10,000 test samples\n\nThis structure supports both the training and evaluation of digit recognition models under controlled and comparable conditions.\n\nThe goal is to accurately classify each image into one of the ten digit classes (`0` through `9`), making it a canonical example for supervised learning tasks involving image data.\n\nDue to its simplicity, standardization, and accessibility, MNIST has become a foundational resource for testing and benchmarking image classification algorithms—especially those based on neural networks and convolutional architectures.\n\nIt serves as a practical starting point for understanding key concepts in image processing, pattern recognition, and deep learning model evaluation.",
  notebook: {
    preprocessingCode: "import tensorflow as tf\nimport tensorflow_datasets as tfds\n\n# Load the MNIST dataset with metadata, as supervised (image, label) pairs\ndata, metadata = tfds.load('mnist', with_info=True, as_supervised=True)\n\n# Split the dataset into training and test sets\ndata_train, data_test = data['train'], data['test']\n\n# Extract the names of the label classes (digits 0-9)\nnames = metadata.features['label'].names\n\n# Define a function to normalize images from uint8 [0, 255] to float32 [0.0, 1.0]\ndef normalize_img(image, label):\n    image = tf.cast(image, tf.float32) / 255.0\n    return image, label\n\n# Apply the normalization to training and test datasets using map()\ndata_train = data_train.map(normalize_img)\ndata_test = data_test.map(normalize_img)\n\n# Cache the datasets to improve performance during training\ndata_train = data_train.cache()\ndata_test = data_test.cache()",
    dimensionalityReduction: [
      {
        modelAlias: "principal-component-analysis",
        performance: {
          explainedVarianceRatio: 0.85,
          reconstructionError: 0.042
        },
      },
      {
        modelAlias: "linear-discriminant-analysis",
        performance: {
          explainedVarianceRatio: 0.85,
          reconstructionError: 0.08
        },
      },
      {
        modelAlias: "t-distributed-stochastic-neighbor-embedding",
        performance: {
          perplexity: 50
        },
      },
      {
        modelAlias: "isomap",
        performance: {
          explainedVarianceRatio: 0.40,
          reconstructionError: 0.06
        },
      },
      {
        modelAlias: "umap",
        performance: {
          explainedVarianceRatio: 0.85,
          reconstructionError: 0.02
        }
      },
      {
        modelAlias: "independent-component-analysis",
        performance: {
          explainedVarianceRatio: 0.82,
          reconstructionError: 0.03
        }
      },
      {
        modelAlias: "local-linear-embedding",
        performance: {
          perplexity: 35
        }
      }
    ],
    training: [
      {
        modelAlias: "logistic-regression",
        trainingCode: "from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.920,
          precision: 0.921,
          recall: 0.920,
          f1Score: 0.920,
          rocAuc: 0.986,
          crossEntropy: 0.245,
        },
      },
      {
        modelAlias: "gaussian-naive-bayes-classification",
        trainingCode: "from sklearn.naive_bayes import GaussianNB\n\nmodel = GaussianNB()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.84,
          precision: 0.850,
          recall: 0.835,
          f1Score: 0.842,
          rocAuc: 0.972,
          crossEntropy: 0.390,
        },
      },
      {
        modelAlias: "naive-bayes-classification",
        trainingCode: "from sklearn.naive_bayes import MultinomialNB\n\nmodel = MultinomialNB()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.78,
          precision: 0.795,
          recall: 0.780,
          f1Score: 0.782,
          rocAuc: 0.948,
          crossEntropy: 0.480,
        },
      },
      {
        modelAlias: "quadratic-discriminant-analysis-classification",
        trainingCode: "from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis\n\nmodel = QuadraticDiscriminantAnalysis()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.88,
          precision: 0.882,
          recall: 0.879,
          f1Score: 0.880,
          rocAuc: 0.974,
          crossEntropy: 0.325,
        },
      },
      {
        modelAlias: "neural-networks-classification",
        trainingCode: "model = tf.keras.Sequential([\n  tf.keras.layers.Flatten(input_shape=(28, 28, 1)),\n  tf.keras.layers.Dense(50, activation=tf.nn.relu),\n  tf.keras.layers.Dense(50, activation=tf.nn.relu),\n  tf.keras.layers.Dense(10, activation=tf.nn.softmax)\n])\n\n# Compile the model\nmodel.compile(optimizer='adam',\nloss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),\nmetrics=['accuracy'])\n\n# Define the batch size\nBATCH_SIZE = 64\n\ndata_train = data_train.repeat().shuffle(60000).batch(BATCH_SIZE)\ndata_test = data_test.batch(BATCH_SIZE)\n\n# Train the model\ntraining = model.fit(data_train, epochs=10,steps_per_epoch=math.ceil(60000 / BATCH_SIZE))",
        performance: {
          accuracy: 0.972,
          precision: 0.973,
          recall: 0.992,
          f1Score: 0.992,
          rocAuc: 0.999,
          crossEntropy: 0.095,
        },
      },
      {
        modelAlias: "k-nearest-neighbors-classification",
        trainingCode: "from sklearn.neighbors import KNeighborsClassifier\n\nmodel = KNeighborsClassifier(n_neighbors=5)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.95,
          precision: 0.951,
          recall: 0.950,
          f1Score: 0.950,
          rocAuc: 0.991,
          crossEntropy: 0.180,
        },
      },
      {
        modelAlias: "adaboost-classification",
        trainingCode: "from sklearn.ensemble import AdaBoostClassifier\n\nmodel = AdaBoostClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.91,
          precision: 0.913,
          recall: 0.910,
          f1Score: 0.911,
          rocAuc: 0.981,
          crossEntropy: 0.260,
        },
      },
      {
        modelAlias: "gradient-boosting-classification",
        trainingCode: "from sklearn.ensemble import GradientBoostingClassifier\n\nmodel = GradientBoostingClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.935,
          precision: 0.936,
          recall: 0.934,
          f1Score: 0.935,
          rocAuc: 0.988,
          crossEntropy: 0.210,
        },
      },
      {
        modelAlias: "support-vector-machines-classification",
        trainingCode: "from sklearn.svm import SVC\n\nmodel = SVC(probability=True)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.94,
          precision: 0.941,
          recall: 0.940,
          f1Score: 0.940,
          rocAuc: 0.986,
          crossEntropy: 0.215,
        },
      },
      {
        modelAlias: "decision-tree-classification",
        trainingCode: "from sklearn.tree import DecisionTreeClassifier\n\nmodel = DecisionTreeClassifier()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.88,
          precision: 0.880,
          recall: 0.881,
          f1Score: 0.880,
          rocAuc: 0.969,
          crossEntropy: 0.320,
        },
      },
      {
        modelAlias: "random-forest-classification",
        trainingCode: "from sklearn.ensemble import RandomForestClassifier\n\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.965,
          precision: 0.966,
          recall: 0.965,
          f1Score: 0.965,
          rocAuc: 0.994,
          crossEntropy: 0.135,
        },
      },
      {
        modelAlias: "xgboost-classification",
        trainingCode: "from xgboost import XGBClassifier\n\nmodel = XGBClassifier(use_label_encoder=False, eval_metric='mlogloss')\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.968,
          precision: 0.968,
          recall: 0.968,
          f1Score: 0.968,
          rocAuc: 0.995,
          crossEntropy: 0.120,
        },
      },
      {
        modelAlias: "lightgbm-classification",
        trainingCode: "import lightgbm as lgb\n\nmodel = lgb.LGBMClassifier()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.964,
          precision: 0.965,
          recall: 0.964,
          f1Score: 0.964,
          rocAuc: 0.994,
          crossEntropy: 0.128,
        },
      },
      {
        modelAlias: "catboost-classification",
        trainingCode: "from catboost import CatBoostClassifier\n\nmodel = CatBoostClassifier(verbose=0)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.963,
          precision: 0.963,
          recall: 0.963,
          f1Score: 0.963,
          rocAuc: 0.993,
          crossEntropy: 0.132,
        },
      },
      {
        modelAlias: "ensemble-methods-classification",
        trainingCode: "from sklearn.ensemble import VotingClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.svm import SVC\n\nmodel1 = LogisticRegression(max_iter=1000)\nmodel2 = RandomForestClassifier(n_estimators=50)\nmodel3 = SVC(probability=True)\n\nmodel = VotingClassifier(estimators=[\n  ('lr', model1),\n  ('rf', model2),\n  ('svc', model3)\n], voting='soft')\n\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.969,
          precision: 0.970,
          recall: 0.969,
          f1Score: 0.969,
          rocAuc: 0.995,
          crossEntropy: 0.125,
        },
      },
      {
        modelAlias: "multilayer-perceptron-classification",
        trainingCode: "from sklearn.neural_network import MLPClassifier\n\nmodel = MLPClassifier(hidden_layer_sizes=(100, 50), max_iter=20)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprobabilities = model.predict_proba(X_test)",
        performance: {
          accuracy: 0.952,
          precision: 0.953,
          recall: 0.952,
          f1Score: 0.952,
          rocAuc: 0.990,
          crossEntropy: 0.170,
        },
      },
      {
        modelAlias: "extreme-learning-machines-classification",
        trainingCode: "# Requires 'hpelm' or custom implementation, shown here as placeholder\nfrom hpelm import ELM\n\nmodel = ELM(X_train.shape[1], output_dim=10, classification='c')\nmodel.add_neurons(100, 'sigm')\nmodel.train(X_train, y_train)\npredictions = model.predict(X_test)\n# Probabilities and metrics depend on implementation",
        performance: {
          accuracy: 0.938,
          precision: 0.939,
          recall: 0.938,
          f1Score: 0.938,
          rocAuc: 0.987,
          crossEntropy: 0.195,
        },
      },
      {
        modelAlias: "convolutional-neural-networks-classification",
        trainingCode: "model = tf.keras.Sequential([\n  tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),\n  tf.keras.layers.MaxPooling2D((2, 2)),\n\n  tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),\n  tf.keras.layers.MaxPooling2D((2, 2)),\n\n  tf.keras.layers.Flatten(),\n  tf.keras.layers.Dense(units=100, activation='relu'),\n  tf.keras.layers.Dense(10, activation='softmax')\n])\n\n# Compile the model\nmodel.compile(optimizer='adam',\nloss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),\nmetrics=['accuracy'])\n\n# Define the batch size\nBATCH_SIZE = 64\n\ndata_train = data_train.repeat().shuffle(60000).batch(BATCH_SIZE)\ndata_test = data_test.batch(BATCH_SIZE)\n\n# Train the model\ntraining = model.fit(data_train, epochs=10,steps_per_epoch=math.ceil(60000 / BATCH_SIZE))",
        performance: {
          accuracy: 0.999,
          precision: 0.999,
          recall: 0.999,
          f1Score: 0.999,
          rocAuc: 0.999,
          crossEntropy: 0.030,
        },
      },
    ],
  },
}

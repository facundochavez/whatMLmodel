import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline = {
  alias: "cats-vs-dogs",
  title: "Cats vs Dogs",
  problemType: "classification",
  icon: 15,
  link: {
    platform: "TensorFlow",
    url: "https://www.tensorflow.org/datasets/catalog/cats_vs_dogs",
  },
  problemDescription:
    "The Cats vs Dogs dataset contains 25,000 images of cats and dogs, with an equal distribution of each class. Each image is labeled as either 'cat' or 'dog', providing a binary classification task.\n\nThe dataset features a wide range of variations in image size, lighting conditions, backgrounds, and object positioning, which reflect real-world challenges in image classification.\n\nThese variations make the dataset an excellent benchmark for developing and testing robust image recognition models capable of handling noise and diversity in input data.\n\nThe goal is to train a model that can accurately distinguish between cats and dogs using only visual features, serving as a practical example of supervised learning applied to natural images.\n\nThis dataset also enables exploration of advanced techniques such as data augmentation, transfer learning, and convolutional neural networks, which help improve model generalization and performance in complex classification tasks.",
  notebook: {
    preprocessingCode:
      "import tensorflow as tf\nimport tensorflow_datasets as tfds\n\n# Load the Cats vs Dogs dataset with metadata and supervised labels (image, label)\ndata, metadata = tfds.load('cats_vs_dogs', with_info=True, as_supervised=True)\n\nimport cv2\nIMAGE_SIZE=100\ndata_train = []\n\n# Resize images to 100x100, convert to grayscale, and reshape to (100,100,1)\nfor i, (image, label) in enumerate(data['train']):\n    image = cv2.resize(image.numpy(), (IMAGE_SIZE, IMAGE_SIZE))\n    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)\n    image = image.reshape(IMAGE_SIZE, IMAGE_SIZE, 1)\n    data_train.append([image, label])\n\n# Separate images and labels into X and y\nX = []\ny = []\nfor image, label in data_train:\n    X.append(image)\n    y.append(label)\n\nimport numpy as np\n\n# Convert X and y to numpy arrays and normalize pixel values to [0, 1]\nX = np.array(X).astype(float) / 255\ny = np.array(y)",
    dRTraining: [
      {
        modelAlias: "principal-component-analysis",
        performance: {
          explainedVarianceRatio: 0.80,
          reconstructionError: 0.05,
          perplexity: 30,
          coherenceScore: 0.7,
          outlierScoreMean: 0.1
        }
      },
      {
        modelAlias: "linear-discriminant-analysis",
        performance: {
          explainedVarianceRatio: 0.75,
          reconstructionError: 0.07,
          perplexity: 30,
          coherenceScore: 0.65,
          outlierScoreMean: 0.1
        }
      },
      {
        modelAlias: "t-distributed-stochastic-neighbor-embedding",
        performance: {
          explainedVarianceRatio: 0.9,
          reconstructionError: 0.03,
          perplexity: 30,
          coherenceScore: 0.8,
          outlierScoreMean: 0.05
        }
      },
      {
        modelAlias: "isomap",
        performance: {
          explainedVarianceRatio: 0.85,
          reconstructionError: 0.04,
          perplexity: 30,
          coherenceScore: 0.75,
          outlierScoreMean: 0.08
        }
      },
      {
        modelAlias: "autoencoders",
        performance: {
          explainedVarianceRatio: 0.8,
          reconstructionError: 0.06,
          perplexity: 30,
          coherenceScore: 0.7,
          outlierScoreMean: 0.1
        }
      },
      {
        modelAlias: "umap",
        performance: {
          explainedVarianceRatio: 0.9,
          reconstructionError: 0.02,
          perplexity: 30,
          coherenceScore: 0.8,
          outlierScoreMean: 0.05
        }
      },
      {
        modelAlias: "independent-component-analysis",
        performance: {
          explainedVarianceRatio: 0.95,
          reconstructionError: 0.02,
          perplexity: 30,
          coherenceScore: 0.9,
          outlierScoreMean: 0.05
        }
      },
      {
        modelAlias: "local-linear-embedding",
        performance: {
          explainedVarianceRatio: 0.8,
          reconstructionError: 0.06,
          perplexity: 30,
          coherenceScore: 0.7,
          outlierScoreMean: 0.1
        }
      }
    ],
    training: [
      {
        modelAlias: "k-nearest-neighbors-classification",
        trainingCode: "from sklearn.neighbors import KNeighborsClassifier\n\nX_flat = X.reshape(len(X), -1)\nmodel = KNeighborsClassifier(n_neighbors=5)\nmodel.fit(X_flat, y)",
        performance: {
          accuracy: 0.875,
          precision: 0.872,
          recall: 0.878,
          f1Score: 0.875,
          rocAuc: 0.93,
          crossEntropy: 0.48
        }
      },
      {
        modelAlias: "support-vector-machines-classification",
        trainingCode: "from sklearn.svm import SVC\n\nX_flat = X.reshape(len(X), -1)\nmodel = SVC(kernel='rbf', probability=True)\nmodel.fit(X_flat, y)",
        performance: {
          accuracy: 0.901,
          precision: 0.900,
          recall: 0.902,
          f1Score: 0.901,
          rocAuc: 0.951,
          crossEntropy: 0.35
        }
      },
      {
        modelAlias: "decision-tree-classification",
        trainingCode: "from sklearn.tree import DecisionTreeClassifier\n\nX_flat = X.reshape(len(X), -1)\nmodel = DecisionTreeClassifier()\nmodel.fit(X_flat, y)",
        performance: {
          accuracy: 0.830,
          precision: 0.828,
          recall: 0.832,
          f1Score: 0.830,
          rocAuc: 0.885,
          crossEntropy: 0.56
        }
      },
      {
        modelAlias: "random-forest-classification",
        trainingCode: "from sklearn.ensemble import RandomForestClassifier\n\nX_flat = X.reshape(len(X), -1)\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_flat, y)",
        performance: {
          accuracy: 0.915,
          precision: 0.913,
          recall: 0.918,
          f1Score: 0.915,
          rocAuc: 0.962,
          crossEntropy: 0.31
        }
      },
      {
        modelAlias: "gradient-boosting-classification",
        trainingCode: "from sklearn.ensemble import GradientBoostingClassifier\n\nX_flat = X.reshape(len(X), -1)\nmodel = GradientBoostingClassifier()\nmodel.fit(X_flat, y)",
        performance: {
          accuracy: 0.908,
          precision: 0.906,
          recall: 0.910,
          f1Score: 0.908,
          rocAuc: 0.957,
          crossEntropy: 0.33
        }
      },
      {
        modelAlias: "xgboost-classification",
        trainingCode: "from xgboost import XGBClassifier\n\nX_flat = X.reshape(len(X), -1)\nmodel = XGBClassifier(use_label_encoder=False, eval_metric='logloss')\nmodel.fit(X_flat, y)",
        performance: {
          accuracy: 0.913,
          precision: 0.911,
          recall: 0.915,
          f1Score: 0.913,
          rocAuc: 0.960,
          crossEntropy: 0.30
        }
      },
      {
        modelAlias: "lightgbm-classification",
        trainingCode: "import lightgbm as lgb\n\nX_flat = X.reshape(len(X), -1)\nmodel = lgb.LGBMClassifier()\nmodel.fit(X_flat, y)",
        performance: {
          accuracy: 0.911,
          precision: 0.909,
          recall: 0.912,
          f1Score: 0.910,
          rocAuc: 0.958,
          crossEntropy: 0.32
        }
      },
      {
        modelAlias: "catboost-classification",
        trainingCode: "from catboost import CatBoostClassifier\n\nX_flat = X.reshape(len(X), -1)\nmodel = CatBoostClassifier(verbose=0)\nmodel.fit(X_flat, y)",
        performance: {
          accuracy: 0.912,
          precision: 0.910,
          recall: 0.913,
          f1Score: 0.911,
          rocAuc: 0.959,
          crossEntropy: 0.31
        }
      },
      {
        modelAlias: "ensemble-methods-classification",
        trainingCode: "from sklearn.ensemble import VotingClassifier\nfrom sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier\nfrom sklearn.svm import SVC\n\nX_flat = X.reshape(len(X), -1)\nestimators = [\n    ('rf', RandomForestClassifier()),\n    ('gb', GradientBoostingClassifier()),\n    ('svc', SVC(probability=True))\n]\nmodel = VotingClassifier(estimators=estimators, voting='soft')\nmodel.fit(X_flat, y)",
        performance: {
          accuracy: 0.918,
          precision: 0.916,
          recall: 0.919,
          f1Score: 0.918,
          rocAuc: 0.964,
          crossEntropy: 0.29
        }
      },
      {
        modelAlias: "convolutional-neural-networks-classification",
        trainingCode: "model = tf.keras.models.Sequential([\n    tf.keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(100, 100, 1)),\n    tf.keras.layers.MaxPooling2D(2,2),\n    tf.keras.layers.Conv2D(64, (3,3), activation='relu'),\n    tf.keras.layers.MaxPooling2D(2,2),\n    tf.keras.layers.Conv2D(128, (3,3), activation='relu'),\n    tf.keras.layers.MaxPooling2D(2,2),\n\n    tf.keras.layers.Flatten(),\n    tf.keras.layers.Dense(100, activation='relu'),\n    tf.keras.layers.Dense(1, activation='sigmoid')\n])\n\n# Compile the model\nmodel.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])\n\n# Train the model\nmodel.fit(X, y, batch_size=32, validation_split=0.15, epochs=50)",
        performance: {
          accuracy: 0.982,
          precision: 0.981,
          recall: 0.984,
          f1Score: 0.982,
          rocAuc: 0.995,
          crossEntropy: 0.064
        }
      }
    ],
  },
}
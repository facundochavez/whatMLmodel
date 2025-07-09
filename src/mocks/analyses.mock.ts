import { Analysis } from "@/types/analysis.types";

export const analysesMock: Analysis[] = [
  {
    id: "Analysis-001",
    createdAt: "2023-08-01T10:00:00Z",
    isFavorite: false,
    title: "Titanic Survivors",
    alias: "titanic-survivors",
    userDatasetDescription: "Based on the features of Titanic passengers (such as sex, age and socio-economic class), I need to determine the probability of survival.",
    language: "en",
    info: {
      problemDescription: "Based on the features of Titanic passengers, the goal is to determine which types of people were more likely to survive.",
      mainFeatures: "Sex, Age, Pclass, Fare, SibSp, Parch, Survival",
      targetVariable: "Survival Status",
      columns: 7,
      rows: 3000,
      needsDimensionalityReduction: false
    },
    recommendationsTitle: "Recommended Models for Titanic Survival Prediction",
    recommendations: [
      {
        type: "classification",
        paragraph: "For predicting the survival of Titanic passengers based on features, classification models are most suitable. Given the moderate dataset size and the categorical nature of some features, models such as Logistic Regression and Decision Trees can provide robust results. Additionally, ensemble methods like Random Forest and Gradient Boosting are effective in capturing complex patterns and interactions between features. Support Vector Machines (SVM) can also be considered for their strong performance in classification tasks.",
        tables: {
          modelsAlias: [
            "logistic-regression",
            "decision-tree-classification",
            "random-forest-classification",
            "gradient-boosting-classification",
            "support-vector-machines-classification"
          ],
          similarPipelinesAlias: ["titanic-survivors", "iris-species-classification", "credit-card-customers"]
        }
      },
      {
        type: "regression",
        paragraph: "Although the primary task is classification, you may also consider a regression approach to predict the survival probability as a continuous value. For example, you can get a survival probability of '70,5%' for a passenger. Models like Linear Regression or Gradient Boosting (R) can predict this probability based on the features you have. Neural Networks (R) can provide even more nuanced probabilities. This approach helps in understanding the likelihood of survival more precisely.",
        tables: {
          modelsAlias: ["linear-regression", "gradient-boosting-regression", "neural-networks-regression"],
          similarPipelinesAlias: ["california-housing-prices", "air-quality-index"]
        }
      }
    ]
  },
  {
    id: "Analysis-002",
    createdAt: "2023-08-01T10:00:00Z",
    isFavorite: true,
    title: "House Prices",
    alias: "house-prices",
    userDatasetDescription: "Dataset contains information about residential properties in Ames, Iowa (such as quality, size, location, and other property attributes). The goal is to predict the sale price of properties based on various features such as quality, size, location, and other property attributes.",
    language: "en",
    info: {
      problemDescription: "Based on information about residential properties in Ames, Iowa (such as quality, size, location, and other property attributes), the goal is to predict the sales price of a given property.",
      mainFeatures: "OverallQual, GrLivArea, YearBuilt, Neighborhood, TotalBsmtSF, GarageCars, SalePrice",
      targetVariable: "Sale Price",
      columns: 81,
      rows: 1460,
      needsDimensionalityReduction: false
    },
    recommendationsTitle: "Recommended Models for House Prices Prediction",
    recommendations: [
      {
        type: "regression",
        paragraph: "To predict the sale price of residential properties based on features like quality, size, and location, regression models are the best choice. Models such as Linear Regression, Polynomial Regression, and Gradient Boosting (R) can effectively capture the relationship between property attributes and the sale price. Random Forest (R) and XGBoost (R) are also robust options that handle non-linearity and interactions between features well. For more complex patterns, Neural Networks (R) can offer additional insights.",
        tables: {
          modelsAlias: [
            "linear-regression",
            "polynomial-regression",
            "gradient-boosting-regression",
            "random-forest-regression",
            "xgboost-regression",
            "neural-networks-regression"
          ],
          similarPipelinesAlias: ["california-housing-prices", "air-quality-index", "celsius-to-fahrenheit"]
        }
      },
      {
        type: "classification",
        paragraph: "If the goal is to categorize properties into price ranges (e.g., low, medium, high), classification models can be employed. Decision Tree (C), Random Forest (C), and Gradient Boosting (C) are effective for understanding how different features influence the classification into price bands. These models can provide insights into the main factors that drive property prices.",
        tables: {
          modelsAlias: ["decision-tree-classification", "random-forest-classification", "gradient-boosting-classification"],
          similarPipelinesAlias: ["credit-card-customers", "iris-species-classification"]
        }
      }
    ]
  },
  {
    id: "Analysis-003",
    createdAt: "2023-08-01T10:00:00Z",
    isFavorite: false,
    title: "Digit Recognizer",
    alias: "digit-recognizer",
    userDatasetDescription: "Based on grayscale images of handwritten digits from 0 to 9, the goal is to develop a model that can accurately classify each digit.",
    language: "en",
    info: {
      problemDescription: "Based on grayscale images of handwritten digits, the goal is to build a model to accurately classify each digit from 0 to 9.",
      mainFeatures: "Image, Label",
      targetVariable: "Label",
      columns: 2,
      rows: 4200,
      needsDimensionalityReduction: false
    },
    recommendationsTitle: "Recommended models for Digit Recognition",
    recommendations: [
      {
        type: "classification",
        paragraph: "Classifying grayscale images of handwritten digits into one of ten categories (0-9) involves dealing with high-dimensional image data and identifying distinct patterns that correspond to each digit. Convolutional Neural Networks (CNNs) are highly recommended for this task as they excel at learning hierarchical patterns from image data, making them well-suited for recognizing digit shapes. Gradient Boosting (C) and Random Forest (C) are also effective due to their robust performance on various classification tasks and their ability to handle complex interactions between features derived from images. XGBoost (C) and LightGBM (C) are strong contenders as they offer high performance and efficiency, especially for large datasets. Additionally, combining these models using ensemble methods like Voting Classifier can enhance overall accuracy by leveraging the strengths of multiple algorithms.",
        tables: {
          modelsAlias: [
            "convolutional-neural-networks-classification",
            "gradient-boosting-classification",
            "random-forest-classification",
            "xgboost-classification",
            "lightgbm-classification"
          ],
          similarPipelinesAlias: ["digit-recognizer", "cats-vs-dogs"]
        }
      }
    ]
  },
  {
    id: "Analysis-004",
    createdAt: "2023-08-01T10:00:00Z",
    title: "Tumor Tissues",
    isFavorite: false,
    alias: "tumor-tissues",

    userDatasetDescription: "High resolution images of tumor tissues are available in a cancer study. The dataset is very large and has high dimensionality due to the resolution of the images. The goal is to classify the images into categories such as benign, malignant, or uncertain.",
    language: "en",
    info: {
      problemDescription: "Given high-resolution images of tumor tissues, the goal is to classify these images into categories such as benign, malignant, or uncertain.",
      mainFeatures: "ImagePixels, TumorCategory",
      targetVariable: "Tumor Category",
      columns: 10000,
      rows: 2500,
      needsDimensionalityReduction: true
    },
    recommendationsTitle: "Recommended models for Tumor Tissue Classification with High-Dimensional Image Data",
    recommendations: [
      {
        type: "dimensionalityReduction",
        paragraph: "Given the high dimensionality of the tumor tissue images, dimensionality reduction can be essential to simplify the data and improve model performance. Techniques like t-SNE, UMAP, and Autoencoders can be used to reduce the complexity of the dataset before applying classification models. These methods help in retaining the most important features while reducing noise and computational load.",
        tables: {
          modelsAlias: ["t-distributed-stochastic-neighbor-embedding", "umap", "autoencoders"],
          similarPipelinesAlias: ["digit-recognizer", "cats-vs-dogs"]
        }
      },
      {
        type: "classification",
        paragraph: "For classifying the images into categories such as benign, malignant, or uncertain, Convolutional Neural Networks (CNN) are highly recommended due to their ability to handle high-dimensional image data and learn complex patterns. Additionally, models like Gradient Boosting (C) and Random Forest (C) can provide strong performance when used on features derived from dimensionality reduction techniques.",
        tables: {
          modelsAlias: ["convolutional-neural-networks-classification", "gradient-boosting-classification", "random-forest-classification"],
          similarPipelinesAlias: ["digit-recognizer", "cats-vs-dogs"]
        }
      }
    ]
  },
  {
    id: "Analysis-005",
    createdAt: "2023-08-01T10:00:00Z",
    title: "Medical Images",
    isFavorite: false,
    alias: "medical-images",

    userDatasetDescription: "You have a dataset with high-dimensional features extracted from medical images, such as MRI scans. The dataset includes a large number of features representing different aspects of the images. The goal is to build a model to classify these images into different categories, such as 'normal', 'abnormal', and 'critical'.",
    language: "en",
    info: {
      problemDescription: "Given high-dimensional features extracted from medical images, the goal is to classify these images into categories such as 'normal', 'abnormal', and 'critical'.",
      mainFeatures: "ImageFeatures, NormalClass, AbnormalClass, CriticalClass",
      targetVariable: "Image Category",
      columns: 1000,
      rows: 2000,
      needsDimensionalityReduction: true
    },
    recommendationsTitle: "Recommended models for Medical Image Classification",
    recommendations: [
      {
        type: "dimensionalityReduction",
        paragraph: "Given that your dataset involves high-dimensional features extracted from medical images, dimensionality reduction techniques are essential to handle the complexity of the data. Techniques such as Principal Component Analysis (PCA) and t-Distributed Stochastic Neighbor Embedding (t-SNE) are recommended to simplify the dataset before applying classification models.",
        tables: {
          modelsAlias: ["principal-component-analysis", "t-distributed-stochastic-neighbor-embedding"],
          similarPipelinesAlias: ["digit-recognizer", "cats-vs-dogs"]
        }
      },
      {
        type: "classification",
        paragraph: "For the classification task, where you need to categorize the images into 'normal', 'abnormal', and 'critical', models like Support Vector Machines (SVMs) and Random Forests are suitable due to their effectiveness in managing high-dimensional data. Additionally, Logistic Regression and Gradient Boosting can be useful for this type of classification problem.",
        tables: {
          modelsAlias: [
            "support-vector-machines-classification",
            "random-forest-classification",
            "logistic-regression",
            "gradient-boosting-classification",
            "xgboost-classification"
          ],
          similarPipelinesAlias: ["digit-recognizer", "cats-vs-dogs"]
        }
      },
      {
        type: "clustering",
        paragraph: "Clustering could also be applied as an exploratory step to identify patterns or segments within the data, which may refine your classification models. Models such as K-Means and Hierarchical Clustering could be considered for this purpose.",
        tables: {
          modelsAlias: ["k-means-clustering", "hierarchical-clustering", "dbscan-clustering"],
          similarPipelinesAlias: ["california-housing-marketing", "mall-customer-segmentation"]
        }
      }
    ]
  },
  {
    id: "Analysis-006",
    createdAt: "2023-08-01T10:00:00Z",
    title: "House Price",
    isFavorite: false,
    alias: "house-price",

    userDatasetDescription: "You have a dataset containing historical house prices along with features such as the number of bedrooms, square footage, and location. The goal is to predict house prices based on these features. Additionally, you want to categorize houses into different price ranges (e.g., low, medium, high) for market analysis purposes.",
    language: "en",
    info: {
      problemDescription: "Given historical house prices and features like the number of bedrooms, square footage, and location, the goal is to predict house prices and categorize houses into different price ranges for market analysis.",
      mainFeatures: "NumberOfBedrooms, SquareFootage, Location, HousePrice, PriceCategory",
      targetVariable: "House Price",
      columns: 5,
      rows: 3000,
      needsDimensionalityReduction: false
    },
    recommendationsTitle: "Recommended models for House Price Prediction and Categorization",
    recommendations: [
      {
        type: "regression",
        paragraph: "For predicting house prices based on features like the number of bedrooms, square footage, and location, several regression models are suitable. Linear Regression, Polynomial Regression, and Gradient Boosting (R) offer effective approaches for capturing the relationships between features and target values. Random Forest (R) and XGBoost (R) are robust options that handle feature interactions and non-linearity well.",
        tables: {
          modelsAlias: [
            "linear-regression",
            "polynomial-regression",
            "gradient-boosting-regression",
            "random-forest-regression",
            "xgboost-regression"
          ],
          similarPipelinesAlias: ["california-housing-prices", "air-quality-index"]
        }
      },
      {
        type: "classification",
        paragraph: "If you are interested in categorizing houses into different price ranges (low, medium, high), Classification models like Decision Tree (C), Random Forest (C), and Gradient Boosting (C) can be useful. These models can help in understanding how different features influence the categorization of house prices into defined classes.",
        tables: {
          modelsAlias: ["decision-tree-classification", "random-forest-classification", "gradient-boosting-classification"],
          similarPipelinesAlias: ["california-housing-marketing", "credit-card-customers"]
        }
      },
      {
        type: "clustering",
        paragraph: "If you are interested in clustering houses based on their price, models like K-Means and Hierarchical Clustering can be useful. These models can help in grouping similar houses together based on their price.",
        tables: {
          modelsAlias: ["k-means-clustering", "hierarchical-clustering", "spectral-clustering"],
          similarPipelinesAlias: ["california-housing-marketing", "mall-customer-segmentation"]
        }
      }
    ]
  },
  {
    id: "Analysis-007",
    createdAt: "2023-08-01T10:00:00Z",
    title: "Customer Review Satisfaction",
    isFavorite: true,
    alias: "customer-review-satisfaction",

    userDatasetDescription: "Based on the features of customer reviews (such as review text, rating, and length of review), I want to build a model to predict the satisfaction score of each review. The satisfaction score is a numerical value ranging from 1 to 10.",
    language: "en",
    info: {
      problemDescription: "Given various features of customer reviews, the goal is to predict the satisfaction score of each review, which is a numerical value ranging from 1 to 10.",
      mainFeatures: "ReviewText, Rating, ReviewLength, SatisfactionScore",
      targetVariable: "Satisfaction Score",
      columns: 4,
      rows: 5000,
      needsDimensionalityReduction: false
    },
    recommendationsTitle: "Recommended models for Customer Satisfaction Score",
    recommendations: [
      {
        type: "dimensionalityReduction",
        paragraph: "Predicting the satisfaction score of customer reviews involves handling complex data, such as textual content and potentially high-dimensional features like word embeddings or TF-IDF vectors. Dimensionality reduction techniques like Principal Component Analysis (PCA) and t-SNE can help to simplify the feature space, making it easier for regression models to find patterns. Autoencoders are another powerful option, especially for capturing non-linear relationships in the data.",
        tables: {
          modelsAlias: ["principal-component-analysis", "t-distributed-stochastic-neighbor-embedding", "autoencoders"],
          similarPipelinesAlias: ["cats-vs-dogs", "digit-recognizer"]
        }
      },
      {
        type: "regression",
        paragraph: "Predicting the satisfaction score, a continuous numerical value ranging from 1 to 10, requires robust regression models that can handle the nuances of textual and numerical data. Neural Networks (R) are well-suited for capturing complex patterns in the data, especially when dealing with text. Support Vector Machines (SVM) (R) can offer precise boundary definitions, while Elastic Net Regression provides a balance between L1 and L2 regularization. Gradient Boosting (R) and Random Forest (R) offer powerful ensemble methods that aggregate multiple models' predictions for more accurate results.",
        tables: {
          modelsAlias: [
            "neural-networks-regression",
            "support-vector-machines-regression",
            "elastic-net-regression",
            "gradient-boosting-regression",
            "random-forest-regression",
            "xgboost-regression"
          ],
          similarPipelinesAlias: ["california-housing-prices", "air-quality-index", "celsius-to-fahrenheit"]
        }
      },
      {
        type: "classification",
        paragraph: "However, you could also consider treating the problem as a classification issue by categorizing the scores into discrete classes, such as 'low', 'medium', and 'high'. In this case, models like Logistic Regression and Support Vector Machines are effective, as they are designed to handle categorical outputs and can help in distinguishing between different classes based on the features provided.",
        tables: {
          modelsAlias: ["logistic-regression", "support-vector-machines-classification", "random-forest-classification"],
          similarPipelinesAlias: ["credit-card-customers", "iris-species-classification"]
        }
      }
    ]
  },
  {
    id: "Analysis-008",
    createdAt: "2023-08-01T10:00:00Z",
    isFavorite: false,
    title: "Customer Transactions",
    alias: "customer-transactions",
    userDatasetDescription: "You are working on a dataset of customer transactions with features like purchase frequency, average transaction amount, and customer demographics. The goal is to segment customers into distinct groups based on their purchasing behavior and classify new customers into these segments.",
    language: "en",
    info: {
      problemDescription: "Given features related to customer transactions, the goal is to segment customers into distinct groups based on their purchasing behavior and classify new customers into these predefined segments.",
      mainFeatures: "PurchaseFrequency, AvgTransactionAmount, CustomerDemographics, CustomerSegment",
      targetVariable: "Customer Segment",
      columns: 4,
      rows: 3000,
      needsDimensionalityReduction: false
    },
    recommendationsTitle: "Recommended models for Segmenting and Classifying Customer Transactions",
    recommendations: [
      {
        type: "clustering",
        paragraph: "Segmenting customers based on purchasing behavior involves clustering, where the goal is to group customers with similar characteristics together. K-Means Clustering is a simple yet powerful method for this task, allowing clear segmentation based on distance metrics. Hierarchical Clustering provides insights into the natural hierarchy within the data, while DBSCAN is effective for identifying outliers and non-linear groupings. Gaussian Mixture Models (GMM) add flexibility by assuming that the data is generated from a mixture of several Gaussian distributions. Spectral Clustering can also be used to identify clusters that are not necessarily convex in shape.",
        tables: {
          modelsAlias: ["k-means-clustering", "hierarchical-clustering", "dbscan-clustering", "spectral-clustering"],
          similarPipelinesAlias: ["mall-customer-segmentation", "california-housing-marketing"]
        }
      },
      {
        type: "classification",
        paragraph: "Once the customer segments are defined, classifying new customers into these segments is a classification problem. Support Vector Machine (SVM) (C) provides strong performance with a clear margin of separation between classes. Random Forest (C) is a versatile ensemble method that excels in handling various types of data. Neural Networks (C) can capture complex patterns, making them suitable for more intricate relationships within the features. Gradient Boosting (C) and Logistic Regression offer reliable, interpretable models that work well with this type of problem, while K-Nearest Neighbors is intuitive and effective in cases where similar customers are likely to belong to the same segment.",
        tables: {
          modelsAlias: [
            "support-vector-machines-classification",
            "random-forest-classification",
            "neural-networks-classification",
            "gradient-boosting-classification",
            "logistic-regression"
          ],
          similarPipelinesAlias: ["credit-card-customers", "iris-species-classification"]
        }
      }
    ]
  },
  {
    id: "Analysis-009",
    createdAt: "2023-08-01T10:00:00Z",
    title: "Residential Property Pricing",
    isFavorite: false,
    alias: "residential-property-pricing",

    userDatasetDescription: "You have a dataset of residential properties with features such as location, size, and type of property. The goal is to predict the price of the properties. Initially, properties will be clustered into different segments based on these features, and then regression models will be applied within each segment to predict the property prices.",
    language: "en",
    info: {
      problemDescription: "Given features related to residential properties, the goal is to first cluster the properties into different segments based on their characteristics and then use regression models to predict the property prices within each segment.",
      mainFeatures: "Location, Size, PropertyType, PropertyPrice",
      targetVariable: "Property Price",
      columns: 4,
      rows: 1500,
      needsDimensionalityReduction: false
    },
    recommendationsTitle: "Recommended models for Predicting Residential Property Prices",
    recommendations: [
      {
        type: "clustering",
        paragraph: "Clustering residential properties into different segments based on their features such as location, size, and type can help identify distinct groups with similar characteristics. K-Means Clustering is effective for partitioning the dataset into well-defined clusters. Hierarchical Clustering provides a detailed hierarchical view of clusters, useful for understanding relationships between different property segments. DBSCAN is suitable for detecting outliers and finding clusters of varying shapes and sizes. Mean Shift can adapt to the number of clusters dynamically, and Affinity Propagation is beneficial for finding clusters based on similarity measures.",
        tables: {
          modelsAlias: ["k-means-clustering", "hierarchical-clustering", "dbscan-clustering", "mean-shift-clustering", "spectral-clustering"],
          similarPipelinesAlias: ["california-housing-marketing", "mall-customer-segmentation"]
        }
      },
      {
        type: "regression",
        paragraph: "Applying regression models within each cluster helps predict property prices accurately by focusing on specific property segments. Linear Regression and Polynomial Regression are effective for capturing linear and non-linear relationships between property features and prices. Elastic Net Regression is suitable for datasets with correlated features, combining the benefits of Lasso and Ridge regression. Gradient Boosting (R) and Random Forest (R) handle complex interactions and provide high predictive accuracy. XGBoost (R) is an efficient and high-performance model, especially for large datasets with intricate relationships.",
        tables: {
          modelsAlias: [
            "linear-regression",
            "polynomial-regression",
            "elastic-net-regression",
            "gradient-boosting-regression",
            "random-forest-regression",
            "xgboost-regression"
          ],
          similarPipelinesAlias: ["california-housing-prices", "air-quality-index", "celsius-to-fahrenheit"]
        }
      }
    ]
  },
  {
    id: "Analysis-010",
    createdAt: "2023-08-01T10:00:00Z",
    title: "Customer Products Review",
    isFavorite: true,
    alias: "customer-products-review",

    userDatasetDescription: "We have a dataset containing customer reviews for various products. The dataset includes text reviews with features extracted from the text, such as TF-IDF vectors and word embeddings. The goal is to build a model to classify these reviews into categories such as 'positive', 'negative', and 'neutral'.",
    language: "en",
    info: {
      problemDescription: "Given customer reviews with features extracted from text, the goal is to classify these reviews into categories like 'positive', 'negative', and 'neutral'.",
      mainFeatures: "TF-IDF Vectors, Word Embeddings, ReviewText, ReviewCategory",
      targetVariable: "Review Category",
      columns: 3000,
      rows: 5000,
      needsDimensionalityReduction: false
    },
    recommendationsTitle: "Recommended models for Classifying Customer Reviews",
    recommendations: [
      {
        type: "dimensionalityReduction",
        paragraph: "Handling text data often involves high-dimensional feature spaces, such as TF-IDF vectors and word embeddings. Dimensionality reduction techniques can help simplify these features, making them more manageable for classification models. Principal Component Analysis (PCA) reduces dimensionality by projecting data onto principal components, capturing the most variance. t-SNE is useful for visualizing high-dimensional data in a lower-dimensional space, helping to understand the structure of the data. Autoencoders can learn compact representations of the input features, effectively compressing and reconstructing them.",
        tables: {
          modelsAlias: ["principal-component-analysis", "t-distributed-stochastic-neighbor-embedding", "autoencoders"],
          similarPipelinesAlias: ["cats-vs-dogs", "digit-recognizer"]
        }
      },
      {
        type: "classification",
        paragraph: "Classifying customer reviews into categories like 'positive', 'negative', and 'neutral' involves understanding and categorizing text data based on its sentiment. Logistic Regression is effective for binary and multi-class classification tasks with text features. Naive Bayes Classification performs well with text data due to its probabilistic nature. Gradient Boosting (C) and XGBoost (C) offer robust performance with complex interactions in the data. Support Vector Machine (SVM) (C) is useful for finding optimal boundaries between classes in high-dimensional spaces. Neural Networks (C) can capture intricate patterns in text data.",
        tables: {
          modelsAlias: [
            "logistic-regression",
            "naive-bayes-classification",
            "gradient-boosting-classification",
            "xgboost-classification",
            "support-vector-machines-classification",
            "neural-networks-classification"
          ],
          similarPipelinesAlias: ["cats-vs-dogs", "digit-recognizer"]
        }
      }
    ]
  },
  {
    id: "Analysis-011",
    createdAt: "2023-08-01T10:00:00Z",
    isFavorite: false,
    title: "Air-Quality Index",
    alias: "air-quality-index",
    userDatasetDescription: "Estimate the air quality index (AQI) for a specific location based on factors like temperature, humidity, wind speed, and historical pollution levels.",
    language: "en",
    info: {
      problemDescription: "Given factors such as temperature, humidity, wind speed, and historical pollution levels, the goal is to estimate the air quality index (AQI) for a specific location.",
      mainFeatures: "Temperature, Humidity, WindSpeed, HistoricalPollutionLevels, AQI",
      targetVariable: "Air Quality Index",
      columns: 5,
      rows: 2000,
      needsDimensionalityReduction: false
    },
    recommendationsTitle: "Recommended models for Estimating Air Quality Index (AQI)",
    recommendations: [
      {
        type: "regression",
        paragraph: "Estimating the Air Quality Index (AQI) involves predicting a continuous value based on factors such as temperature, humidity, wind speed, and historical pollution levels. Linear Regression provides a straightforward approach to model the relationship between features and AQI. Gradient Boosting (R) and XGBoost (R) offer more advanced methods that can capture complex patterns and interactions in the data. Random Forest (R) provides robust predictions by aggregating results from multiple decision trees. Neural Networks (R) can learn intricate relationships and non-linear patterns in the features.",
        tables: {
          modelsAlias: [
            "linear-regression",
            "gradient-boosting-regression",
            "xgboost-regression",
            "random-forest-regression",
            "neural-networks-regression",
            "elastic-net-regression"
          ],
          similarPipelinesAlias: ["california-housing-prices", "air-quality-index", "celsius-to-fahrenheit"]
        }
      }
    ]
  }
]

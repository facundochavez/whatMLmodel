import { ProblemType } from "@/types/pipeline.types";

interface PipelinesList {
  alias: string;
  briefDescription: string;
  problemType: ProblemType;
  needsDimensionalityReduction: boolean;
}

export const pipelinesList: PipelinesList[] = [
  {
    alias: "titanic-survivors",
    briefDescription: "Based on the features of Titanic passengers (such as age, sex and socio-economic class), the goal is to determine which types of people were more likely to survive.",
    problemType: "classification",
    needsDimensionalityReduction: false,
  },
  {
    alias: "california-housing-prices",
    briefDescription: "Using demographic and geographic data from the 1990 U.S. Census, this dataset aims to predict median house prices across California districts based on features like income, housing age, and location.",
    problemType: "regression",
    needsDimensionalityReduction: false,
  },
  {
    alias: "digit-recognizer",
    briefDescription: "A classic dataset of 70,000 handwritten digit images (0–9) used to train and test models in image classification and computer vision. The goal is to correctly classify each digit based on its pixel pattern.",
    problemType: "classification",
    needsDimensionalityReduction: true,
  },

  {
    alias: "iris-species-segmentation",
    briefDescription: "A small dataset of iris flower measurements (sepal and petal size) used to classify species or explore natural groupings through clustering, making it useful for both supervised and unsupervised learning.",
    problemType: "clustering",
    needsDimensionalityReduction: false,
  },
  {
    alias: "cats-vs-dogs",
    briefDescription: "A binary image classification dataset with 25,000 labeled photos of cats and dogs. The goal is to train a model to distinguish between the two species despite variations in lighting, background, and positioning.",
    problemType: "classification",
    needsDimensionalityReduction: true,
  },
  {
    alias: "auto-mpg",
    briefDescription: "Dataset with car records (year, displacement, weight, acceleration, etc.) to predict fuel consumption (miles per gallon).",
    problemType: "regression",
    needsDimensionalityReduction: false,
  },
  {
    alias: "wine-clustering",
    briefDescription: "Chemical analysis of three types of wine. Appropriate to apply clustering such as K -Means and DBSCAN to identify varieties without labels.",
    problemType: "clustering",
    needsDimensionalityReduction: false,
  },
  {
    alias: "air-quality-index",
    briefDescription: "Hourly sensor data from an Italian city in 2004 measuring pollutant gases (like CO, NOx, Benzene) and weather conditions, used to predict air pollution levels and analyze environmental factors affecting air quality.",
    problemType: "regression",
    needsDimensionalityReduction: false,
  },
  {
    alias: "credit-card-customers",
    briefDescription: "Contains customer data (like age, income, and account activity) to predict whether a credit card user will stop using the service. It’s commonly used for churn prediction and customer retention modeling.",
    problemType: "classification",
    needsDimensionalityReduction: false,
  },

  {
    alias: "celsius-to-fahrenheit",
    briefDescription: "A simple dataset mapping Celsius to Fahrenheit values, used to teach linear regression by learning the relationship: Fahrenheit = Celsius × 1.8 + 32. Ideal for beginners in predictive modeling.",
    problemType: "regression",
    needsDimensionalityReduction: false,
  },
  {
    alias: "mall-customer-segmentation",
    briefDescription: "Includes data on 2,000 customers (age, income, spending score, etc.) to group them into segments using clustering algorithms. It’s used for unsupervised learning in marketing to identify customer types and tailor strategies.",
    problemType: "clustering",
    needsDimensionalityReduction: false,
  },
  {
    alias: "iris-species-classification",
    briefDescription: "A classic dataset with 150 flower samples from three iris species, described by sepal and petal measurements. It's used to classify species or explore clustering and dimensionality reduction techniques.",
    problemType: "classification",
    needsDimensionalityReduction: false,
  },

  {
    alias: "california-housing-marketing",
    briefDescription: "Uses California Housing data to cluster geographic regions based on income and socio-economic factors, helping target marketing and planning by identifying distinct population segments like high-, middle-, and low-income areas.",
    problemType: "clustering",
    needsDimensionalityReduction: false,
  },
  {
    alias: "red-wine-quality",
    briefDescription: "Dataset includes physicochemical test results of red wines (such as acidity, sugar, pH, and alcohol content) and quality ratings. It’s widely used to build regression models that predict wine quality as continuous scores.",
    problemType: "regression",
    needsDimensionalityReduction: false,
  },
  {
    alias: "cc-customers-clustering",
    briefDescription: "Registration of the use of credit cards by 9,000 clients (transactions, payments, credit limit), ideal for segmentation of customers without supervision.",
    problemType: "clustering",
    needsDimensionalityReduction: false,
  }
];
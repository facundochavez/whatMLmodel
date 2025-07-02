import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline =
{
  id: "10",
  alias: "california-housing-marketing",
  title: "California Housing Marketing",
  problemType: "clustering",
  icon: 20,
  link: {
    platform: "Kaggle",
    url: "https://www.kaggle.com/datasets/camnugent/california-housing-prices",
  },
  problemDescription: "This problem centers on utilizing the California Housing dataset to segment various geographic zones by analyzing income levels alongside a range of socio-economic indicators collected from census data.\n\nThe primary goal is to group similar regions together using clustering techniques, enabling marketers and planners to develop more targeted, efficient, and effective marketing strategies.\n\nKey variables used for segmentation include:\n\n- Median household income  \n- Housing density  \n- Population size  \n- Other relevant socio-economic indicators\n\nBy applying these unsupervised learning methods, distinct population segments can be identified—such as high-income, middle-income, and low-income areas—based on the combination of these features.\n\nThese insights facilitate the design and deployment of highly tailored advertising campaigns and resource allocation that align closely with the unique characteristics and needs of each cluster, thereby maximizing engagement and return on investment.\n\nMoreover, this approach helps uncover hidden patterns and regional disparities, providing valuable information for urban planners, policymakers, and businesses looking to understand community profiles and improve service delivery across different neighborhoods.",
  notebook: {
    preprocessingCode: "import pandas as pd\n\n# Load the dataset\ndata = pd.read_csv('housing.csv')\n\n# Select relevant features for clustering\nX = data.loc[:, ['latitude', 'longitude', 'median_income']]",
    training: [
      {
        modelAlias: "k-means-clustering",
        trainingCode: "from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)",
        performance: {
          inertia: 39488.77,
          silhouetteScore: 0.539,
          daviesBouldinIndex: 0.699,
          calinskiHarabaszIndex: 25513.23,
        },
      },
      {
        modelAlias: "hierarchical-clustering",
        trainingCode: "from sklearn.cluster import AgglomerativeClustering\n\nmodel = AgglomerativeClustering(n_clusters=6)\npredictions = model.fit_predict(X)",
        performance: {
          inertia: 40210.45,
          silhouetteScore: 0.521,
          daviesBouldinIndex: 0.712,
          calinskiHarabaszIndex: 24890.67,
        },
      },
      {
        modelAlias: "dbscan-clustering",
        trainingCode: "from sklearn.cluster import DBSCAN\n\nmodel = DBSCAN(eps=0.5, min_samples=5)\npredictions = model.fit_predict(X)",
        performance: {
          inertia: 41012.34,
          silhouetteScore: 0.435,
          daviesBouldinIndex: 0.988,
          calinskiHarabaszIndex: 19875.44,
        },
      },
      {
        modelAlias: "mean-shift-clustering",
        trainingCode: "from sklearn.cluster import MeanShift\n\nmodel = MeanShift()\npredictions = model.fit_predict(X)",
        performance: {
          inertia: 39876.12,
          silhouetteScore: 0.498,
          daviesBouldinIndex: 0.763,
          calinskiHarabaszIndex: 23102.12,
        },
      },
      {
        modelAlias: "gaussian-mixture-clustering",
        trainingCode: "from sklearn.mixture import GaussianMixture\n\nmodel = GaussianMixture(n_components=6)\npredictions = model.fit_predict(X)",
        performance: {
          inertia: 39654.89,
          silhouetteScore: 0.510,
          daviesBouldinIndex: 0.745,
          calinskiHarabaszIndex: 24210.89,
        },
      },
      {
        modelAlias: "spectral-clustering",
        trainingCode: "from sklearn.cluster import SpectralClustering\n\nmodel = SpectralClustering(n_clusters=6, affinity='nearest_neighbors')\npredictions = model.fit_predict(X)",
        performance: {
          inertia: 40345.67,
          silhouetteScore: 0.468,
          daviesBouldinIndex: 0.822,
          calinskiHarabaszIndex: 21567.31,
        },
      }
    ],
  },
}

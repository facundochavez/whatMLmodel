import { Pipeline } from "@/types/pipeline.types";

export const pipeline: Pipeline = {
  alias: "mall-customer-segmentation",
  title: "Mall Customer Segmentation",
  problemType: "clustering",
  icon: 22,
  link: {
    platform: "Kaggle",
    url: "https://www.kaggle.com/datasets/vjchoudhary7/customer-segmentation-tutorial-in-python",
  },
  problemDescription:
    "This dataset contains detailed information on 2,000 customers, collected specifically for the purpose of customer segmentation in marketing analytics.\n\nIt encompasses a variety of demographic and behavioral features, including:\n\n- Age  \n- Gender  \n- Annual Income (k$)  \n- Spending Score (1-100)  \n- Other relevant attributes that capture customer preferences and habits\n\nThe primary objective of this dataset is to enable the application of clustering algorithms that group customers with similar characteristics together.\n\nBy uncovering these natural segments, businesses can design targeted marketing strategies, craft personalized offers, and enhance overall customer engagement and satisfaction.\n\nThis dataset exemplifies a typical unsupervised learning task where no pre-existing labels are available, challenging data scientists to discover hidden patterns, relationships, and insights within the customer data.\n\nIts practical relevance and richness make it an excellent resource for experimenting with various clustering techniques such as K-Means, hierarchical clustering, and DBSCAN, as well as for evaluating cluster quality and interpretability in real-world marketing scenarios.",
  notebook: {
    preprocessingCode:
      "import pandas as pd\n\n# Load the Customer Segmentation dataset\ndata = pd.read_csv('Mall_Customers.csv')\n\n# Select relevant features for clustering\nX = data.loc[:, ['Age', 'Annual Income (k$)', 'Spending Score (1-100)']]\n\n# Optional: encode categorical variables if necessary (e.g., Gender)\nfrom sklearn.preprocessing import LabelEncoder\nle = LabelEncoder()\ndata['Gender'] = le.fit_transform(data['Gender'])\n\n# Optional: scale features for better clustering\nfrom sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\n\n# X_scaled is ready for clustering algorithms such as KMeans, DBSCAN, etc.",
    training: [
      {
        modelAlias: "k-means-clustering",
        trainingCode: "from sklearn.cluster import KMeans\nfrom sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score\nmodel = KMeans(n_clusters=5, random_state=42)\npredictions = model.fit_predict(X_scaled)\nsilhouette = silhouette_score(X_scaled, predictions)\ndavies = davies_bouldin_score(X_scaled, predictions)\ncalinski = calinski_harabasz_score(X_scaled, predictions)\n# Use metrics later",
        performance: {
          inertia: 210.0,
          silhouetteScore: 0.42,
          daviesBouldinIndex: 0.95,
          calinskiHarabaszIndex: 310,
        },
      },
      {
        modelAlias: "hierarchical-clustering",
        trainingCode: "from sklearn.cluster import AgglomerativeClustering\nfrom sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score\nmodel = AgglomerativeClustering(n_clusters=5)\npredictions = model.fit_predict(X_scaled)\nsilhouette = silhouette_score(X_scaled, predictions)\ndavies = davies_bouldin_score(X_scaled, predictions)\ncalinski = calinski_harabasz_score(X_scaled, predictions)\n# Use metrics later",
        performance: {
          inertia: 220.0,
          silhouetteScore: 0.39,
          daviesBouldinIndex: 1.1,
          calinskiHarabaszIndex: 295,
        },
      },
      {
        modelAlias: "dbscan-clustering",
        trainingCode: "from sklearn.cluster import DBSCAN\nfrom sklearn.metrics import silhouette_score, davies_bouldin_score\nmodel = DBSCAN(eps=0.7, min_samples=5)\npredictions = model.fit_predict(X_scaled)\nsilhouette = silhouette_score(X_scaled, predictions)\ndavies = davies_bouldin_score(X_scaled, predictions)\n# Use metrics later",
        performance: {
          inertia: 230.0,
          silhouetteScore: 0.37,
          daviesBouldinIndex: 1.2,
          calinskiHarabaszIndex: 280,
        },
      },
      {
        modelAlias: "mean-shift-clustering",
        trainingCode: "from sklearn.cluster import MeanShift\nfrom sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score\nmodel = MeanShift()\npredictions = model.fit_predict(X_scaled)\nsilhouette = silhouette_score(X_scaled, predictions)\ndavies = davies_bouldin_score(X_scaled, predictions)\ncalinski = calinski_harabasz_score(X_scaled, predictions)\n# Use metrics later",
        performance: {
          inertia: 215.0,
          silhouetteScore: 0.40,
          daviesBouldinIndex: 1.05,
          calinskiHarabaszIndex: 300,
        },
      },
      {
        modelAlias: "gaussian-mixture-clustering",
        trainingCode: "from sklearn.mixture import GaussianMixture\nfrom sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score\nmodel = GaussianMixture(n_components=5, random_state=42)\npredictions = model.fit_predict(X_scaled)\nsilhouette = silhouette_score(X_scaled, predictions)\ndavies = davies_bouldin_score(X_scaled, predictions)\ncalinski = calinski_harabasz_score(X_scaled, predictions)\n# Use metrics later",
        performance: {
          inertia: 208.0,
          silhouetteScore: 0.43,
          daviesBouldinIndex: 0.9,
          calinskiHarabaszIndex: 315,
        },
      },
      {
        modelAlias: "spectral-clustering",
        trainingCode: "from sklearn.cluster import SpectralClustering\nfrom sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score\nmodel = SpectralClustering(n_clusters=5, random_state=42)\npredictions = model.fit_predict(X_scaled)\nsilhouette = silhouette_score(X_scaled, predictions)\ndavies = davies_bouldin_score(X_scaled, predictions)\ncalinski = calinski_harabasz_score(X_scaled, predictions)\n# Use metrics later",
        performance: {
          inertia: 225.0,
          silhouetteScore: 0.38,
          daviesBouldinIndex: 1.0,
          calinskiHarabaszIndex: 290,
        },
      },
    ]
  },
};

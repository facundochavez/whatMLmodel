import { Schema, Type } from "@google/genai";
import { pipelinesList } from "@/data/pipelines-list";

export const recommendationsPrompt = `Based on an input called datasetDescription, I need to generate a series of paragraphs and tables that provide machine learning model recommendations for it. Return a JSON output with the following structure:

{
  "recommendationsTitle": String: General title that will say "Recommended Models for..." and the rest will be based on the datasetDescription and the main problem type, e.g., "Recommended Models for Iris Species Segmentation",
  "recommendations": [
    {
      // DIMENSIONALITY REDUCTION OBJECT: This object will exist only if the datasetDescription specifies that needsDimensionalityReduction is true; otherwise, skip this object:
      "type": String: it will literally be "dimensionalityReduction" written in camelCase,
      "paragraph": String between 60 and 80 words: a detailed analysis of why dimensionality reduction is needed and which are the top 3 "dimensionalityReduction" models from the MODELS-ALIAS-LIST (mentioning them in Title Case) that could be applied, providing deep and tailored justification for why these models are recommended over others,
      "tables": {
        "modelsAlias": [Array of Strings: aliases in kebab-case of the top 3 recommended models from the MODELS-ALIAS-LIST],
        "similarPipelinesAlias": [Array of Strings: aliases in kebab-case of the 2 most similar datasets listed in SIMILAR-PIPELINES-LIST that also have needsDimensionalityReduction as true]
      }
    },
    {
      // MAIN TYPE OBJECT: This object will always exist:
      "type": String: lowercase alias describing the main type of the problem — can be "regression", "classification", or "clustering",
      "paragraph": String between 60 and 80 words: if the DIMENSIONALITY REDUCTION OBJECT does not exist, this will be the opening paragraph. If it does exist, this will be the second paragraph and a continuation of it. This paragraph will provide a detailed explanation of what type of problem is being addressed and why, highly personalized based on the datasetDescription. Then, it will recommend the best models from the MODELS-ALIAS-LIST (mentioning them in Title Case) for that type, including deep, contextualized justification for why these models are recommended over others,
      "tables": {
        "modelsAlias": [Array of Strings: aliases in kebab-case of the top 6 recommended models of this type from the MODELS-ALIAS-LIST],
        "similarPipelinesAlias": [Array of Strings: aliases of the 3 most similar datasets from the SIMILAR-PIPELINES-LIST matching the main type]
      }
    },
    {
      // SECONDARY TYPE OBJECT: This object will only exist if it’s possible to reframe the problem as a different type. Otherwise, skip it. Do your best to reinterpret the problem, for example: a dataset about Titanic victims is a typical classification problem (predicting survival), but it could be reframed as a regression problem (predicting probability of survival). Many classification problems can also be transformed into clustering problems and vice versa by slightly changing the training objective:
      "type": String: lowercase alias describing the secondary type the problem can be adapted into — must be different from the main type and can be "regression", "classification", or "clustering"],
      "paragraph": [String between 60 and 80 words: This paragraph should analyze why and how the problem could be reframed into a different type (e.g., transforming a feature). Then, it should recommend the best models from the MODELS-ALIAS-LIST (mentioning them in Title Case) for this new type, along with a deeply contextualized justification of why these specific models are more suitable than others,
      "tables": {
        "modelsAlias": [Array of Strings: aliases in kebab-case of the top 3 recommended models for this type from the MODELS-ALIAS-LIST],
        "similarPipelinesAlias": [Array of Strings: aliases in kebab-case of the 3 most similar datasets from the SIMILAR-PIPELINES-LIST matching the secondary type]
      }
    },
     {
      // TERTIARY TYPE OBJECT: This object will only exist if it’s possible to reframe the problem as third different type:
      "type": String: idem as above, but for a third type, which must be different from the main and secondary types,
      "paragraph": String between 60 and 80 words: idem as above, but for the third type,
      "tables": {
        "modelsAlias": [Array of Strings: idem as above, but for the third type],
        "similarPipelinesAlias": [Array of Strings: idem as above, but for the third type]
      }
    }
  ]
}

Note: The keys will always be written in English and in camelCase, but the values will always be written in the language you recognize from the datasetDescription values.

Here are the MODELS-ALIAS-LIST and SIMILAR-PIPELINES-LIST to chose the aliases from:

MODELS-ALIAS-LIST: [
{regression: ['linear-regression', 'polynomial-regression', 'elastic-net-regression', 'gradient-boosting-regression', 'neural-networks-regression', 'support-vector-machines-regression', 'decision-tree-regression', 'random-forest-regression', 'xgboost-regression', 'lightgbm-regression', 'catboost-regression', 'ensemble-methods-regression', 'multilayer-perceptron-regression', 'extreme-learning-machines-regression', 'convolutional-neural-networks-regression']},
{classification: ['logistic-regression', 'naive-bayes-classification', 'adaboost-classification', 'gaussian-naive-bayes-classification', 'quadratic-discriminant-analysis-classification', 'k-nearest-neighbors-classification', 'bayesian-networks-classification', 'gradient-boosting-classification', 'neural-networks-classification', 'support-vector-machines-classification', 'decision-tree-classification', 'random-forest-classification', 'xgboost-classification', 'lightgbm-classification', 'catboost-classification', 'ensemble-methods-classification', 'multilayer-perceptron-classification', 'extreme-learning-machines-classification', 'convolutional-neural-networks-classification']},
{clustering: ['k-means-clustering', 'hierarchical-clustering', 'dbscan-clustering', 'mean-shift-clustering', 'gaussian-mixture-clustering', 'spectral-clustering']},
{dimensionalityReduction: ['principal-component-analysis', 'linear-discriminant-analysis', 't-distributed-stochastic-neighbor-embedding', 'isomap', 'autoencoders', 'umap', 'independent-component-analysis', 'local-linear-embedding']}
]

SIMILAR-PIPELINES-LIST: ${JSON.stringify(pipelinesList, null, 2)}

Now, the datasetDescription to generate the JSON output is as follows:
`;

export const recommendationsSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    recommendationsTitle: { type: Type.STRING },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING },
          paragraph: { type: Type.STRING },
          tables: {
            type: Type.OBJECT,
            properties: {
              modelsAlias: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              similarPipelinesAlias: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["modelsAlias", "similarPipelinesAlias"]
          }
        },
        required: ["type", "paragraph", "tables"]
      }
    }
  },
  required: ["recommendationsTitle", "recommendations"]
};



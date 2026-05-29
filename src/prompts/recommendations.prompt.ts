import { Schema, Type } from "@google/genai";
import { pipelinesList } from "@/data/pipelines-list";

export const recommendationsPrompt = `Based on an input called datasetInfo, I need to generate a series of paragraphs and tables that provide machine learning model recommendations for it. Return a JSON output with the following structure. Important: keep english for the keys but recognize the datasetInfo.language and use it for the values:

{
  "recommendationsTitle": String in sentence case (only the first word capitalized): General title that will say "Recommended models for..." and the rest will be based on the datasetInfo and the main problem type, e.g., "Recommended models for Iris species segmentation" or "Modelos recomendados para la segmentación de especies de Iris",
  "modelsIntroText": String: One short sentence in datasetInfo.language that introduces the model tables in the recommendations array. It must convey the meaning of "Here you are a list of the best models you can apply and their performance metrics for datasets similar to yours:" or in spanish "Aquí tienes una lista de los mejores modelos que puedes aplicar y sus métricas de rendimiento para datasets similares al tuyo:".
  "recommendations": [
    {
      // DIMENSIONALITY REDUCTION OBJECT: This object will exist only if datasetInfo.needsDimensionalityReduction is true; otherwise, skip this object:
      "type": String: it will literally be "dimensionalityReduction" written in camelCase.
      "paragraphs": [Array of exactly 2 Strings, each between 60 and 80 words: The first paragraph should explain why dimensionality reduction is needed for this dataset. The second paragraph should present the top 3 "dimensionalityReduction" models from the MODELS-ALIAS-LIST (mentioning them in Title Case), with tailored justification for why these models are recommended over others.]
      "tables": {
        "modelsAlias": [Array of Strings: aliases in kebab-case of the top 3 recommended models from the MODELS-ALIAS-LIST],
        "similarPipelinesAlias": [Array of Strings: aliases in kebab-case of the 2 most similar datasets listed in SIMILAR-PIPELINES-LIST that also have needsDimensionalityReduction as true]
      }
    },
    {
      // MAIN TYPE OBJECT: This object will always exist:
      "type": String: lowercase alias describing the main type of the problem — can be "regression", "classification", or "clustering".
      "paragraphs": [Array of exactly 2 Strings, each between 60 and 80 words: The first paragraph should explain what type of problem is being addressed and why, highly personalized based on the datasetInfo. If datasetInfo.needsDimensionalityReduction is false, this should be an introduction. If not, continue from the previous recommendation. The second paragraph should recommend the best models from the MODELS-ALIAS-LIST (mentioning them in Title Case) for that type, with contextualized justification for why these models are recommended over others.]
      "tables": {
        "modelsAlias": [Array of Strings: aliases in kebab-case of the top 6 recommended models of this type from the MODELS-ALIAS-LIST],
        "similarPipelinesAlias": [Array of Strings: aliases of the 3 most similar datasets from the SIMILAR-PIPELINES-LIST matching the main type]
      }
    },
    {
      // SECONDARY TYPE OBJECT: This object will only exist if it’s possible to reframe the problem as a different type. Otherwise, skip it. Do your best to reinterpret the problem, for example: a dataset about Titanic victims is a typical classification problem (predicting survival), but it could be reframed as a regression problem (predicting probability of survival) or changing the target variable (predicting the age of the passengers). Many classification problems can also be transformed into clustering problems and vice versa by slightly changing the training objective or the target variable:
      "type": String: lowercase alias describing the secondary type the problem can be adapted into — must be different from the main type and can be "regression", "classification", or "clustering".
      "sectionTitle": String in sentence case: A short title (6–12 words) in datasetInfo.language that names the reframing in concrete terms according to the paragraphs below. Write the title directly — do NOT prefix it with labels such as "Reframing:", "Reinterpretación:".
      "paragraphs": [Array of exactly 2 Strings, each between 60 and 80 words: The first paragraph should explain why and how the problem could be reframed into a different type (e.g., transforming a feature), continuing from the previous recommendation. The second paragraph should recommend the best models from the MODELS-ALIAS-LIST (mentioning them in Title Case) for this new type, with contextualized justification of why these specific models are more suitable than others.]
      "tables": {
        "modelsAlias": [Array of Strings: aliases in kebab-case of the top 3 recommended models for this type from the MODELS-ALIAS-LIST],
        "similarPipelinesAlias": [Array of Strings: aliases in kebab-case of the 3 most similar datasets from the SIMILAR-PIPELINES-LIST matching the secondary type]
      }
    },
     {
      // TERTIARY TYPE OBJECT: This object will only exist if it’s possible to reframe the problem as third different type:
      "type": String: idem as above, but for a third type, which must be different from the main and secondary types.
      "sectionTitle": String in sentence case: idem as above — a short contextual title in datasetInfo.language naming this third reframing in concrete terms.
      "paragraphs": [Array of exactly 2 Strings, each between 60 and 80 words: idem as above, but for the third type. The first paragraph should explain the reframing; the second should recommend the best models for that type, continuing from the previous recommendation.]
      "tables": {
        "modelsAlias": [Array of Strings: idem as above, but for the third type],
        "similarPipelinesAlias": [Array of Strings: idem as above, but for the third type]
      }
    }
  ]
}

Here are the MODELS-ALIAS-LIST and SIMILAR-PIPELINES-LIST to chose the aliases from:

MODELS-ALIAS-LIST: [
{regression: ['linear-regression', 'polynomial-regression', 'elastic-net-regression', 'gradient-boosting-regression', 'neural-networks-regression', 'support-vector-machines-regression', 'decision-tree-regression', 'random-forest-regression', 'xgboost-regression', 'lightgbm-regression', 'catboost-regression', 'ensemble-methods-regression', 'multilayer-perceptron-regression', 'extreme-learning-machines-regression', 'convolutional-neural-networks-regression']},
{classification: ['logistic-regression', 'naive-bayes-classification', 'adaboost-classification', 'gaussian-naive-bayes-classification', 'quadratic-discriminant-analysis-classification', 'k-nearest-neighbors-classification', 'bayesian-networks-classification', 'gradient-boosting-classification', 'neural-networks-classification', 'support-vector-machines-classification', 'decision-tree-classification', 'random-forest-classification', 'xgboost-classification', 'lightgbm-classification', 'catboost-classification', 'ensemble-methods-classification', 'multilayer-perceptron-classification', 'extreme-learning-machines-classification', 'convolutional-neural-networks-classification']},
{clustering: ['k-means-clustering', 'hierarchical-clustering', 'dbscan-clustering', 'mean-shift-clustering', 'gaussian-mixture-clustering', 'spectral-clustering']},
{dimensionalityReduction: ['principal-component-analysis', 'linear-discriminant-analysis', 't-distributed-stochastic-neighbor-embedding', 'isomap', 'autoencoders', 'umap', 'independent-component-analysis', 'local-linear-embedding']}
]

SIMILAR-PIPELINES-LIST: ${JSON.stringify(pipelinesList, null, 2)}

Note: Talk in an impersonal way: do not say "we recommend these models" but "these models are recommended" or "these models are suggested".
Important: Every paragraphs array must contain exactly 2 strings — never 1, never 3 or more.
Important: sectionTitle values must be plain titles only — never start with a category label and a colon (e.g. avoid "Reframing:", "Reinterpretación:", "Alternative:").
Now, the datasetInfo to generate the JSON output is as follows:
`;

export const recommendationsSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    recommendationsTitle: { type: Type.STRING },
    modelsIntroText: { type: Type.STRING },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING },
          sectionTitle: { type: Type.STRING },
          paragraphs: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: '2',
            maxItems: '2'
          },
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
        required: ["type", "paragraphs", "tables"]
      }
    }
  },
  required: ["recommendationsTitle", "modelsIntroText", "recommendations"]
};



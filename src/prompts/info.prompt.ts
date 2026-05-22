import { Schema, Type } from "@google/genai";

export const infoPrompt = `Based on the userMessage describing a dataset and its target variable, generate the next Output in JSON format. Important: keys in english and recognize the language of the userMessage for the values:
{
  "language": String: language detected from the userMessage. Must be its standard ISO 639-1 code: "en", "es", "fr", etc. This will be user.language for this prompt.
  "userDatasetDescription": String (in user.language): same description from the userMessage but in a formal way with a corrected grammar and spelling,
  "title": String (in user.language) of at least 2 words: very generic title without mentioning the type of problem (do not say if it’s classification, regression, or other). It should be something like "Titanic Survivors", "Iris Species", "House Prices", etc. Write it in the input.language and use connectors if the language needs them (e.g. in spanish: "Sobrevivientes del Titanic", "Especies de Iris", "Precios de Casas", etc.).
  "alias": String (in user.language): same title in kebab-case,
  "info": {
    "problemDescription": String (in user.language) of up to 40 words: description of the problem (without mentioning features and problem type. Don’t be too specific if it is a classification, regression, or clustering problem), and the goal in a clear, concise and inpersonal way. It should clearly reflect the userMessage, and if it was too short, this will be a description with more details and context. Avoid start by saying something like "This dataset contains...", be more original than that,
    "mainFeatures": String (allways in english no matter the user.language): up to 5 features from the dataset that make logical sense, separated by separated by commas and spaces, and written in PascalCase,
    "targetVariable": String (allways in english no matter the user.language): the target variable stated simply and directly in PascalCase,
    "columns": Number: number of columns in the dataset. If the userMessage doesn’t specify it, invent a reasonable value based on the type of problem,
    "rows": Number: number of rows in the dataset. If the userMessage doesn’t specify it, invent a reasonable value based on the type of problem,
    "needsDimensionalityReduction": Boolean: describes whether the dataset needs dimensionality reduction or not, either because it has many noisy features or because it involves complex data like long texts, images, audio, video, graphs, high-dimensional data, etc. This will be true if the dataset has more than 10 columns.
  }
}

EXAMPLE:
userMessage: "There’s some high res pics of tumor tissues from a cancer study. I gotta classify ’em into stuff like benign, malignant or like, not sure."
Output: {
  language: "en",
  userDatasetDescription: "High resolution images of tumor tissues are available in a cancer study. I need to classify the images into categories such as benign, malignant, or uncertain.",
  title: "Tumor Tissues",
  alias: "tumor-tissues",
  info: {
    problemDescription: "High resolution images of tumor tissues are available in a cancer study. The dataset is very large and has high dimensionality due to the resolution of the images. The goal is to classify the images into categories such as benign, malignant, or uncertain.",
    mainFeatures: "ImagePixels, TumorCategory",
    targetVariable: "Tumor Category",
    columns: 2,
    rows: 2500,
    needsDimensionalityReduction: true
  }
}

Note: You can rely on popular datasets to fill in the fields if you recognize it’s one of them.

Now, the input to generate output is as follows:
`;

export const infoSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    language: { type: Type.STRING },
    title: { type: Type.STRING },
    alias: { type: Type.STRING },
    userDatasetDescription: { type: Type.STRING },
    info: {
      type: Type.OBJECT,
      properties: {
        problemDescription: { type: Type.STRING },
        mainFeatures: { type: Type.STRING },
        targetVariable: { type: Type.STRING },
        columns: { type: Type.NUMBER },
        rows: { type: Type.NUMBER },
        needsDimensionalityReduction: { type: Type.BOOLEAN },
      },
      required: [
        "problemDescription",
        "mainFeatures",
        "targetVariable",
        "columns",
        "rows",
        "needsDimensionalityReduction",
      ],
    },
  },
  required: ["title", "alias", "userDatasetDescription", "language", "info"],
};
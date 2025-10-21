export const infoPrompt = `Based on an input describing a dataset and its target variable, generate the next output in JSON format:
{
  "title": [String of at least 2 words: very generic title without mentioning the type of problem (do not say if it’s classification, regression, or other). It should be something like "Titanic Survivors", "Iris Species", "House Prices", etc.],
  "alias": [String: same title in kebab-case],
  "userDatasetDescription": [String: same description from the input but in a formal way with a corrected grammar and spelling],
  "language": [String: language detected from the input. Must be its standard ISO 639-1 code: "en", "es", "fr", etc.],
  "info": {
    "problemDescription": [String of up to 40 words: description of the problem (without mentioning features and problem type. Don’t be too specific if it is a classification, regression, or clustering problem), and the goal in a clear, concise and inpersonal way. It should clearly reflect the input, and if it was too short, this will be a description with more details and context. Avoid start by saying something like "This dataset contains...", be more original than that],
    "mainFeatures": [String: up to 5 features from the dataset that make logical sense, separated by separated by commas and spaces, and written in PascalCase],
    "targetVariable": [String: the target variable stated simply and directly in Title Case],
    "columns": [Number: number of columns in the dataset. If the input doesn’t specify it, invent a reasonable value based on the type of problem],
    "rows": [Number: number of rows in the dataset. If the input doesn’t specify it, invent a reasonable value based on the type of problem],
    "needsDimensionalityReduction": [Boolean: describes whether the dataset needs dimensionality reduction or not, either because it has many noisy features or because it involves complex data like long texts, images, audio, video, graphs, high-dimensional data, etc.]
  }
}

EXAMPLE:
Input: "There’s some high res pics of tumor tissues from a cancer study. I gotta classify ’em into stuff like benign, malignant or like, not sure."
Output: {
  title: "Tumor Tissues",
  alias: "tumor-tissues",
  userDatasetDescription: "High resolution images of tumor tissues are available in a cancer study. I need to classify the images into categories such as benign, malignant, or uncertain.",
  language: "en",
  info: {
    problemDescription: "High resolution images of tumor tissues are available in a cancer study. The dataset is very large and has high dimensionality due to the resolution of the images. The goal is to classify the images into categories such as benign, malignant, or uncertain.",
    mainFeatures: "ImagePixels, TumorCategory",
    targetVariable: "Tumor Category",
    columns: 2,
    rows: 2500,
    needsDimensionalityReduction: true
  }
}

Note: You can rely on popular datasets to fill in the fields if you recognize it’s one of them. The keys will always be written in English and in camelCase, but the values will always be written in the language specified by "language".

Now, the input to generate output is as follows:
`;

export const infoSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    alias: { type: "string" },
    userDatasetDescription: { type: "string" },
    language: { type: "string" },
    info: {
      type: "object",
      properties: {
        problemDescription: { type: "string" },
        mainFeatures: { type: "string" },
        targetVariable: { type: "string" },
        columns: { type: "number" },
        rows: { type: "number" },
        needsDimensionalityReduction: { type: "boolean" },
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
// export const promptContext = `El siguiente texto es una descripción de un dataset y variables objetivo que serán usadas para entrenar un modelo de machine learning, tu tienes que devolver a partir del texto, previamente filtrado por tí, los siguientes parámetros en en un objeto string con esta estructura (es obligatorio e imperativo que devuelvas la respuesta en texto plano, no en formato json ni en formato de código, SOLO TEXTO PLANO y con la estructura especificada): '{"problem_description":string, "main_features":string, "target_variable":string, "complex_data":boolean, "number_of_features":number, "dataset_size":number}' El texto es el siguiente:`;

export const promptContext = `Basándote en un input que describe un dataset y su variable objetivo, genera el output siguiente en formato JSON:
{
  "name": [String: nombre genérico sin mencionar el tipo de problema (no decir si es clasifiación, regresión u otro)],
  "alias": [String: mismo nombre en kebab-case]
  "datasetDescription": [String: descripción sencilla del dataset, nombrando algunos features, y la variable objetivo. Es una idea clara del input, adecuándolo si es necesario],
  "language": [String: idioma que reconoces del input. Debe ser su código de idioma estándar (ISO 639-1): "en", "es", "fr", etc.]
  "details":{
    "problemDescription": [String: descripción del problema (sin mencionar los features), y el objetivo de una forma clara y precisa],
    "mainFeatures": [String: hasta siete features principales del dataset que consideres lógicos, incluyendo al final la variable objetivo, separados por comas y escritos en PascalCase],
    "targetVariable": [String: La variable objetivo dicha de forma simple y directa en Title Case],
    "numberOfFeatures": [Number: Cantidad de columnas que contiene el dataset. Si el datasetDescription no lo especifica, inventa un valor razonable según el tipo de problema]
    "datasetSize": [Number: Cantidad de filas que contiene el dataset. Si el datasetDescription no lo especifica, inventa un valor razonable según el tipo de problema],
    "hasComplexData": [Boolean: un booleano que describe si el dataset maneja o no data compleja como texto, imágenes, audio, video, grafos, datos de alta dimensión, etc. Debe ser algo lógico según el tipo de problema]
  }
}

Nota: puedes basarte en datasets de internet para ayudarte a completar los campos (sobre todo numberOfFeatures y datasetSize) si se tratan de problemas típicos y conocidos de machine learning.
      Los keys se escribirán siempre en inglés y en camelCase, pero los valores serán escritos en el idioma que indique "lenguage".`
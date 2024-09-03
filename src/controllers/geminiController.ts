import { NextApiRequest, NextApiResponse } from "next";
import { generateDatasetParameters } from "@/services/geminiService";
import { promptContext } from "@/prompts/promptContext";

const createDatasetParameters = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { modelDescriptionPrompt } = req.body;

    const prompt = promptContext + modelDescriptionPrompt.toString();
    const data = await generateDatasetParameters(prompt);

    // Asegúrate de que el string `data` sea un JSON válido
    let jsonString = data.trim();

    // Si el string está rodeado de comillas simples, conviértelas en comillas dobles
    if (
      (jsonString.startsWith("'") && jsonString.endsWith("'")) ||
      (jsonString.startsWith("```json") && jsonString.endsWith("```"))
    ) {
      jsonString = jsonString.slice(1, -1).replace(/'/g, '"');
    }

    // Parsear el JSON
    const result = JSON.parse(jsonString);
    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as any).message });
  }
};

export default {
  createDatasetParameters,
};

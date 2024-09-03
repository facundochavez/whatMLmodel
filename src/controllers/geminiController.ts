import { NextApiRequest, NextApiResponse } from "next";
import { generateDatasetParameters } from "@/services/geminiService";

const createDatasetParameters = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { modelDescription } = req.body;
    const promptContext = "El siguiente texto es una descripción de un dataset que sera usado para entrenar un modelo de machine learning";
    const prompt = modelDescription.toString();
    const data = await generateDatasetParameters(prompt);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export default {
  createDatasetParameters,
};

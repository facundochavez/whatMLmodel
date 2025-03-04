import { NextApiRequest, NextApiResponse } from "next";
import { generateDatasetParameters } from "@/services/geminiService";

const createDatasetParameters = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { modelDescriptionPrompt } = req.body;
    const data = await generateDatasetParameters(modelDescriptionPrompt);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as any).message });
  }
};

export default {
  createDatasetParameters,
};

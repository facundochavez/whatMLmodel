import { NextApiRequest, NextApiResponse } from "next";
import { generateDatasetParameters } from "@/services/geminiService";
import { promptContext } from "@/prompts/promptContext";
import extractBlockWithBraces from "@/utils/extractBlockWithBraces";

const createDatasetParameters = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { modelDescriptionPrompt } = req.body;
    const prompt = promptContext + modelDescriptionPrompt.toString();
    const data = await generateDatasetParameters(prompt);
    const formatData = extractBlockWithBraces(data);
    const result = JSON.parse(formatData ?? "");
    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as any).message });
  }
};

export default {
  createDatasetParameters,
};

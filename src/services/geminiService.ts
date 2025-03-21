import { GoogleGenerativeAI } from "@google/generative-ai";
import { promptContext, recommendationPrompt } from "@/prompts/promptContext";
import extractBlockWithBraces from "@/utils/extractBlockWithBraces";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 'DEFAULT_API_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateDatasetParameters(prompt: string) {
      const finalPrompt = promptContext + prompt.toString();
      const result = (await model.generateContent(finalPrompt)).response.text(); 
      const formatData = extractBlockWithBraces(result);
      const finalResult = JSON.parse(formatData ?? "");
      return finalResult;
}

export async function getRecommendedModels(datasetDetails: any) {
    try {
        const formattedPrompt = recommendationPrompt + JSON.stringify(datasetDetails, null, 2);
        const result = (await model.generateContent(formattedPrompt)).response.text();
        const formattedData = extractBlockWithBraces(result);
        return JSON.parse(formattedData ?? "{}");
    } catch (error) {
        console.error("Error generating model recommendations:", error);
        return null;
    }
}

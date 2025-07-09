import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'DEFAULT_API_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateDatasetParameters(prompt: string) {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
}
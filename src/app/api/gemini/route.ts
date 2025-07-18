import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { promptContext, recommendationPrompt } from "@/prompts/promptContext";
import extractBlockBetweenBraces from "@/utils/extractBlockBetweenBraces";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userApiKey = body.userGeminiApiKey;
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Si envía { type: "apiKeyCheck", userGeminiApiKey: "..." } => validamos la key
    if (body.type === "apiKeyCheck" && body.userGeminiApiKey) {
      try {
        const tempGenAI = new GoogleGenerativeAI(body.userGeminiApiKey);
        const tempModel = tempGenAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await tempModel.generateContent("Say 'hello'");
        const responseText = result.response.text();
        if (responseText.toLowerCase().includes("hello")) {
          return NextResponse.json({ valid: true }, { status: 200 });
        }
        return NextResponse.json({ valid: false }, { status: 403 });
      } catch (err) {
        return NextResponse.json({ valid: false, error: "Invalid API key" }, { status: 403 });
      }
    }

    // Si envía { type: "info", prompt: "..."} => llamamos a generateAnalysisInfo
    if (body.type === "info" && body.prompt) {
      const finalPrompt = promptContext + body.prompt.toString();
      const result = await model.generateContent(finalPrompt);
      const rawText = result.response.text();
      const formatData = extractBlockBetweenBraces(rawText);
      const finalResult = JSON.parse(formatData ?? "{}");
      return NextResponse.json(finalResult, { status: 200 });
    }

    // Si envía { type: "recommendation", datasetDetails: {...} } => llamamos a generateAnalysisRecommendations
    if (body.type === "recommendation" && body.datasetDetails) {
      const formattedPrompt = recommendationPrompt + JSON.stringify(body.datasetDetails, null, 2);
      const result = await model.generateContent(formattedPrompt);
      const rawText = result.response.text();
      const formattedData = extractBlockBetweenBraces(rawText);
      const finalResult = JSON.parse(formattedData ?? "{}");
      return NextResponse.json(finalResult, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
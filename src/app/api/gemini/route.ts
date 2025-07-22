import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { recommendationsPrompt } from "@/prompts/recommendationsPrompt";
import { infoPrompt } from "@/prompts/infoPrompt";
import extractBlockBetweenBraces from "@/utils/extractBlockBetweenBraces";

async function tryWithFallback(apiKey: string, prompt: string) {
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const fastModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await fastModel.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.warn("Error with gemini-1.5-flash. Trying gemini-2.5-pro...");

    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
      const result = await fallbackModel.generateContent(prompt);
      return result.response.text();
    } catch (err2) {
      throw err2;
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userApiKey = body.userGeminiApiKey;
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

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

    if (body.type === "info" && body.datasetDescription) {
      const finalPrompt = infoPrompt + body.datasetDescription.toString();
      const rawText = await tryWithFallback(apiKey, finalPrompt);
      const formatData = extractBlockBetweenBraces(rawText);
      const finalResult = JSON.parse(formatData ?? "{}");
      return NextResponse.json(finalResult, { status: 200 });
    }

    if (body.type === "recommendations" && body.datasetInfo) {
      const formattedPrompt = recommendationsPrompt + JSON.stringify(body.datasetInfo, null, 2);
      const rawText = await tryWithFallback(apiKey, formattedPrompt);
      const formattedData = extractBlockBetweenBraces(rawText);
      const finalResult = JSON.parse(formattedData ?? "{}");
      return NextResponse.json(finalResult, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Gemini API error:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    } else {
      console.error("Gemini API unknown error:", error);
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
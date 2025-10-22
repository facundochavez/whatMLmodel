import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Schema } from "@google/genai"; // ✅ Importación de GoogleGenAI y Schema
import { recommendationsPrompt, recommendationsSchema } from "@/prompts/recommendations.prompt";
import { infoPrompt, infoSchema } from "@/prompts/info.prompt";

const MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-1.5-flash", "gemini-1.5-pro"];

async function tryWithFallback(apiKey: string, prompt: string, schema: Schema | null = null) {
  const genAI = new GoogleGenAI({ apiKey });
  const config = {
    responseMimeType: schema ? "application/json" : "text/plain",
    ...(schema && { responseSchema: schema }),
  };
  let lastError;

  for (const modelName of MODELS) {
    try {
      const result = await genAI.models.generateContent({
        model: modelName,
        contents: prompt,
        config: config,
      });

      return result.text;
    } catch (err) {
      console.warn(`Error with ${modelName}:`, err);
      lastError = err;
    }
  }
  throw lastError;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userApiKey = body.userGeminiApiKey;
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (body.type === "apiKeyCheck" && body.userGeminiApiKey) {
      try {
        const responseText = await tryWithFallback(body.userGeminiApiKey, "Say 'hello'");
        if (responseText?.toLowerCase().includes("hello")) {
          return NextResponse.json({ valid: true }, { status: 200 });
        }

        return NextResponse.json({ valid: false }, { status: 403 });
      } catch (err) {
        return NextResponse.json({ valid: false, error: "Invalid API key" }, { status: 403 });
      }
    }

    if (body.type === "info" && body.datasetDescription) {
      const finalPrompt = infoPrompt + body.datasetDescription.toString();
      const rawText = await tryWithFallback(apiKey, finalPrompt, infoSchema);
      const finalResult = JSON.parse(rawText || "{}");
      console.log(finalResult);

      return NextResponse.json(finalResult, { status: 200 });
    }

    if (body.type === "recommendations" && body.datasetInfo) {
      const formattedPrompt = recommendationsPrompt + JSON.stringify(body.datasetInfo, null, 2);
      const rawText = await tryWithFallback(apiKey, formattedPrompt, recommendationsSchema);
      const finalResult = JSON.parse(rawText || "{}");

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
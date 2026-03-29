import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Schema } from "@google/genai";
import { recommendationsPrompt, recommendationsSchema } from "@/prompts/recommendations.prompt";
import { infoPrompt, infoSchema } from "@/prompts/info.prompt";

const MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-1.5-flash", "gemini-1.5-pro"];

function getAllApiKeysInOrder(startIndex: number): Array<{ key: string; index: number }> {
  const apiKeys = [
    process.env.GEMINI_API_KEY_ONE,
    process.env.GEMINI_API_KEY_TWO,
    process.env.GEMINI_API_KEY_THREE,
    process.env.GEMINI_API_KEY_FOUR,
    process.env.GEMINI_API_KEY_FIVE,
  ];
  
  // startIndex is 1-based (1-5), convert to 0-based array index
  const start = (startIndex - 1) % apiKeys.length;
  const orderedKeys: Array<{ key: string; index: number }> = [];
  
  for (let i = 0; i < apiKeys.length; i++) {
    const currentIndex = (start + i) % apiKeys.length;
    const key = apiKeys[currentIndex];
    
    if (key) {
      orderedKeys.push({ key, index: currentIndex + 1 });
    }
  }
  
  if (orderedKeys.length === 0) {
    throw new Error('No API keys available - please configure GEMINI_API_KEY_ONE, TWO, THREE, FOUR, or FIVE');
  }
  
  return orderedKeys;
}

async function tryWithFallback(apiKeyIndex: number, prompt: string, schema: Schema | null = null) {
  const config = {
    responseMimeType: schema ? "application/json" : "text/plain",
    ...(schema && { responseSchema: schema }),
  };
  
  const apiKeysToTry = getAllApiKeysInOrder(apiKeyIndex);
  let lastError: Error | unknown;

  for (const { key: apiKey } of apiKeysToTry) {
    const genAI = new GoogleGenAI({ apiKey });
    
    for (const modelName of MODELS) {
      try {
        const result = await genAI.models.generateContent({
          model: modelName,
          contents: prompt,
          config: config,
        });

        return result.text;
      } catch (err) {
        lastError = err;
      }
    }
  }
  
  throw new Error(lastError instanceof Error ? lastError.message : 'All API keys and models failed');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKeyIndex = body.apiKeyIndex ?? 1;

    if (body.type === "info" && body.datasetDescription) {
      const finalPrompt = infoPrompt + body.datasetDescription.toString();
      const rawText = await tryWithFallback(apiKeyIndex, finalPrompt, infoSchema);
      const finalResult = JSON.parse(rawText || "{}");

      return NextResponse.json(finalResult, { status: 200 });
    }

    if (body.type === "recommendations" && body.datasetInfo) {
      const formattedPrompt = recommendationsPrompt + JSON.stringify(body.datasetInfo, null, 2);
      const rawText = await tryWithFallback(apiKeyIndex, formattedPrompt, recommendationsSchema);
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
import { NextRequest, NextResponse } from 'next/server';
import { recommendationsPrompt, recommendationsSchema } from '@/prompts/recommendations.prompt';
import { infoPrompt, infoSchema } from '@/prompts/info.prompt';
import {
  GEMINI_FLASH_MODELS,
  GEMINI_LITE_MODELS,
  generateContentWithApiKey,
  generateContentWithFallback,
} from '@/lib/gemini';

function resolveUserApiKey(body: Record<string, unknown>): string {
  const fromUserApiKey = typeof body.userApiKey === 'string' ? body.userApiKey.trim() : '';
  const fromLegacyField = typeof body.userGeminiApiKey === 'string' ? body.userGeminiApiKey.trim() : '';
  return fromUserApiKey || fromLegacyField;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKeyIndex = body.apiKeyIndex ?? 1;
    const userApiKey = resolveUserApiKey(body);

    if (body.type === 'apiKeyCheck' && userApiKey) {
      try {
        const responseText = await generateContentWithApiKey(userApiKey, "Say 'hello'", null, GEMINI_LITE_MODELS);
        if (responseText?.toLowerCase().includes('hello')) {
          return NextResponse.json({ valid: true }, { status: 200 });
        }

        return NextResponse.json({ valid: false }, { status: 403 });
      } catch {
        return NextResponse.json({ valid: false, error: 'Invalid API key' }, { status: 403 });
      }
    }

    if (body.type === 'info' && body.datasetDescription) {
      const finalPrompt = infoPrompt + body.datasetDescription.toString();
      const rawText = userApiKey
        ? await generateContentWithApiKey(userApiKey, finalPrompt, infoSchema, GEMINI_LITE_MODELS)
        : await generateContentWithFallback(apiKeyIndex, finalPrompt, infoSchema, GEMINI_LITE_MODELS);
      const finalResult = JSON.parse(rawText || '{}');

      return NextResponse.json(finalResult, { status: 200 });
    }

    if (body.type === 'recommendations' && body.datasetInfo) {
      const formattedPrompt = recommendationsPrompt + JSON.stringify(body.datasetInfo, null, 2);
      const rawText = userApiKey
        ? await generateContentWithApiKey(userApiKey, formattedPrompt, recommendationsSchema, GEMINI_FLASH_MODELS)
        : await generateContentWithFallback(apiKeyIndex, formattedPrompt, recommendationsSchema, GEMINI_FLASH_MODELS);
      const finalResult = JSON.parse(rawText || '{}');

      return NextResponse.json(finalResult, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Gemini API error:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    } else {
      console.error('Gemini API unknown error:', error);
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

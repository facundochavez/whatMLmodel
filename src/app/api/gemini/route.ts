import { NextRequest, NextResponse } from 'next/server';
import { recommendationsPrompt, recommendationsSchema } from '@/prompts/recommendations.prompt';
import { infoPrompt, infoSchema } from '@/prompts/info.prompt';
import { generateContentWithFallback } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKeyIndex = body.apiKeyIndex ?? 1;

    if (body.type === 'info' && body.datasetDescription) {
      const finalPrompt = infoPrompt + body.datasetDescription.toString();
      const rawText = await generateContentWithFallback(apiKeyIndex, finalPrompt, infoSchema);
      const finalResult = JSON.parse(rawText || '{}');

      return NextResponse.json(finalResult, { status: 200 });
    }

    if (body.type === 'recommendations' && body.datasetInfo) {
      const formattedPrompt = recommendationsPrompt + JSON.stringify(body.datasetInfo, null, 2);
      const rawText = await generateContentWithFallback(apiKeyIndex, formattedPrompt, recommendationsSchema);
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

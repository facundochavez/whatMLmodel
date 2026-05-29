import { NextRequest } from 'next/server';
import { recommendationsPrompt, recommendationsSchema } from '@/prompts/recommendations.prompt';
import { generateContentStreamWithApiKey, generateContentStreamWithFallback } from '@/lib/gemini';

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

    if (body.type !== 'recommendations' || !body.datasetInfo) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formattedPrompt = recommendationsPrompt + JSON.stringify(body.datasetInfo, null, 2);
    const stream = userApiKey
      ? await generateContentStreamWithApiKey(userApiKey, formattedPrompt, recommendationsSchema)
      : await generateContentStreamWithFallback(apiKeyIndex, formattedPrompt, recommendationsSchema);

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Gemini streaming API error:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    } else {
      console.error('Gemini streaming API unknown error:', error);
    }

    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

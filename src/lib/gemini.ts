import { GoogleGenAI, Schema } from '@google/genai';

export const GEMINI_MODELS = ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-2.5-flash-lite'];

export function getAllApiKeysInOrder(startIndex: number): Array<{ key: string; index: number }> {
  const apiKeys = [
    process.env.GEMINI_API_KEY_ONE,
    process.env.GEMINI_API_KEY_TWO,
    process.env.GEMINI_API_KEY_THREE,
    process.env.GEMINI_API_KEY_FOUR,
    process.env.GEMINI_API_KEY_FIVE,
  ];

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

function buildGenerationConfig(schema: Schema | null) {
  return {
    responseMimeType: schema ? 'application/json' : 'text/plain',
    ...(schema && { responseSchema: schema }),
  };
}

export async function generateContentWithFallback(apiKeyIndex: number, prompt: string, schema: Schema | null = null) {
  const config = buildGenerationConfig(schema);
  const apiKeysToTry = getAllApiKeysInOrder(apiKeyIndex);
  let lastError: Error | unknown;

  for (const { key: apiKey } of apiKeysToTry) {
    const genAI = new GoogleGenAI({ apiKey });

    for (const modelName of GEMINI_MODELS) {
      try {
        const result = await genAI.models.generateContent({
          model: modelName,
          contents: prompt,
          config,
        });

        return result.text;
      } catch (err) {
        lastError = err;
      }
    }
  }

  throw new Error(lastError instanceof Error ? lastError.message : 'All API keys and models failed');
}

export async function generateContentStreamWithFallback(
  apiKeyIndex: number,
  prompt: string,
  schema: Schema | null = null
) {
  const config = buildGenerationConfig(schema);
  const apiKeysToTry = getAllApiKeysInOrder(apiKeyIndex);
  let lastError: Error | unknown;

  for (const { key: apiKey } of apiKeysToTry) {
    const genAI = new GoogleGenAI({ apiKey });

    for (const modelName of GEMINI_MODELS) {
      try {
        return await genAI.models.generateContentStream({
          model: modelName,
          contents: prompt,
          config,
        });
      } catch (err) {
        lastError = err;
      }
    }
  }

  throw new Error(lastError instanceof Error ? lastError.message : 'All API keys and models failed');
}

export async function generateContentWithApiKey(apiKey: string, prompt: string, schema: Schema | null = null) {
  const config = buildGenerationConfig(schema);
  const genAI = new GoogleGenAI({ apiKey });
  let lastError: Error | unknown;

  for (const modelName of GEMINI_MODELS) {
    try {
      const result = await genAI.models.generateContent({
        model: modelName,
        contents: prompt,
        config,
      });

      return result.text;
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(lastError instanceof Error ? lastError.message : 'All API keys and models failed');
}

export async function generateContentStreamWithApiKey(apiKey: string, prompt: string, schema: Schema | null = null) {
  const config = buildGenerationConfig(schema);
  const genAI = new GoogleGenAI({ apiKey });
  let lastError: Error | unknown;

  for (const modelName of GEMINI_MODELS) {
    try {
      return await genAI.models.generateContentStream({
        model: modelName,
        contents: prompt,
        config,
      });
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(lastError instanceof Error ? lastError.message : 'All API keys and models failed');
}

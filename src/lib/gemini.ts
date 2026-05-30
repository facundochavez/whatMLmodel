import { GoogleGenAI, Schema } from '@google/genai';

export const GEMINI_LITE_MODELS = ['gemini-3.1-flash-lite','gemini-2.5-flash-lite'];
export const GEMINI_FLASH_MODELS = ['gemini-2.5-flash', 'gemini-3.5-flash'];

const GEMINI_API_KEY_PREFIX = 'GEMINI_API_KEY_';

function getConfiguredApiKeyEnvNames(): string[] {
  return Object.keys(process.env)
    .filter((name) => name.startsWith(GEMINI_API_KEY_PREFIX))
    .sort();
}

export function getConfiguredApiKeys(): string[] {
  return getConfiguredApiKeyEnvNames()
    .map((name) => process.env[name])
    .filter((key): key is string => Boolean(key));
}

export function getConfiguredApiKeyCount(): number {
  return getConfiguredApiKeys().length;
}

export function getAllApiKeysInOrder(startIndex: number): Array<{ key: string; index: number }> {
  const apiKeys = getConfiguredApiKeys();

  if (apiKeys.length === 0) {
    throw new Error(
      'No API keys available - please configure one or more GEMINI_API_KEY_* environment variables'
    );
  }

  const start = (startIndex - 1) % apiKeys.length;
  const orderedKeys: Array<{ key: string; index: number }> = [];

  for (let i = 0; i < apiKeys.length; i++) {
    const currentIndex = (start + i) % apiKeys.length;
    orderedKeys.push({ key: apiKeys[currentIndex], index: currentIndex + 1 });
  }

  return orderedKeys;
}

function buildGenerationConfig(schema: Schema | null) {
  return {
    responseMimeType: schema ? 'application/json' : 'text/plain',
    ...(schema && { responseSchema: schema }),
  };
}

export async function generateContentWithFallback(
  apiKeyIndex: number,
  prompt: string,
  schema: Schema | null = null,
  models: readonly string[] = GEMINI_LITE_MODELS
) {
  const config = buildGenerationConfig(schema);
  const apiKeysToTry = getAllApiKeysInOrder(apiKeyIndex);
  let lastError: Error | unknown;

  for (const { key: apiKey } of apiKeysToTry) {
    const genAI = new GoogleGenAI({ apiKey });

    for (const modelName of models) {
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
  schema: Schema | null = null,
  models: readonly string[] = GEMINI_FLASH_MODELS
) {
  const config = buildGenerationConfig(schema);
  const apiKeysToTry = getAllApiKeysInOrder(apiKeyIndex);
  let lastError: Error | unknown;

  for (const { key: apiKey } of apiKeysToTry) {
    const genAI = new GoogleGenAI({ apiKey });

    for (const modelName of models) {
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

export async function generateContentWithApiKey(
  apiKey: string,
  prompt: string,
  schema: Schema | null = null,
  models: readonly string[] = GEMINI_LITE_MODELS
) {
  const config = buildGenerationConfig(schema);
  const genAI = new GoogleGenAI({ apiKey });
  let lastError: Error | unknown;

  for (const modelName of models) {
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

export async function generateContentStreamWithApiKey(
  apiKey: string,
  prompt: string,
  schema: Schema | null = null,
  models: readonly string[] = GEMINI_FLASH_MODELS
) {
  const config = buildGenerationConfig(schema);
  const genAI = new GoogleGenAI({ apiKey });
  let lastError: Error | unknown;

  for (const modelName of models) {
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

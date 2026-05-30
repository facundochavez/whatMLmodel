import { useGlobalStore } from '@/store/global.store';

let cachedApiKeyCount: number | null = null;

export async function fetchGeminiApiKeyCount(): Promise<number> {
  if (cachedApiKeyCount !== null) {
    return cachedApiKeyCount;
  }

  const response = await fetch('/api/gemini/config');

  if (!response.ok) {
    throw new Error('Failed to fetch Gemini API key configuration');
  }

  const { apiKeyCount } = await response.json();

  if (typeof apiKeyCount !== 'number' || apiKeyCount <= 0) {
    throw new Error('No Gemini API keys configured on the server');
  }

  cachedApiKeyCount = apiKeyCount;
  return apiKeyCount;
}

export async function initializeApiKeyRotation(): Promise<void> {
  const count = await fetchGeminiApiKeyCount();
  const { apiKeyIndex, apiKeyRotationInitialized } = useGlobalStore.getState();

  let nextIndex = apiKeyIndex;

  if (!apiKeyRotationInitialized) {
    nextIndex = Math.floor(Math.random() * count) + 1;
  } else if (nextIndex < 1 || nextIndex > count) {
    nextIndex = ((nextIndex - 1) % count) + 1;
  }

  useGlobalStore.setState({
    geminiApiKeyCount: count,
    apiKeyIndex: nextIndex,
    apiKeyRotationInitialized: true,
  });
}

export async function ensureApiKeyIndexReady(): Promise<number> {
  await initializeApiKeyRotation();
  return useGlobalStore.getState().apiKeyIndex;
}

export function moveApiKeyIndexAfterSuccess(): void {
  const { apiKeyIndex, geminiApiKeyCount } = useGlobalStore.getState();

  if (!geminiApiKeyCount || geminiApiKeyCount <= 0) {
    return;
  }

  useGlobalStore.setState({
    apiKeyIndex: apiKeyIndex >= geminiApiKeyCount ? 1 : apiKeyIndex + 1,
  });
}

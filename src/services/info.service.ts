import { useGlobalStore } from '@/store/global.store';
import { ensureApiKeyIndexReady, moveApiKeyIndexAfterSuccess } from '@/services/geminiApiKeyConfig.service';

export const infoService = async (datasetDescription: string) => {
  const { userGeminiApiKey } = useGlobalStore.getState();
  const userApiKey = userGeminiApiKey.trim();
  const apiKeyIndex = userApiKey ? undefined : await ensureApiKeyIndexReady();

  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'info',
      datasetDescription,
      ...(apiKeyIndex !== undefined && { apiKeyIndex }),
      ...(userApiKey && { userApiKey }),
    }),
  });

  if (!response.ok) {
    throw new Error('API error');
  }

  const result = await response.json();

  if (!userApiKey) {
    moveApiKeyIndexAfterSuccess();
  }

  return result;
};

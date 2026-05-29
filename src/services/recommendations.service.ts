import { useGlobalStore } from '@/store/global.store';
import { RecommendationsResponse } from '@/types/analysis.types';
import { isRecommendationsResponse, parsePartialRecommendations } from '@/utils/parsePartialRecommendations';

interface RecommendationsStreamCallbacks {
  onPartial: (partial: Partial<RecommendationsResponse>) => void;
}

export const recommendationsStreamService = async (
  datasetInfo: Record<string, unknown>,
  callbacks: RecommendationsStreamCallbacks
): Promise<RecommendationsResponse> => {
  const { apiKeyIndex, moveApiKeyIndex, userGeminiApiKey } = useGlobalStore.getState();
  const userApiKey = userGeminiApiKey.trim();

  const response = await fetch('/api/gemini/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'recommendations',
      datasetInfo,
      apiKeyIndex,
      ...(userApiKey && { userApiKey }),
    }),
  });

  if (!response.ok) {
    throw new Error('API error');
  }

  if (!response.body) {
    throw new Error('No response body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    callbacks.onPartial(parsePartialRecommendations(buffer));
  }

  const finalResult = parsePartialRecommendations(buffer);

  if (!isRecommendationsResponse(finalResult)) {
    throw new Error('Invalid response format');
  }

  if (!userApiKey) {
    moveApiKeyIndex();
  }

  return finalResult;
};

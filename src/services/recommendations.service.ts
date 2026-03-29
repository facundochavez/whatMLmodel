import { useGlobalStore } from '@/store/global.store';

export const recommendationsService = async (datasetInfo: any) => {
  const { apiKeyIndex, moveApiKeyIndex } = useGlobalStore.getState();
  
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'recommendations',
      datasetInfo,
      apiKeyIndex,
    }),
  });

  if (!response.ok) {
    throw new Error('API error');
  }

  const result = await response.json();
  moveApiKeyIndex();
  
  return result;
};
import { useGlobalStore } from '@/store/global.store';

export const infoService = async (datasetDescription: string) => {
  const { apiKeyIndex, moveApiKeyIndex } = useGlobalStore.getState();
  
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'info',
      datasetDescription,
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
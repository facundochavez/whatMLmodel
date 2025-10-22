export const recommendationsService = async (datasetInfo: any, apiKey?: string) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'recommendations',
      datasetInfo,
      userGeminiApiKey: apiKey,
    }),
  });

  if (!response.ok) {
    throw new Error('API error');
  }

  return response.json();
};
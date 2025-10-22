export const infoService = async (datasetDescription: string, apiKey?: string) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'info',
      datasetDescription,
      userGeminiApiKey: apiKey,
    }),
  });

  if (!response.ok) {
    throw new Error('API error');
  }

  return response.json();
};
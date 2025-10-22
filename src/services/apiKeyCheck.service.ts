export const apiKeyCheckService = async (apiKey: string): Promise<boolean> => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'apiKeyCheck',
      userGeminiApiKey: apiKey,
    }),
  });

  if (!response.ok) {
    throw new Error('Invalid API key');
  }

  const result = await response.json();
  return result.valid;
};
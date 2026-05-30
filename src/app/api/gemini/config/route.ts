import { NextResponse } from 'next/server';
import { getConfiguredApiKeyCount } from '@/lib/gemini';

export async function GET() {
  const apiKeyCount = getConfiguredApiKeyCount();

  if (apiKeyCount === 0) {
    return NextResponse.json({ apiKeyCount: 0 }, { status: 503 });
  }

  return NextResponse.json({ apiKeyCount });
}

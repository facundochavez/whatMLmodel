import { RecommendationsResponse } from '@/types/analysis.types';

export function getModelsIntroText(
  analysis?: { modelsIntroText?: string } | null,
  recommendations: RecommendationsResponse['recommendations'] = []
): string | undefined {
  if (analysis?.modelsIntroText?.length) return analysis.modelsIntroText;

  for (const recommendation of recommendations) {
    const nestedIntro = (recommendation as { modelsIntroText?: string }).modelsIntroText;
    if (nestedIntro?.length) return nestedIntro;
  }

  return undefined;
}

function normalizeRecommendationsResponse(result: Partial<RecommendationsResponse>): Partial<RecommendationsResponse> {
  if (result.modelsIntroText?.length) return result;

  const nestedIntro = getModelsIntroText(null, result.recommendations ?? []);
  if (nestedIntro) {
    return { ...result, modelsIntroText: nestedIntro };
  }

  return result;
}

export function parsePartialRecommendations(buffer: string): Partial<RecommendationsResponse> {
  if (!buffer.trim()) return {};

  try {
    return normalizeRecommendationsResponse(JSON.parse(buffer) as Partial<RecommendationsResponse>);
  } catch {
    // Fall through to partial parsing strategies.
  }

  const result: Partial<RecommendationsResponse> = {};

  const titleMatch = buffer.match(/"recommendationsTitle"\s*:\s*"((?:\\.|[^"\\])*)(?:"|$)/);
  if (titleMatch) {
    result.recommendationsTitle = unescapeJsonString(titleMatch[1]);
  }

  const introMatch = buffer.match(/"modelsIntroText"\s*:\s*"((?:\\.|[^"\\])*)(?:"|$)/);
  if (introMatch) {
    result.modelsIntroText = unescapeJsonString(introMatch[1]);
  }

  const recommendationsStart = buffer.indexOf('"recommendations"');
  if (recommendationsStart === -1) {
    return normalizeRecommendationsResponse(result);
  }

  const arrayStart = buffer.indexOf('[', recommendationsStart);
  if (arrayStart === -1) {
    return normalizeRecommendationsResponse(result);
  }

  const recommendations: Partial<RecommendationsResponse>['recommendations'] = [];
  let index = arrayStart + 1;

  while (index < buffer.length) {
    while (index < buffer.length && /[\s,]/.test(buffer[index])) {
      index += 1;
    }

    if (index >= buffer.length || buffer[index] === ']') break;
    if (buffer[index] !== '{') break;

    const objectEnd = findObjectEnd(buffer, index);
    if (objectEnd === -1) {
      const partialObject = parsePartialRecommendationObject(buffer.slice(index));
      if (partialObject) recommendations.push(partialObject);
      break;
    }

    const objectText = buffer.slice(index, objectEnd + 1);
    const parsedObject = tryParseJson(objectText);
    if (parsedObject) recommendations.push(parsedObject);

    index = objectEnd + 1;
  }

  if (recommendations.length > 0) {
    result.recommendations = recommendations as RecommendationsResponse['recommendations'];
  }

  return normalizeRecommendationsResponse(result);
}

export function isRecommendationsResponse(data: unknown): data is RecommendationsResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as RecommendationsResponse).recommendationsTitle === 'string' &&
    Array.isArray((data as RecommendationsResponse).recommendations)
  );
}

function parsePartialRecommendationObject(fragment: string): RecommendationsResponse['recommendations'][number] | null {
  const completeObject = tryParseJson(fragment.endsWith('}') ? fragment : `${fragment}}`);
  if (completeObject) return completeObject;

  const typeMatch = fragment.match(/"type"\s*:\s*"((?:\\.|[^"\\])*)"/);
  const sectionTitleMatch = fragment.match(/"sectionTitle"\s*:\s*"((?:\\.|[^"\\])*)(?:"|$)/);
  const paragraphs = parsePartialParagraphs(fragment);
  const modelsIntroTextMatch = fragment.match(/"modelsIntroText"\s*:\s*"((?:\\.|[^"\\])*)(?:"|$)/);

  if (!typeMatch && !sectionTitleMatch && paragraphs.length === 0 && !modelsIntroTextMatch) return null;

  const partial: Record<string, unknown> = {};
  if (typeMatch) partial.type = unescapeJsonString(typeMatch[1]);
  if (sectionTitleMatch) partial.sectionTitle = unescapeJsonString(sectionTitleMatch[1]);
  if (paragraphs.length > 0) partial.paragraphs = paragraphs;
  if (modelsIntroTextMatch) partial.modelsIntroText = unescapeJsonString(modelsIntroTextMatch[1]);

  const tablesStart = fragment.indexOf('"tables"');
  if (tablesStart !== -1) {
    const tablesObjectStart = fragment.indexOf('{', tablesStart);
    if (tablesObjectStart !== -1) {
      const tablesEnd = findObjectEnd(fragment, tablesObjectStart);
      const tablesFragment = tablesEnd === -1 ? `${fragment.slice(tablesObjectStart)}}` : fragment.slice(tablesObjectStart, tablesEnd + 1);
      const tables = tryParseJson(tablesFragment);
      if (tables) partial.tables = tables;
    }
  }

  return partial as unknown as RecommendationsResponse['recommendations'][number];
}

function parsePartialParagraphs(fragment: string): string[] {
  const paragraphsKey = fragment.indexOf('"paragraphs"');
  if (paragraphsKey === -1) return [];

  const arrayStart = fragment.indexOf('[', paragraphsKey);
  if (arrayStart === -1) return [];

  const paragraphs: string[] = [];
  let index = arrayStart + 1;

  while (index < fragment.length) {
    while (index < fragment.length && /[\s,]/.test(fragment[index])) {
      index += 1;
    }

    if (index >= fragment.length || fragment[index] === ']') break;
    if (fragment[index] !== '"') break;

    const stringMatch = fragment.slice(index).match(/^"((?:\\.|[^"\\])*)(?:"|$)/);
    if (!stringMatch) break;

    paragraphs.push(unescapeJsonString(stringMatch[1]));
    index += stringMatch[0].length;
  }

  return paragraphs;
}

function tryParseJson(value: string): RecommendationsResponse['recommendations'][number] | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function findObjectEnd(buffer: string, start: number): number {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < buffer.length; i += 1) {
    const char = buffer[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function unescapeJsonString(value: string): string {
  return value
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

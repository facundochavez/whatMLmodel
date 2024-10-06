import { Pipeline } from '@/types';
import modelsResponsesDataRaw from '@/prompts/modelsResponses.data.json';

// VALIDACIÓN DE DATOS (BORRAR LUEGO)
const validateModelResponses = (data: any[]): Pipeline[] => {
  return data.filter((item) => {
    if (typeof item !== 'object' || !item) return false;
    return true;
  }) as Pipeline[];
};

export default function getPipelineByAlias(alias: string): Pipeline {
  const modelsResponsesData: Pipeline[] = validateModelResponses(
    modelsResponsesDataRaw
  );

  return modelsResponsesData.find((item) => item?.alias?.includes(alias)) || {};
}

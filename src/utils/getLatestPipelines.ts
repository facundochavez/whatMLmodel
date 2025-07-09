import { pipelinesIndex } from "@/data/pipelines-index";
import { Pipeline } from "@/types/pipeline.types";

export const getLatestPipelines = async (): Promise<Pipeline[]> => {
  const results: Pipeline[] = [];

  for (const alias of pipelinesIndex) {
    if (results.length >= 12) break;

    try {
      const module = await import(`@/data/pipelines/${alias}`);
      if (module.pipeline) {
        results.push(module.pipeline as Pipeline);
      }
    } catch (error) {
      console.warn(`No se pudo cargar el pipeline para ${alias}:`, error);
    }
  }

  return results;
};
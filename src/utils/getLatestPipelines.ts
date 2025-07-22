import { pipelinesList } from "@/data/pipelines-list";
import { Pipeline } from "@/types/pipeline.types";

export const getLatestPipelines = async (): Promise<Pipeline[]> => {
  const results: Pipeline[] = [];

  for (const pipeline of pipelinesList) {
    try {
      const mod = await import(`@/data/pipelines/${pipeline.alias}`);
      if (mod.pipeline) {
        results.push(mod.pipeline as Pipeline);
      }
    } catch (error) {
      console.warn(`No se pudo cargar el pipeline para ${pipeline.alias}:`, error);
    }
  }

  return results;
};
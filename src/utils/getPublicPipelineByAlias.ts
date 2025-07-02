import { Pipeline } from "@/types/pipeline.types";

export const getPublicPipelineByAlias = async (alias: string): Promise<Pipeline | null> => {
  try {
    const module = await import(`@/data/pipelines/${alias}`);
    return module.pipeline as Pipeline;
  } catch (error) {
    console.warn(`No se pudo cargar el pipeline para ${alias}:`, error);
    return null;
  }
};
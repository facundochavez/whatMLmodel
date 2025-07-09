import { Pipeline } from "@/types/pipeline.types";

export default async function getPipelinesByAlias(aliases: string[]): Promise<Pipeline[]> {
  const results: Pipeline[] = [];

  for (const alias of aliases) {
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
}
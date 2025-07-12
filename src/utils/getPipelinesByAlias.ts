import { Pipeline } from "@/types/pipeline.types";

export default async function getPipelinesByAlias(aliases: string[]): Promise<Pipeline[]> {
  const results: Pipeline[] = [];

  for (const alias of aliases) {
    try {
      const mod = await import(`@/data/pipelines/${alias}`);
      if (mod.pipeline) {
        results.push(mod.pipeline as Pipeline);
      }
    } catch (error) {
      console.warn(`No se pudo cargar el pipeline para ${alias}:`, error);
    }
  }

  return results;
}
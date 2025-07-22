import { modelsData } from '@/data/models.data';
import { ProblemType } from '@/types/pipeline.types';

export default function getModelNameByAlias({
  type,
  modelAlias,
}: {
  type: ProblemType | null;
  modelAlias: string | null;
}): string {
  if (!type || !modelAlias) {
    return 'NO NAME FOUND';
  }

  const selectedModels = modelsData[type];
  if (!selectedModels) {
    return 'NO NAME FOUND';
  }

  const found = selectedModels.find((model) => model.alias === modelAlias);
  return found ? found.name : 'NO NAME FOUND';
}
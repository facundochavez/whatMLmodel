import { Model } from '@/types/models.types';
import { ProblemType } from '@/types/common.types';
import { modelsData } from '@/data/models.data';


export default function getModelsByAlias({
  type,
  modelsAlias,
}: {
  type: ProblemType | null;
  modelsAlias: string[] | null;
}): Model[] {
  if (!type || !modelsAlias) {
    return [];
  }
  const models: Model[] = [];
  const selectedModels = modelsData[type];

  if (selectedModels ) {
    modelsAlias.forEach((alias) => {
      selectedModels.forEach((model) => {
        if (model.alias === alias) {
          models.push(model);
        }
      });
    });
  }

  return models;
}

import { Model, ModelsData, ProblemType } from '@/components/TablesGroup/types';
import modelsDataRaw from '@/data/models.data.json';


export default function getModels({
  type,
  modelsAliases,
}: {
  type: ProblemType;
  modelsAliases: string[];
}): Model[] {
  const modelsData: ModelsData = modelsDataRaw as ModelsData;
  const models: Model[] = [];
  const selectedModels = modelsData[type];

  if (selectedModels) {
    modelsAliases.forEach((alias) => {
      selectedModels.forEach((model) => {
        if (model.alias === alias) {
          models.push(model);
        }
      });
    });
  }

  return models;
}

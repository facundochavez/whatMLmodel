import { Model } from '@/components/Tables/Models/columnsModels';
import modelsDataRaw from '@/data/models.data.json';

interface ModelsData {
  [key: string]: Model[];
}

export default function getModels({
  type,
  aliases,
}: {
  type: string;
  aliases: string[];
}): Model[] {
  const modelsData: ModelsData = modelsDataRaw as ModelsData;
  const models: Model[] = [];
  const selectedModels = modelsData[type];


  if (selectedModels) {
    aliases.forEach((alias) => {
      selectedModels.forEach((model) => {
        if (model.alias === alias) {
          models.push(model);
        }
      });
    });
  }

  return models;
}

/* {
  const models = [];

  modelsData.forEach((model) => {
    if (aliases.includes(model.alias)) {
      models.push({
        model: model.name,
        icon: model.icon,
        trainingTime: model.metrics.trainingTime,
        predictionSpeed: model.metrics.predictionSpeed,
        memoryUsage: model.metrics.memoryUsage,
      });
    }
  });
  }

  return models;
} ; */

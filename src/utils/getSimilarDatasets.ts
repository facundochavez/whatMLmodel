import { SimilarDatasetsData } from '@/components/TablesGroup/types';
// Aquí y en getPerformanceMetrics se está llamando al siguiente JSON completo pero aquí no se necesita performance.
import similarDatasetsDataRaw from '@/data/similar-datasets.data.json';

const similarDatasetsData: SimilarDatasetsData =
  similarDatasetsDataRaw as SimilarDatasetsData;

export default function getSimilarDatasets({
  similarDatasetAliases,
}: {
  similarDatasetAliases: string[];
}): SimilarDatasetsData {

  const similarDatasets: SimilarDatasetsData = [];

  for (const alias of similarDatasetAliases) {
    const similarDataset = similarDatasetsData.find(
      (similarDataset) => similarDataset.alias === alias
    );
    if (similarDataset) {
      similarDatasets.push({
        name: similarDataset.name,
        alias: similarDataset.alias,
        description: similarDataset.description,
        features: similarDataset.features,
        targetVariable: similarDataset.targetVariable,
        performance: {},
      });
    }
  }

  return similarDatasets;
}

// Se debe llamar a un getSimilarDatasets con los alias y el mismo devolverá un array con la info casi completa según esos alias (se obvia performance y código),
// esto servirá para rellenar el Select con la información básica (nombre, descripción, etc).
// Cuando se selecciones un dataset (al renderizar está el primero seleccionado -> conviene seleccionar con los alias/id?),
// se debe llamar a un getPerformanceMetrics al cual se le pasará los alias de modelos, el dataset seleccionado y el tipo, para devolver un array de métricas.
// Los datasets tendrán código más adelante, al cual se llamará cuando se haga click en Details (getDetails). De esto nada aún.

// "Puedes usar herramientas como JSON Schema para validar automáticamente tus archivos JSON."

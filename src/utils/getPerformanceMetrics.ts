import {
  SimilarDatasetsData,
  PerformanceMetrics,
  ProblemType,
  PerformanceMetricsList,
} from '@/components/TablesGroup/types';
// Aquí y en getSimilarDatasets se está llamando al siguiente JSON completo pero aquí sólo se necesita la performance metrics de un dataset para una serie de modelos dados.
import similarDatasetsDataRaw from '@/data/similar-datasets.data.json';

const similarDatasetsData: SimilarDatasetsData =
  similarDatasetsDataRaw as SimilarDatasetsData;

export default function getPerformanceMetrics({
  type,
  modelsAlias,
  datasetAlias,
}: {
  type: ProblemType;
  modelsAlias: string[];
  datasetAlias: string;
}): PerformanceMetrics {
  const performanceMetricsList: PerformanceMetricsList = {
    regression: [
      'modelAlias',
      'meanSquaredError',
      'meanAbsoluteError',
      'rootMeanSquaredError',
      'rSquared',
      'adjustedRSquared',
    ],
    classification: [
      'modelAlias',
      'accuracy',
      'precision',
      'recall',
      'f1Score',
      'rocAuc',
      'crossEntropy',
    ],
    clustering: [
      'modelAlias',
      'silhouetteScore',
      'daviesBouldinScore',
      'adjustedRandIndex',
      'normalizedMutualInformation',
      'homogeneity',
      'completeness',
      'vMeasure',
    ],
    dimensionalityReduction: [
      'modelAlias',
      'explainedVarianceRatio',
      'reconstructionError',
      'perplexity',
      'coherenceScore',
      'isolationForestAnomalyDetection',
    ],
  };

  const metrics = performanceMetricsList[type];
  const similarDataset = similarDatasetsData.find(
    (similarDataset) => similarDataset.alias === datasetAlias
  );
  const performanceMetrics: any[] = [];

  modelsAlias.forEach((modelAlias) => {
    const metricsToPush = { modelAlias: modelAlias };

    const foundMetrics: any = similarDataset?.performance?.[type]?.find(
      (metric) => metric.modelAlias === modelAlias
    );

    metrics.forEach((metric) => {
      (metricsToPush as any)[metric] = foundMetrics?.[metric] || '-';
    });

    performanceMetrics.push(metricsToPush);
  });



  return performanceMetrics;
}

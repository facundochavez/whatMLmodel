import { Pipeline } from '@/types/pipeline.types';
import { PerformanceMetrics } from '@/types/performanceMetrics.types';
import { ProblemType } from '@/types/common.types';

export default function getPerformanceMetrics({
  type,
  modelsAlias,
  pipeline,
  columns,
}: {
  type: ProblemType;
  modelsAlias: string[];
  pipeline: Pipeline;
  columns: any[];
}): PerformanceMetrics {
  const metrics: string[] = columns.map((column) => column.accessorKey);

  const performanceMetrics: any[] = modelsAlias.map((modelAlias) => {
    const metricsToPush: any = { modelAlias };
    let foundTraining = null;

    if (type === 'dimensionalityReduction') {
      foundTraining = pipeline?.notebook?.dRTraining?.find(
        (train) => train.modelAlias === modelAlias
      );
    } else {
      foundTraining = pipeline?.notebook?.training?.find(
        (train) => train.modelAlias === modelAlias
      );
    }

    metrics.forEach((metric) => {
      metricsToPush[metric] = (foundTraining?.performance as any)?.[metric] ?? '-';
    });

    return metricsToPush;
  });

  return performanceMetrics;
}
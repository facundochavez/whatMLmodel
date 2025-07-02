import { performanceMetrics } from '@/data/performance-metrics.data';
import { ProblemType } from '@/types/common.types';

export default function getPerformanceMetricNameByAlias({
  type,
  metricAlias,
}: {
  type: ProblemType | null;
  metricAlias: string | null;
}): string {
  if (!type || !metricAlias) {
    return 'NO NAME FOUND';
  }

  const selectedMetrics = performanceMetrics[type];
  if (!selectedMetrics) {
    return 'NO NAME FOUND';
  }

  const found = selectedMetrics.find((metric) => metric.alias === metricAlias);
  return found ? found.name : 'NO NAME FOUND';
}

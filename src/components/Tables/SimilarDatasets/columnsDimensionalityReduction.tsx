import { ColumnDef } from '@tanstack/react-table';

export type DimensionalityReductionMetrics = {
  explainedVarianceRatio: number;
  reconstructionError: number;
  perplexity: number;
  coherenceScore: number;
  isolationForestAnomalyDetection: number;
};

export const columnsDimensionalityReduction: ColumnDef<DimensionalityReductionMetrics>[] =
  [
    {
      accessorKey: 'explainedVarianceRatio',
      header: 'Explained Variance Ratio',
    },
    {
      accessorKey: 'reconstructionError',
      header: 'Reconstruction Error',
    },
    {
      accessorKey: 'perplexity',
      header: 'Perplexity',
    },
    {
      accessorKey: 'coherenceScore',
      header: 'Coherence Score',
    },
    {
      accessorKey: 'isolationForestAnomalyDetection',
      header: 'Isolation Forest Anomaly Detection',
    },
  ];

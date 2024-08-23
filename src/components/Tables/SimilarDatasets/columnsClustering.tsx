import { ColumnDef } from '@tanstack/react-table';

export type ClusteringMetrics = {
  silhouetteScore: number;
  daviesBouldinScore: number;
  adjustedRandIndex: number;
  normalizedMutualInformation: number;
  homogeneity: number;
  completeness: number;
  vMeasure: number;
};

export const columnsClustering: ColumnDef<ClusteringMetrics>[] = [
  {
    accessorKey: 'silhouetteScore',
    header: 'Silhouette Score',
  },
  {
    accessorKey: 'daviesBouldinScore',
    header: 'Davies Bouldin Score',
  },
  {
    accessorKey: 'adjustedRandIndex',
    header: 'Adjusted Rand Index',
  },
  {
    accessorKey: 'normalizedMutualInformation',
    header: 'Normalized Mutual Information',
  },
  {
    accessorKey: 'homogeneity',
    header: 'Homogeneity',
  },
  {
    accessorKey: 'completeness',
    header: 'Completeness',
  },
  {
    accessorKey: 'vMeasure',
    header: 'V-Measure',
  },
];

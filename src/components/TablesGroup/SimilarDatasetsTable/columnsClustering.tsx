import { ColumnDef } from '@tanstack/react-table';
import { ClusteringMetrics } from '../types';

const columnsClustering: ColumnDef<ClusteringMetrics>[] = [
  {
    accessorKey: 'silhouetteScore',
    header: 'Silhouette Score',
  },
  {
    accessorKey: 'daviesBouldinScore',
    header: 'Davies Bouldin\u00A0Score',
  },
  {
    accessorKey: 'adjustedRandIndex',
    header: 'Adjusted Rand\u00A0Index',
  },
  {
    accessorKey: 'normalizedMutualInformation',
    header: 'Normalized Mutual\u00A0Information',
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
    header: 'V\u2011Measure',
  },
];

export default columnsClustering;

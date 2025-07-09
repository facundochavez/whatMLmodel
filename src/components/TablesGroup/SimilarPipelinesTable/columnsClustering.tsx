import { ClusteringMetrics } from '@/types/performanceMetrics.types';
import { ColumnDef } from '@tanstack/react-table';

type StrictClusteringColumn = ColumnDef<ClusteringMetrics> & {
  accessorKey: keyof ClusteringMetrics;
};

const columnsClustering: StrictClusteringColumn[] = [
  {
    accessorKey: 'inertia',
    header: 'Inertia',
  },
  {
    accessorKey: 'silhouetteScore',
    header: 'Silhouette Score',
  },
  {
    accessorKey: 'daviesBouldinIndex',
    header: 'Davies Bouldin\u00A0Index',
  },
  {
    accessorKey: 'calinskiHarabaszIndex',
    header: 'Calinski Harabasz\u00A0Index',
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
    accessorKey: 'fowlkesMallowsScore',
    header: 'Fowlkes Mallows\u00A0Score',
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

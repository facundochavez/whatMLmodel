import { DimensionalityReductionMetrics } from '@/types/performanceMetrics.types';
import { ColumnDef } from '@tanstack/react-table';

type StrictDRColumn = ColumnDef<DimensionalityReductionMetrics> & {
  accessorKey: keyof DimensionalityReductionMetrics;
};

const columnsDimensionalityReduction: StrictDRColumn[] = [
  {
    accessorKey: 'explainedVarianceRatio',
    header: 'Explained Variance\u00A0Ratio',
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
    accessorKey: 'outlierScoreMean',
    header: 'Outlier Score\u00A0Mean',
  },
];

export default columnsDimensionalityReduction;

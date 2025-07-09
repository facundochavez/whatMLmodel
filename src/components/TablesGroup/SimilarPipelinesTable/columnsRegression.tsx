import { RegressionMetrics } from '@/types/performanceMetrics.types';
import { ColumnDef } from '@tanstack/react-table';

type StrictRegressionColumn = ColumnDef<RegressionMetrics> & {
  accessorKey: keyof RegressionMetrics;
};

const columnsRegression: StrictRegressionColumn[] = [
  {
    accessorKey: 'meanAbsoluteError',
    header: 'Mean Absolute\u00A0Error',
  },
  {
    accessorKey: 'meanSquaredError',
    header: 'Mean Squared\u00A0Error',
  },
  {
    accessorKey: 'rootMeanSquaredError',
    header: 'Root\u00A0Mean Squared\u00A0Error',
  },
  {
    accessorKey: 'rSquared',
    header: 'R\u2011Squared',
  },
  {
    accessorKey: 'adjustedRSquared',
    header: 'Adjusted R\u2011Squared',
  },
];

export default columnsRegression;

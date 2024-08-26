import { ColumnDef } from '@tanstack/react-table';
import { RegressionMetrics } from '../types';

const columnsRegression: ColumnDef<RegressionMetrics>[] = [
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
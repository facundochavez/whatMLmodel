import { ColumnDef } from '@tanstack/react-table';

export type RegressionMetrics = {
  meanAbsoluteError: number;
  meanSquaredError: number;
  rootMeanSquaredError: number;
  rSquared: number;
  adjustedRSquared: number;
};

export const columnsRegression: ColumnDef<RegressionMetrics>[] = [
  {
    accessorKey: 'meanAbsoluteError',
    header: 'Mean Absolute Error',
  },
  {
    accessorKey: 'meanSquaredError',
    header: 'Mean Squared Error',
  },
  {
    accessorKey: 'rootMeanSquaredError',
    header: 'Root Mean Squared Error',
  },
  {
    accessorKey: 'rSquared',
    header: 'R-Squared',
  },
  {
    accessorKey: 'adjustedRSquared',
    header: 'Adjusted R-Squared',
  },
];

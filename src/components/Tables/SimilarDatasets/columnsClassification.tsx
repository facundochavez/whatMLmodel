import { ColumnDef } from '@tanstack/react-table';

export type ClassificationMetrics = {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  crossEntropy: number;
};

export const columnsClassification: ColumnDef<ClassificationMetrics>[] = [
  {
    accessorKey: 'accuracy',
    header: 'Accuracy',
  },
  {
    accessorKey: 'precision',
    header: 'Precision',
  },
  {
    accessorKey: 'recall',
    header: 'Recall',
  },
  {
    accessorKey: 'f1Score',
    header: 'F1 Score',
  },
  {
    accessorKey: 'rocAuc',
    header: 'ROC AUC',
  },
  {
    accessorKey: 'crossEntropy',
    header: 'Cross-Entropy',
  },
];

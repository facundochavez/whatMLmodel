import { ColumnDef } from '@tanstack/react-table';
import { ClassificationMetrics } from '../types';

const columnsClassification: ColumnDef<ClassificationMetrics>[] = [
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

export default columnsClassification;
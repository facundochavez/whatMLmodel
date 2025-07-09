import { ClassificationMetrics } from '@/types/performanceMetrics.types';
import { ColumnDef } from '@tanstack/react-table';

type StrictClassificationColumn = ColumnDef<ClassificationMetrics> & {
  accessorKey: keyof ClassificationMetrics;
};

const columnsClassification: StrictClassificationColumn[] = [
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

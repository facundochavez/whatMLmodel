export interface View {
  id?: string;
  title?: string;
  isFavorite?: boolean;
}

export type ProblemType =
  | 'regression'
  | 'classification'
  | 'clustering'
  | 'dimensionalityReduction';
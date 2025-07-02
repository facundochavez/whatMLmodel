export interface View {
  id?: string;
  title?: string;
  isFavorite?: boolean;
}

export interface Collaborator {
  name: string;
  nick: string;
  url: string;
};

export type ProblemType =
  | 'regression'
  | 'classification'
  | 'clustering'
  | 'dimensionalityReduction';
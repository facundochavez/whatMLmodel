import { ProblemType } from './components/TablesGroup/types';

export interface Pipeline {
  id?: string;
  alias?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
  isFavorite?: boolean;
  datasetDescription?: string;
  icon?: number;
  link?: {
    platform: string;
    url: string;
  };
  language?: string;
  info?: {
    problemDescription: string;
    mainFeatures: string;
    targetVariable: string;
    numberOfFeatures: number;
    datasetSize: number;
    hasComplexData: boolean;
  }
  recommendations?: Array<{
    title?: string;
    type: ProblemType;
    paragraph: string;
    tables: {
      modelsAliases: string[];
      similarDatasetsAliases: string[];
    };
  }>;
}

export interface View {
  id?: string;
  title?: string;
  isFavorite?: boolean;
}

export type Collaborator = {
  name: string;
  nick: string;
  url: string;
};
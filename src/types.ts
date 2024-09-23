import { ProblemType } from './components/TablesGroup/types';

export interface recentResponses {
  output: {
    alias: string;
    name: string;
  };
}

export interface ModelResponse {
  alias: string;
  name: string;
  datasetDescription: string;
  icon: number;
  link: {
    platform: string;
    href: string;
  };
  updated: boolean;
  language: string;
  info: {
    problemDescription: string;
    mainFeatures: string;
    targetVariable: string;
    numberOfFeatures: number;
    datasetSize: number;
    hasComplexData: boolean;
  }
  recomendationsTitle: string;
  recommendations: {
    type: ProblemType;
    paragraph: string;
    tables: {
      modelsAliases: string[];
      similarDatasetsAliases: string[];
    };
  }[];
}

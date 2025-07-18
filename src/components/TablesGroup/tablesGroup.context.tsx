'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProblemType } from '@/types/analysis.types';
import { Pipeline } from '@/types/pipeline.types';
import { Model } from '@/types/models.types';
import getModelsByAlias from '@/utils/getModelsByAlias';
import getPerformanceMetrics from '@/utils/getPerformanceMetrics';
import columnsRegression from './SimilarPipelinesTable/columnsRegression';
import columnsClassification from './SimilarPipelinesTable/columnsClassification';
import columnsClustering from './SimilarPipelinesTable/columnsClustering';
import columnsDimensionalityReduction from './SimilarPipelinesTable/columnsDimensionalityReduction';
import getPipelinesByAlias from '@/utils/getPipelinesByAlias';
import { RegressionModelAlias, ClassificationModelAlias, ClusteringModelAlias, DimensionalityReductionModelAlias } from '@/types/models.types';

export interface TablesGroupProps {
  type: ProblemType;
  tables: {
    modelsAlias: RegressionModelAlias[] | ClassificationModelAlias[] | ClusteringModelAlias[] | DimensionalityReductionModelAlias[];
    similarPipelinesAlias: string[];
  };
}

interface TablesGroupContextProps {
  type: ProblemType;
  similarPipelines: Pipeline[];
  models: Model[];
  performanceMetrics: any;
  columnsPerformanceMetrics: any;
  selectedSimilarPipelineIndex: string;
  setSelectedSimilarPipelineIndex: React.Dispatch<React.SetStateAction<string>>;
  dialogType: null | 'similarDataset' | 'generate';
  setDialogType: React.Dispatch<React.SetStateAction<null | 'similarDataset' | 'generate'>>;
}

const TablesGroupContext = createContext<TablesGroupContextProps | undefined>(undefined);

interface TablesGroupProviderProps extends TablesGroupProps {
  children: JSX.Element | JSX.Element[];
}

export function TablesGroupProvider({ children, type, tables }: TablesGroupProviderProps) {
  const [selectedSimilarPipelineIndex, setSelectedSimilarPipelineIndex] = useState<string>('0');
  const [similarPipelines, setSimilarPipelines] = useState<Pipeline[]>([]);
  const [dialogType, setDialogType] = useState<null | 'similarDataset' | 'generate'>(null);

  const models: Model[] = getModelsByAlias({
    type: type,
    modelsAlias: tables.modelsAlias,
  });

  const allColumnsPerformanceMetrics: Record<string, any> = {
    regression: columnsRegression,
    classification: columnsClassification,
    clustering: columnsClustering,
    dimensionalityReduction: columnsDimensionalityReduction,
  };

  const columnsPerformanceMetrics = allColumnsPerformanceMetrics[type];

  const performanceMetrics = getPerformanceMetrics({
    type,
    pipeline: similarPipelines[Number(selectedSimilarPipelineIndex)],
    modelsAlias: tables.modelsAlias,
    columns: columnsPerformanceMetrics,
  });

  useEffect(() => {
    const loadPipelines = async () => {
      const data = await getPipelinesByAlias(tables.similarPipelinesAlias);
      setSimilarPipelines(data);
    };
    loadPipelines();
  }, [tables.similarPipelinesAlias]);

  return (
    <TablesGroupContext.Provider
      value={{
        type,
        models,
        similarPipelines,
        performanceMetrics,
        columnsPerformanceMetrics,
        selectedSimilarPipelineIndex,
        setSelectedSimilarPipelineIndex,
        dialogType,
        setDialogType,
      }}
    >
      {children}
    </TablesGroupContext.Provider>
  );
}

export const useTablesGroupContext = () => {
  const context = useContext(TablesGroupContext);
  if (!context) {
    throw new Error('useTablesGroupContext must be used within a TablesGroupProvider');
  }
  return context;
};

export default TablesGroupProvider;

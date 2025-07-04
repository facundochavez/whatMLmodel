import React, { createContext, useContext, useState, useEffect } from 'react';
import { Model, ProblemType, SimilarDataset, TablesProps } from './types';
import getModelsByAlias from '@/utils/getModelsByAlias';
import getSimilarDatasets from '@/utils/getSimilarDatasets';
import getPerformanceMetrics from '@/utils/getPerformanceMetrics';
import columnsRegression from './SimilarDatasetsTable/columnsRegression';
import columnsClassification from './SimilarDatasetsTable/columnsClassification';
import columnsClustering from './SimilarDatasetsTable/columnsClustering';
import columnsDimensionalityReduction from './SimilarDatasetsTable/columnsDimensionalityReduction';
import getPuclicPipelineByAlias from '@/utils/getPublicPipelineByAlias';
import { useAnalysesContext } from '@/context/analyses.context';

interface TablesGroupContextProps {
  type: ProblemType;
  selectedDatasetIndex: string;
  setSelectedDatasetIndex: React.Dispatch<React.SetStateAction<string>>;
  models: Model[];
  similarDatasets: SimilarDataset[];
  performanceMetrics: any;
  columnsPerformanceMetrics: Record<string, any>;
}

const TablesGroupContext = createContext<TablesGroupContextProps | undefined>(
  undefined
);

interface TablesGroupProviderProps extends TablesProps {
  children: JSX.Element | JSX.Element[];
}

export const TablesGroupProvider = ({
  children,
  type,
  tables,
}: TablesGroupProviderProps) => {
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState<string>('0');

  const models: Model[] = getModelsByAlias({
    type: type,
    modelsAlias: tables.modelsAlias,
  });

  const similarDatasets: SimilarDataset[] = getSimilarDatasets({
    similarDatasetAlias: tables.similarPipelinesAlias,
  });

  const performanceMetrics = getPerformanceMetrics({
    type: type,
    modelsAlias: tables.modelsAlias,
    datasetAlias: tables.similarPipelinesAlias[Number(selectedDatasetIndex)],
  });

  const columnsPerformanceMetrics: Record<string, any> = {
    regression: columnsRegression,
    classification: columnsClassification,
    clustering: columnsClustering,
    dimensionalityReduction: columnsDimensionalityReduction,
  };

  return (
    <TablesGroupContext.Provider
      value={{
        type,
        selectedDatasetIndex,
        setSelectedDatasetIndex,
        models,
        similarDatasets,
        performanceMetrics,
        columnsPerformanceMetrics,
      }}
    >
      {children}
    </TablesGroupContext.Provider>
  );
};

// Custom hook to use the TablesGroupContext
export const useTablesGroupContext = () => {
  const context = useContext(TablesGroupContext);
  if (!context) {
    throw new Error(
      'useTablesGroupContext must be used within a TablesGroupProvider'
    );
  }
  return context;
};

export default TablesGroupProvider;

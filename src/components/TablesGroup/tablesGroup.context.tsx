import React, { createContext, useContext, useState, useEffect } from 'react';
import { Model, ProblemType, SimilarDataset, TablesProps } from './types';
import getModels from '@/utils/getModel';
import getSimilarDatasets from '@/utils/getSimilarDatasets';
import getPerformanceMetrics from '@/utils/getPerformanceMetrics';
import columnsRegression from './SimilarDatasetsTable/columnsRegression';
import columnsClassification from './SimilarDatasetsTable/columnsClassification';
import columnsClustering from './SimilarDatasetsTable/columnsClustering';
import columnsDimensionalityReduction from './SimilarDatasetsTable/columnsDimensionalityReduction';

interface TablesGroupContextProps {
  type: ProblemType;
  selectedDataset: string;
  setSelectedDataset: React.Dispatch<React.SetStateAction<string>>;
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

export const TablesGroupProvider = ({ children, type, tables }: TablesGroupProviderProps) => {
  const [selectedDataset, setSelectedDataset] = useState<string>('0');

  const models: Model[] = getModels({
    type: type,
    modelsAliases: tables.modelsAliases,
  });

  const similarDatasets: SimilarDataset[] = getSimilarDatasets({
    similarDatasetAliases: tables.similarDatasetsAliases,
  });

  const performanceMetrics = getPerformanceMetrics({
    type: type,
    modelsAliases: tables.modelsAliases,
    datasetAlias: tables.similarDatasetsAliases[Number(selectedDataset)],
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
        selectedDataset,
        setSelectedDataset,
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

import ModelsTable from './Models/Models.table';
import getModels from '@/utils/getModel';
import { Model, ProblemType } from './types';
import columnsModels from './Models/columnsModels';

import SimilarDatasetTable from './SimilarDatasets/SimilarDataset.table';
import getSimilarDatasets from '@/utils/getSimilarDatasets';
import { SimilarDataset } from './types';
import columnsClassification from './SimilarDatasets/columnsClassification';
import columnsClustering from './SimilarDatasets/columnsClustering';
import columnsDimensionalityReduction from './SimilarDatasets/columnsDimensionalityReduction';
import columnsRegression from './SimilarDatasets/columnsRegression';

import { TablesProps } from './types';
import { useState } from 'react';
import getPerformanceMetrics from '@/utils/getPerformanceMetrics';

const TablesGroup: React.FC<TablesProps> = ({ type, tables }) => {
  const [selectedDataset, setSelectedDataset] = useState<number>(0);

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
    datasetAlias: tables.similarDatasetsAliases[selectedDataset],
  });

  const columnsPerformanceMetrics: Record<string, any> = {
    regression: columnsRegression,
    classification: columnsClassification,
    clustering: columnsClustering,
    dimensionalityReduction: columnsDimensionalityReduction,
  };

  return (
    <div className='flex gap-4 mt-2'>
      <ModelsTable columns={columnsModels} data={models} />
      <SimilarDatasetTable
        columns={columnsPerformanceMetrics[type]}
        // @ts-ignore
        data={performanceMetrics}
      />
    </div>
  );
};

export default TablesGroup;

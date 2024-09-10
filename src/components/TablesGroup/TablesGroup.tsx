import ModelsTable from './ModelsTable/Models.table';
import getModels from '@/utils/getModel';
import { Model } from './types';
import columnsModels from './ModelsTable/columnsModels';

import SimilarDatasetTable from './SimilarDatasetsTable/SimilarDataset.table';
import getSimilarDatasets from '@/utils/getSimilarDatasets';
import { SimilarDataset } from './types';
import columnsClassification from './SimilarDatasetsTable/columnsClassification';
import columnsClustering from './SimilarDatasetsTable/columnsClustering';
import columnsDimensionalityReduction from './SimilarDatasetsTable/columnsDimensionalityReduction';
import columnsRegression from './SimilarDatasetsTable/columnsRegression';

import { TablesProps } from './types';
import { useState } from 'react';
import getPerformanceMetrics from '@/utils/getPerformanceMetrics';
import DatasetSelector from './DatasetSelector/DatasetSelector';
import { Dialog } from '@/components/ui/dialog';
import SimilarDatasetDialogContent from '../DialogContents/SimilarDataset.dialogContent';

const TablesGroup: React.FC<TablesProps> = ({ type, tables }) => {
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
    <Dialog>
      <div className='flex flex-col gap-3 my-8'>
        <DatasetSelector
          similarDatasets={similarDatasets}
          setSelectedDataset={setSelectedDataset}
        />
        <div className='flex gap-4'>
          <ModelsTable columns={columnsModels(type)} data={models} />
          <SimilarDatasetTable
            columns={columnsPerformanceMetrics[type]}
            // @ts-ignore
            data={performanceMetrics}
          />
        </div>
      </div>
      <SimilarDatasetDialogContent />
    </Dialog>
  );
};

export default TablesGroup;

import getModels from '@/utils/getModel';
import { columnsModels, Model } from './Models/columnsModels';
import { columnsClassification } from './SimilarDatasets/columnsClassification';
import { columnsClustering } from './SimilarDatasets/columnsClustering';
import { columnsDimensionalityReduction } from './SimilarDatasets/columnsDimensionalityReduction';
import { columnsRegression } from './SimilarDatasets/columnsRegression';
import ModelsTable from './Models/Models.table';
import SimilarDatasetsTable from './SimilarDatasets/SimilarDatasets.table';

interface TablesProps {
  type: string;
  tables: {
    models: string[];
    similarDatasets: string[];
  };
}

const Tables: React.FC<TablesProps> = ({ type, tables }) => {
  const models: Model[] = getModels({
    type: type,
    aliases: tables.models,
  });

  const columnsSimilarDatasets = {
    regression: columnsRegression,
    classification: columnsClassification,
    clustering: columnsClustering,
    dimensionalityReduction: columnsDimensionalityReduction,
  };

  return (
    <div className='flex gap-4 mt-2'>
      <ModelsTable columns={columnsModels} data={models} />
      <SimilarDatasetsTable columns={columnsSimilarDatasets[type]} data={models} />
    </div>
  );
};

export default Tables;

import ModelsTable from './ModelsTable/Models.table';
import SimilarDatasetTable from './SimilarDatasetsTable/SimilarDataset.table';
import { TablesProps } from './types';
import DatasetSelector from './DatasetSelector/DatasetSelector';
import ModelsAccordion from './ModelsAccordion/Models.accordion';
import { useGlobalStore } from '@/store/globals.store'; // ✅ Usamos el nuevo store

const TablesGroup: React.FC<TablesProps> = ({ type, tables }) => {
  const isMobile = useGlobalStore((state) => state.isMobile); // ✅ Lo obtenemos del store global
  return (
    <div className='flex flex-col gap-3 my-8'>
      <DatasetSelector />
      {isMobile ? (
        <ModelsAccordion />
      ) : (
        <div className='flex gap-4'>
          <ModelsTable />
          <SimilarDatasetTable />
        </div>
      )}
    </div>
  );
};

export default TablesGroup;


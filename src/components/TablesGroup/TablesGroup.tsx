import ModelsTable from './ModelsTable/Models.table';
import SimilarDatasetTable from './SimilarDatasetsTable/SimilarDataset.table';
import { TablesProps } from './types';
import DatasetSelector from './DatasetSelector/DatasetSelector';
import { useGlobalContext } from '@/context/global.context';
import ModelsAccordion from './ModelsAccordion/Models.accordion';
import TablesGroupProvider from './tablesGroup.context';

const TablesGroup: React.FC<TablesProps> = ({ type, tables }) => {
  const { isMobile } = useGlobalContext();

  return (
    <TablesGroupProvider type={type} tables={tables}>
      {isMobile ? (
        <ModelsAccordion />
      ) : (
        <div className='flex flex-col gap-3 my-8'>
          <DatasetSelector />
          <div className='flex gap-4'>
            <ModelsTable />
            <SimilarDatasetTable />
          </div>
        </div>
      )}
    </TablesGroupProvider>
  );
};

export default TablesGroup;

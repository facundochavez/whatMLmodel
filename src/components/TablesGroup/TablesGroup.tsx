import ModelsTable from './ModelsTable/Models.table';
import SimilarPipelineTable from './SimilarPipelinesTable/SimilarPipeline.table';
import PipelineSelector from './PipelineSelector/PipelineSelector';
import ModelsAccordion from './ModelsAccordion/Models.accordion';
import TablesGroupProvider, { TablesGroupProps } from './tablesGroup.context';
import { Dialog } from '@/components/ui/dialog';
import { useGlobalStore } from '@/store/global.store';

const TablesGroup: React.FC<TablesGroupProps> = ({ type, tables }) => {
  const isMobile = useGlobalStore((state) => state.isMobile);
  const onOpenChangePipelineDialog = useGlobalStore((state) => state.onOpenChangePipelineDialog);

  return (
    <Dialog onOpenChange={onOpenChangePipelineDialog}>
      <TablesGroupProvider type={type} tables={tables}>
        {isMobile ? (
          <ModelsAccordion />
        ) : (
          <div className="flex flex-col gap-3 my-8">
            <PipelineSelector />
            <div className="flex gap-4">
              <ModelsTable />
              <SimilarPipelineTable />
            </div>
          </div>
        )}
      </TablesGroupProvider>
    </Dialog>
  );
};

export default TablesGroup;

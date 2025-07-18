import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import PipelineDialogContent from '@/components/DialogContents/Pipeline.dialogContent';
import { useTablesGroupContext } from '../../tablesGroup.context';
import { useGlobalStore } from '@/store/global.store';

const ViewButton: React.FC<ButtonProps> = () => {
  const { similarPipelines, selectedSimilarPipelineIndex } = useTablesGroupContext();
  const setSelectedPipeline = useGlobalStore((state) => state.setSelectedPipeline);
  const onOpenChangePipelineDialog = useGlobalStore((state) => state.onOpenChangePipelineDialog);

  return (
    <Dialog onOpenChange={onOpenChangePipelineDialog}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-3 md:pr-4 bg-muted/30 sm:bg-background"
          onClick={() => setSelectedPipeline(similarPipelines[Number(selectedSimilarPipelineIndex)])}
        >
          <Eye className="h-[18px] w-[18px]" strokeWidth={1.8} />
          <span className="hidden xs:flex sm:hidden ml-2 md:flex">View</span>
        </Button>
      </DialogTrigger>
      <PipelineDialogContent />
    </Dialog>
  );
};

export default ViewButton;

'use client';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAnalyzesContext } from '@/context/analyzes.context';


const PipelineDialogContent: React.FC = () => {
  const { selectedPipeline } = useAnalyzesContext();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{selectedPipeline?.title}</DialogTitle>
        <DialogDescription>{selectedPipeline?.datasetDescription}</DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default PipelineDialogContent;

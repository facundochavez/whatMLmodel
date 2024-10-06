'use client';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAnalyzesContext } from '@/context/analyzes.context';
import Image from 'next/image';
import { Card } from '../ui/card';
import StillDevelopingCard from '@/components/StillDevelopingCard/StillDevelopingCard';

const PipelineDialogContent: React.FC = () => {
  const { selectedPipeline } = useAnalyzesContext();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{selectedPipeline?.title}</DialogTitle>
        <DialogDescription className='text-left'>
          {selectedPipeline?.datasetDescription}
        </DialogDescription>
      </DialogHeader>
      <h3 className='text-lg font-semibold'>Pipeline code:</h3>
      <StillDevelopingCard />
    </DialogContent>
  );
};

export default PipelineDialogContent;

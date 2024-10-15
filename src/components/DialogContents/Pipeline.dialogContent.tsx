'use client';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAnalysesContext } from '@/context/analyses.context';
import Image from 'next/image';
import { Card } from '../ui/card';
import StillDevelopingCard from '@/components/StillDevelopingCard/StillDevelopingCard';

const PipelineDialogContent: React.FC = () => {
  const { selectedPipeline } = useAnalysesContext();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{selectedPipeline?.title}</DialogTitle>
        <DialogDescription className='text-left'>
          {selectedPipeline?.info?.problemDescription}
        </DialogDescription>
      </DialogHeader>
      <h3 className='text-lg font-semibold'>Pipeline code:</h3>
      <StillDevelopingCard />
    </DialogContent>
  );
};

export default PipelineDialogContent;

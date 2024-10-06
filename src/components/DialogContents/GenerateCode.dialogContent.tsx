'use client';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StillDevelopingCard from '@/components/StillDevelopingCard/StillDevelopingCard';

const GenerateCodeDialogContent: React.FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Generate code for my problem</DialogTitle>
        <DialogDescription>This is the codign generator.</DialogDescription>
      </DialogHeader>
      <h3 className='text-lg font-semibold'>Generated code:</h3>
      <StillDevelopingCard />
    </DialogContent>
  );
};

export default GenerateCodeDialogContent;



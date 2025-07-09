'use client';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StillDevelopingCard from '@/components/StillDevelopingCard';

const GenerateCodeDialogContent: React.FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">Generate code</DialogTitle>
      </DialogHeader>
      <div className="my-10">
        <StillDevelopingCard />
      </div>
    </DialogContent>
  );
};

export default GenerateCodeDialogContent;

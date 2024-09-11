'use client';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';


const GenerateCodeDialogContent: React.FC = () => {

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Generate code</DialogTitle>
        <DialogDescription>This is the codign generator.</DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default GenerateCodeDialogContent;
'use client';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';


const SimilarDatasetDialogContent: React.FC = () => {

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dataset title</DialogTitle>
        <DialogDescription>This is the dataset description.</DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default SimilarDatasetDialogContent;

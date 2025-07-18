import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAnalysesStore } from '@/store/analyses.store';

const ConfirmDeleteDialogContent: React.FC = () => {
  const markedAnalysisId = useAnalysesStore((state) => state.markedAnalysisId);
  const deleteAnalysis = useAnalysesStore((state) => state.deleteAnalysis);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete this analysis?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Are you sure you want to permanently delete this file from our servers?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => deleteAnalysis(markedAnalysisId)}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ConfirmDeleteDialogContent;

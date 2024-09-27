import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAnalyzesContext } from '@/context/analyzes.context';

const ConfirmDeleteDialogContent: React.FC = () => {
  const { selectedAnalysisId, handleDeleteAnalysis } = useAnalyzesContext();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to delete this analysis?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => handleDeleteAnalysis(selectedAnalysisId as string)}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ConfirmDeleteDialogContent;

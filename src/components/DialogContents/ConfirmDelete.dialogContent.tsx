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
import { useGlobalContext } from '@/context/global.context';

const ConfirmDeleteDialogContent: React.FC = () => {
  const { selectedAnalysisId } = useGlobalContext();
  const { deleteAnalysis } = useAnalyzesContext();
  
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
        <AlertDialogAction onClick={() => deleteAnalysis(selectedAnalysisId)}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ConfirmDeleteDialogContent;

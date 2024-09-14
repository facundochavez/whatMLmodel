import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ConfirmDeleteDialogContent: React.FC = () => {
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
        <AlertDialogAction>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ConfirmDeleteDialogContent;

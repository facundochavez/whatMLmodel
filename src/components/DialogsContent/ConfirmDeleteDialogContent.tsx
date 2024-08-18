import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmDeleteDialogProps {
  children?: React.ReactNode;
}

const ConfirmDeleteDialogContent: React.FC<ConfirmDeleteDialogProps> = ({
  children,
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you sure you want to delete this analysis?
        </DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant='outline' type='button'>
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type='submit'>Delete</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default ConfirmDeleteDialogContent;

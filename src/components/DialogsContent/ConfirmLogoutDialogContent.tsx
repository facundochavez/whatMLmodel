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

const ConfirmLogoutDialogContent: React.FC<ConfirmDeleteDialogProps> = ({
  children,
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <DialogDescription>
          You will be signed out of your account. Any unsaved changes may be
          lost. Please confirm if you want to proceed with logging out.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant='outline' type='button'>
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type='submit'> Log out</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default ConfirmLogoutDialogContent;

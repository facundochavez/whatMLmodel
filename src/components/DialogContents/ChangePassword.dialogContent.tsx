'use client';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import ChangePasswordForm from '@/components/Forms/ChangePassword.form';

const ChangePasswordDialogContent: React.FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change password</DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <ChangePasswordForm />
      </DialogFooter>
    </DialogContent>
  );
};

export default ChangePasswordDialogContent;

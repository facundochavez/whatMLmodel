'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGlobalContext } from '@/context/global.context';

const AccountSettingsDialogContent: React.FC = () => {
  const { userEmail, setShowChangePasswordDialog, setShowApiKeyDialog } = useGlobalContext();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Account settings</DialogTitle>
      </DialogHeader>

      <ul className="flex flex-col gap-2 [&>li]:relative [&>li]:flex [&>li]:flex-col [&>li]:gap-2 [&>li>label]:text-base  [&>li>label]:pl-1 [&>li>input]:!opacity-100">
        <li>
          <Label>Email</Label>
          <Input type="email" disabled value={userEmail} />
        </li>

        <li>
          <Label>Password</Label>
          <Input type="password" disabled value={'********'} />
          <DialogClose asChild>
            <Button onClick={() => setShowChangePasswordDialog(true)} variant="link" size="sm" className="absolute right-0 top-8 pt-1">
              Change password
            </Button>
          </DialogClose>
        </li>

        <li>
          <Label>Gemini API key</Label>
          <Input type="password" disabled value={'********'} />
          <DialogClose asChild>
            <Button onClick={() => setShowApiKeyDialog(true)} variant="link" size="sm" className="absolute right-0 top-8 pt-1">
              Change API key
            </Button>
          </DialogClose>
        </li>
      </ul>
      <DialogFooter>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default AccountSettingsDialogContent;

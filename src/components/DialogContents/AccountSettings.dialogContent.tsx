'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ApiKeyDialogContent from '@/components/DialogContents/ApiKey.dialogContent';
import ChangePasswordDialogContent from '@/components/DialogContents/ChangePassword.dialogContent';
import { useGlobalContext } from '@/context/global.context';

const AccountSettingsDialogContent: React.FC = () => {
  const {userEmail} = useGlobalContext();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Account settings</DialogTitle>
      </DialogHeader>

      <ul className='flex flex-col gap-2 [&>li]:relative [&>li]:flex [&>li]:flex-col [&>li]:gap-2 [&>li>label]:text-base  [&>li>label]:pl-1 [&>li>input]:!opacity-100'>
        <li>
          <Label>Email</Label>
          <Input type='email' disabled value={userEmail} />
        </li>

        <li>
          <Label>Password</Label>
          <Input type='password' disabled value={'********'} />
          <Dialog>
            <DialogTrigger>
              <Button
                variant='link'
                size='sm'
                className='absolute right-0 top-8 pt-1'
              >
                Change password
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ChangePasswordDialogContent />
            </DialogContent>
          </Dialog>
        </li>

        <li>
          <Label>Gemini API key</Label>
          <Input type='password' disabled value={'********'} />
          <Dialog>
            <DialogTrigger>
              <Button
                variant='link'
                size='sm'
                className='absolute right-0 top-8 pt-1'
              >
                Change API key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ApiKeyDialogContent />
            </DialogContent>
          </Dialog>
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

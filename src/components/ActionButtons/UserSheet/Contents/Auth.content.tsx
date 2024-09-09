import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AuthDialogContent from '@/components/DialogsContents/Auth.dialogContent';
import { Button } from '@/components/ui/button';
import { LogIn, UserRoundPlus } from 'lucide-react';

const AuthContent: React.FC = () => {
  return (
    <div className='h-full flex flex-col justify-center gap-2 items-center text-center'>
      <h2 className='text-lg font-semibold'>Get Started</h2>
      <span className='flex items-center text-muted-foreground text-sm mb-6'>Please log in or register to access the AI features.</span>
      <Dialog>
        <footer className='w-full flex flex-col gap-2'>
          <DialogTrigger asChild>
            <Button className='w-full'>
              <LogIn className='mr-2 h-4 w-4' />
              <span>Log in</span>
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button className='w-full' variant='outline'>
              <UserRoundPlus className='mr-2 h-4 w-4' />
              <span>Register</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AuthDialogContent />
          </DialogContent>
        </footer>
      </Dialog>
    </div>
  );
};

export default AuthContent;

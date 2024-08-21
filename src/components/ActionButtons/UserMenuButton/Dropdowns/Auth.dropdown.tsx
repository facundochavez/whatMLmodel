import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, UserRoundPlus } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AuthDialogContent from '@/components/DialogsContents/Auth.dialogContent';

interface AuthDropdownProps {
  children?: React.ReactNode;
}

const AuthDropdown: React.FC<AuthDropdownProps> = ({ children }) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='min-w-36'>
          <DialogTrigger className='w-full'>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => {}}>
                <LogIn className='mr-2 h-4 w-4' />
                <span>Log in</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => {}}>
                <UserRoundPlus className='mr-2 h-4 w-4' />
                <span>Register</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AuthDialogContent />
    </Dialog>
  );
};

export default AuthDropdown;

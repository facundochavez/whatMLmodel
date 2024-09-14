import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, UserRound, UserRoundPlus } from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useGlobalContext } from '@/context/global.context';

const AuthDropdown: React.FC = () => {
  const { setIsUserRegistering } = useGlobalContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='bg-transparent'>
          <UserRound className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='min-w-36 z-[150]'>
        <DialogTrigger className='w-full'>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setIsUserRegistering(false);
              }}
            >
              <LogIn className='mr-2 h-4 w-4' />
              <span>Log in</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setIsUserRegistering(true);
              }}
            >
              <UserRoundPlus className='mr-2 h-4 w-4' />
              <span>Register</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthDropdown;

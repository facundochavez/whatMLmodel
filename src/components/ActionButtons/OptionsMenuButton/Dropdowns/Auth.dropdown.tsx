import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, UserRound, UserRoundPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGlobalContext } from '@/context/global.context';

const AuthDropdown: React.FC = () => {
  const { setIsUserRegistering, setShowAuthDialog } = useGlobalContext();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='bg-transparent'>
          <UserRound className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='min-w-36 z-[150]'>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setIsUserRegistering(false);
                setShowAuthDialog(true);
              }}
            >
              <LogIn className='mr-2 h-4 w-4' />
              <span>Log in</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setIsUserRegistering(true);
                setShowAuthDialog(true);
              }}
            >
              <UserRoundPlus className='mr-2 h-4 w-4' />
              <span>Register</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthDropdown;

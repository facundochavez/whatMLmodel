import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogIn, UserRound, UserRoundPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/store/global.store';

const AuthDropdown: React.FC = () => {
  const setIsUserRegistering = useGlobalStore((state) => state.setIsUserRegistering);
  const setShowAuthDialog = useGlobalStore((state) => state.setShowAuthDialog);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <UserRound className="h-5 w-5" strokeWidth={1.8} />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-36 z-[150]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setIsUserRegistering(false);
              setShowAuthDialog(true);
            }}
            className="font-semibold"
          >
            <LogIn className="mr-2 h-4 w-4" />
            <span>Log in</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setIsUserRegistering(true);
              setShowAuthDialog(true);
            }}
            className="font-semibold"
          >
            <UserRoundPlus className="mr-2 h-4 w-4" />
            <span>Register</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthDropdown;

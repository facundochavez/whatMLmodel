import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogIn, UserRoundPlus } from 'lucide-react';
import { SheetClose } from '@/components/ui/sheet';
import { useGlobalStore } from '@/store/global.store';

const AuthSheetContent: React.FC = () => {
  const setShowAuthDialog = useGlobalStore((state) => state.setShowAuthDialog);
  const setIsUserRegistering = useGlobalStore((state) => state.setIsUserRegistering);

  return (
    <div className="h-full flex flex-col justify-center gap-2 items-center text-center">
      <h2 className="text-lg font-semibold">Get Started</h2>
      <span className="flex items-center text-muted-foreground text-sm mb-6">Please log in or register to access the AI features.</span>

      <footer className="w-full flex flex-col gap-2">
        <SheetClose className="w-full" asChild>
          <Button
            className="w-full"
            onClick={() => {
              setIsUserRegistering(false);
              setShowAuthDialog(true);
            }}
          >
            <LogIn className="mr-2 h-4 w-4" />
            <span>Log in</span>
          </Button>
        </SheetClose>

        <DialogTrigger className="w-full" asChild>
          <Button
            className="w-full"
            variant="outline"
            type="button"
            onClick={() => {
              setIsUserRegistering(true);
              setShowAuthDialog(true);
            }}
          >
            <UserRoundPlus className="mr-2 h-4 w-4" />
            <span>Register</span>
          </Button>
        </DialogTrigger>
      </footer>
    </div>
  );
};

export default AuthSheetContent;

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from '@/components/ui/sheet';

import { Menu } from 'lucide-react';
import GitHubLink from '../GitHubLink/GitHubLink';
import ShareButton from '../ShareButton/ShareButton';
import ModeToggle from '../ModeToggle/ModeToggle';
import AuthSheetContent from './SheetContents/Auth.sheetContent';
import UserSheetContent from './SheetContents/User.sheetContent';
import { useGlobalContext } from '@/context/global.context';

const OptionsSheet: React.FC = () => {
  const { isUserLoggedIn } = useGlobalContext();
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant='outline' size='icon' className='bg-transparent'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col h-full max-w-[350px] z-[150]'>
        <SheetHeader>
          <div className='flex gap-2 justify-end flex-shrink-0'>
            <GitHubLink />
            <ShareButton />
            <ModeToggle />
          </div>
        </SheetHeader>
        {!isUserLoggedIn ? <AuthSheetContent /> : <UserSheetContent />}
      </SheetContent>
    </Sheet>
  );
};

export default OptionsSheet;

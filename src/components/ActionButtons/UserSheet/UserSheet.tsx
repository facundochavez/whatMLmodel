import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';
import { useState } from 'react';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';

import { Menu } from 'lucide-react';
import GitHubLink from '../GitHubLink/GitHubLink';
import ShareButton from '../ShareButton/ShareButton';
import ModeToggle from '../ModeToggle/ModeToggle';
import AuthContent from './Contents/Auth.content';
import UserContent from './Contents/User.content';

const UserSheet: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  return (
    <>
      <SheetTrigger >
        <Button variant='outline' size='icon'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <div className='flex gap-2 justify-end'>
            <GitHubLink />
            <ShareButton />
            <ModeToggle />
          </div>
        </SheetHeader>
        {!isLoggedIn ? <AuthContent /> : <UserContent />}
      </SheetContent>
      </>
  );
};

export default UserSheet;

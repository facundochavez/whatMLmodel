import { useState, useEffect } from 'react';

import ModeToggle from './ModeToggle/ModeToggle';
import UserMenuButton from './UserMenuButton/UserMenuButton';
import ShareButton from './ShareButton/ShareButton';
import GitHubLink from './GitHubLink/GitHubLink';
import UserSheet from './UserSheet/UserSheet';

import { Dialog } from '@/components/ui/dialog';
import { AlertDialog } from '@/components/ui/alert-dialog';
import AuthDialogContent from '@/components/DialogsContents/Auth.dialogContent';
import ConfirmLogoutDialogContent from '../DialogsContents/ConfirmLogout.dialogContent';
import ConfirmDeleteDialogContent from '../DialogsContents/ConfirmDelete.dialogContent';
import { Sheet } from '@/components/ui/sheet';

const ActionButtons: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      {isMobile ? (
        <UserSheet isLoggedIn={isLoggedIn} />
      ) : (
        <aside className='flex gap-2'>
          <GitHubLink />
          <ShareButton />
          <ModeToggle />
          <UserMenuButton isLoggedIn={isLoggedIn} />
        </aside>
      )}
    </Sheet>
  );
};

export default ActionButtons;

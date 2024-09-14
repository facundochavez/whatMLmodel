import { useState, useEffect } from 'react';

import ModeToggle from './ModeToggle/ModeToggle';
import OptionsMenuButton from './OptionsMenuButton/OptionsMenuButton';
import ShareButton from './ShareButton/ShareButton';
import GitHubLink from './GitHubLink/GitHubLink';
import OptionsSheet from './OptionsSheet/OptionsSheet';
import { Dialog, DialogOverlay } from '@/components/ui/dialog';
import { AlertDialog } from '@/components/ui/alert-dialog';
import AuthDialogContent from '@/components/DialogContents/Auth.dialogContent';
import ConfirmLogoutDialogContent from '../DialogContents/ConfirmLogout.dialogContent';
import AccountSettingsDialogContent from '../DialogContents/AccountSettings.dialogContent';
import useIsMobile from '@/hooks/useIsMobile';
import { useGlobalContext } from '@/context/global.context';

const ActionButtons: React.FC = () => {
  const { showDialog, setShowDialog, isUserLoggedIn } = useGlobalContext();
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialog>
        {isMobile ? (
          <OptionsSheet isUserLoggedIn={isUserLoggedIn} />
        ) : (
          <aside className='flex gap-2'>
            <GitHubLink />
            <ShareButton />
            <ModeToggle />
            <OptionsMenuButton isUserLoggedIn={isUserLoggedIn} />
          </aside>
        )}
        <ConfirmLogoutDialogContent />
      </AlertDialog>
      <DialogOverlay />
      {!isUserLoggedIn ? <AuthDialogContent /> : <AccountSettingsDialogContent />}
    </Dialog>
  );
};

export default ActionButtons;

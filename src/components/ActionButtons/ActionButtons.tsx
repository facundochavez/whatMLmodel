import { useState, useEffect } from 'react';
import ModeToggle from './ModeToggle/ModeToggle';
import OptionsMenuButton from './OptionsMenuButton/OptionsMenuButton';
import ShareButton from './ShareButton/ShareButton';
import GitHubLink from './GitHubLink/GitHubLink';
import OptionsSheet from './OptionsSheet/OptionsSheet';
import { Dialog } from '@/components/ui/dialog';
import { AlertDialog } from '@/components/ui/alert-dialog';
import AuthDialogContent from '@/components/DialogContents/Auth.dialogContent';
import ConfirmLogoutDialogContent from '../DialogContents/ConfirmLogout.dialogContent';
import AccountSettingsDialogContent from '../DialogContents/AccountSettings.dialogContent';
import { useGlobalContext } from '@/context/global.context';
import ResetPasswordDialogContent from '../DialogContents/ResetPassword.dialogContent';
import ApiKeyDialogContent from '../DialogContents/ApiKey.dialogContent';
import ChangePasswordDialogContent from '../DialogContents/ChangePassword.dialogContent';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { TransitionLink } from '../TransitionLink';

const ActionButtons: React.FC = () => {
  const pathname = usePathname();
  const {
    isUserLoggedIn,
    showAccountSettingsDialog,
    showApiKeyDialog,
    showAuthDialog,
    showChangePasswordDialog,
    showResetPasswordDialog,
    setShowAccountSettingsDialog,
    setShowApiKeyDialog,
    setShowAuthDialog,
    setShowChangePasswordDialog,
    setShowResetPasswordDialog,
  } = useGlobalContext();
  const { isMobile } = useGlobalContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const OptionButtons = (
    <AlertDialog>
      {isMobile ? (
        <OptionsSheet />
      ) : (
        <aside className='flex gap-2'>
          <GitHubLink variant='secondary' />
          <ShareButton variant='secondary' />
          <ModeToggle />
          <div
            className={`-ml-2 w-0 overflow-hidden duration-200 cubic-bezier(0,.78,.58,1.02) ${
              pathname === '/analysis' && 'md:w-[138px] md:ml-0'
            }`}
          >
            <TransitionLink href='/'>
              <Button className='hidden md:flex' variant='secondary'>
                <CirclePlus className='mr-2 h-4 w-4' />
                <span>New analysis</span>
              </Button>
            </TransitionLink>
          </div>
          <OptionsMenuButton />
        </aside>
      )}
      <ConfirmLogoutDialogContent />
    </AlertDialog>
  );

  return (
    <Dialog
      open={showResetPasswordDialog}
      onOpenChange={setShowResetPasswordDialog}
    >
      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <Dialog
          open={showChangePasswordDialog}
          onOpenChange={setShowChangePasswordDialog}
        >
          {!isUserLoggedIn ? (
            <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
              {OptionButtons}
              <AuthDialogContent />
            </Dialog>
          ) : (
            <Dialog
              open={showAccountSettingsDialog}
              onOpenChange={setShowAccountSettingsDialog}
            >
              {OptionButtons}
              <AccountSettingsDialogContent />
            </Dialog>
          )}
          <ChangePasswordDialogContent />
        </Dialog>
        <ApiKeyDialogContent />
      </Dialog>
      <ResetPasswordDialogContent />
    </Dialog>
  );
};

export default ActionButtons;

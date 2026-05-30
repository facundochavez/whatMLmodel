'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ApiKeyForm from '@/components/Forms/ApiKey.form';
import { useGlobalStore } from '@/store/global.store';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ApiKeyDialog: React.FC = () => {
  const [isCheckingApiKey, setIsCheckingApiKey] = useState(false);
  const [showDeleteApiKeyConfirm, setShowDeleteApiKeyConfirm] = useState(false);
  const showApiKeyDialog = useGlobalStore((state) => state.showApiKeyDialog);
  const setShowApiKeyDialog = useGlobalStore((state) => state.setShowApiKeyDialog);
  const geminiErrorOccurred = useGlobalStore((state) => state.geminiErrorOccurred);
  const userGeminiApiKey = useGlobalStore((state) => state.userGeminiApiKey);
  const availableFreeAnalyses = useGlobalStore((state) => state.availableFreeAnalyses);
  const setUserGeminiApiKey = useGlobalStore((state) => state.setUserGeminiApiKey);

  const isDialogOpen = showApiKeyDialog || showDeleteApiKeyConfirm;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (isCheckingApiKey) return;
      setShowApiKeyDialog(false);
      setShowDeleteApiKeyConfirm(false);
    }
  };

  const handleInteractOutside = (event: Event) => {
    if (showDeleteApiKeyConfirm) {
      event.preventDefault();
      handleCancelDeleteApiKey();
      return;
    }
    if (isCheckingApiKey) {
      event.preventDefault();
    }
  };

  const handleEscapeKeyDown = (event: KeyboardEvent) => {
    if (showDeleteApiKeyConfirm) {
      event.preventDefault();
      handleCancelDeleteApiKey();
      return;
    }
    if (isCheckingApiKey) {
      event.preventDefault();
    }
  };

  const openDeleteApiKeyConfirm = () => {
    setShowDeleteApiKeyConfirm(true);
    setShowApiKeyDialog(false);
  };

  const handleCancelDeleteApiKey = () => {
    setShowDeleteApiKeyConfirm(false);
    setShowApiKeyDialog(true);
  };

  const handleDeleteApiKey = () => {
    setUserGeminiApiKey('');
    setShowDeleteApiKeyConfirm(false);
    setShowApiKeyDialog(false);
    toast(<span className="text-center text-base">API key deleted successfully!</span>);
  };

  const getDescription = (): string => {
    if (geminiErrorOccurred) {
      if (userGeminiApiKey.trim() !== '') {
        return 'Your saved Gemini API key could not be used—it may have been revoked, expired, or hit its quota. Update it below with a new key from Google AI Studio to continue using whatMLmodel.';
      }
      if (availableFreeAnalyses > 0) {
        return 'Gemini servers are currently under heavy load. You can wait and try again later, or enter your own Gemini API key to continue right away. Don’t worry—it’s free to get one. Your key will be stored locally and never shared.';
      }
      return 'Your free analyses have run out, but you can keep using whatMLmodel by entering your Gemini API key. Don’t worry—it’s free to get one. Your key will be stored locally and never shared.';
    } else {
      if (userGeminiApiKey.trim() !== '') {
        return 'You’ve successfully entered your Gemini API key, and it’s working correctly. It’s stored locally in your browser and is never shared externally.';
      } else if (availableFreeAnalyses > 0) {
        return 'You still have free analyses available, but we recommend entering your own Gemini API key for better performance. Don’t worry—it’s free to get one. Your key will be stored locally and never shared.';
      } else {
        return 'Your free analyses have run out, but you can keep using whatMLmodel by entering your Gemini API key. Don’t worry—it’s free to get one. Your key will be stored locally and never shared.';
      }
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          'max-w-[35rem]',
          isCheckingApiKey && !showDeleteApiKeyConfirm && '[&>button]:pointer-events-none [&>button]:opacity-40'
        )}
        onInteractOutside={handleInteractOutside}
        onEscapeKeyDown={handleEscapeKeyDown}
      >
        {showDeleteApiKeyConfirm ? (
          <div >
            <DialogHeader>
              <DialogTitle>Delete API key from local storage?</DialogTitle>
              <DialogDescription>
                Your Gemini API key will be removed from this browser. You can add it again at any time.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={handleCancelDeleteApiKey}>
                Cancel
              </Button>
              <Button type="button" onClick={handleDeleteApiKey}>
                Delete
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="duration-0 animate-none flex flex-col gap-2">
            <DialogHeader>
              <DialogTitle>Gemini API key</DialogTitle>
              <DialogDescription>{getDescription()}</DialogDescription>
            </DialogHeader >
            {(userGeminiApiKey.trim() === '' || geminiErrorOccurred) && (
              <>
                <h2 className="mb-2">How to get one:</h2>
                <ul className="flex flex-col gap-1 text-muted-foreground text-sm -mt-4 mb-2">
                  <li>
                    1. Sign in or create an account on{' '}
                    <a
                      href="https://aistudio.google.com/"
                      target="_blank"
                      className="underline hover:text-primary"
                    >
                      Google AI Studio
                    </a>
                    .
                  </li>
                  <li>
                    2. In the control panel, open <strong>Get API Key</strong> and accept the terms and conditions.
                  </li>
                  <li>
                    3. Click <strong>Create API Key</strong> in the top-right corner.
                  </li>
                  <li>
                    4. Enter a key name, select <strong>Create Project</strong>, name your project, and then click{' '}
                    <strong>Create project</strong> and <strong>Create key</strong>.
                  </li>
                  <li>
                    5. Copy the generated API key from the table and paste it into the field below:
                  </li>
                </ul>
              </>
            )}

            {userGeminiApiKey.trim() !== '' && (
              <Button
                variant="link"
                className="sm:ml-auto -mb-6 self-center sm:self-end mb-2 sm:mb-0"
                disabled={isCheckingApiKey}
                onClick={openDeleteApiKeyConfirm}
              >
                Delete API key from local storage
              </Button>
            )}

            <DialogFooter>
              <ApiKeyForm isCheckingApiKey={isCheckingApiKey} onCheckingChange={setIsCheckingApiKey} />
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;

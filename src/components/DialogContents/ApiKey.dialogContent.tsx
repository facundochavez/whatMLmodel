'use client';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ApiKeyForm from '@/components/Forms/ApiKey.form';
import { useGlobalStore } from '@/store/global.store';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const ApiKeyDialogContent: React.FC = () => {
  const geminiErrorOccurred = useGlobalStore((state) => state.geminiErrorOccurred);
  const userGeminiApiKey = useGlobalStore((state) => state.userGeminiApiKey);
  const availableFreeAnalyses = useGlobalStore((state) => state.availableFreeAnalyses);
  const setUserGeminiApiKey = useGlobalStore((state) => state.setUserGeminiApiKey);
  const setShowApiKeyDialog = useGlobalStore((state) => state.setShowApiKeyDialog);

  const getDescription = (): string => {
    if (geminiErrorOccurred) {
      if (userGeminiApiKey.trim() !== '') {
        return 'Gemini servers are currently experiencing high demand. Please try again later, or use a Pro account API key to continue using whatMLmodel without interruptions.';
      } else {
        return 'Gemini servers are currently under heavy load. You can wait and try again later, or enter your own Gemini API key to continue right away. Don’t worry—it’s free to get one. Your key will be stored locally and never shared.';
      }
    } else {
      if (userGeminiApiKey.trim() !== '') {
        return 'You’ve successfully entered your Gemini API key, and it’s working correctly. It’s stored locally in your browser and is never shared externally.';
      } else if (availableFreeAnalyses > 0) {
        return 'You still have free tokens available, but we recommend entering your own Gemini API key for better performance. Don’t worry—it’s free to get one. Your key will be stored locally and never shared.';
      } else {
        return 'Your free tokens have run out, but you can keep using whatMLmodel by entering your Gemini API key. Don’t worry—it’s free to get one. Your key will be stored locally and never shared.';
      }
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Gemini API key</DialogTitle>
        <DialogDescription>{getDescription()}</DialogDescription>
      </DialogHeader>
      {geminiErrorOccurred ||
        (userGeminiApiKey.trim() === '' && (
          <>
            <h2>How to get one:</h2>
            <ul className="flex flex-col gap-1 text-muted-foreground text-sm -mt-4">
              <li>
                1. Sign up or log in to{' '}
                <a href="https://aistudio.google.com/" target="_blank" className="underline hover:text-primary">
                  Google AI Studio
                </a>
                .
              </li>
              <li>2. Click the "Get API Key" button at the top of the page, or open the menu and select "Get API Key".</li>
              <li>3. Copy the API key displayed in the table below and paste it into the following field:</li>
            </ul>
          </>
        ))}

      {userGeminiApiKey.trim() !== '' && (
        <Button
          variant="link"
          className="sm:ml-auto -mb-6"
          onClick={() => {
            setUserGeminiApiKey('');
            setShowApiKeyDialog(false);
            toast(<span className='text-center text-base'>API key deleted successfully!</span>);
          }}
        >
          Delete API key from local storage
        </Button>
      )}

      <DialogFooter>
        <ApiKeyForm />
      </DialogFooter>
    </DialogContent>
  );
};

export default ApiKeyDialogContent;

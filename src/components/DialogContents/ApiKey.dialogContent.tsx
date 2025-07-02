'use client';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ApiKeyForm from '@/components/Forms/ApiKey.form';

const ApiKeyDialogContent: React.FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Gemini API key</DialogTitle>
        <DialogDescription>
          Your free tokens are over, but you can continue using whatMLmodel by
          entering your Gemini API key. Don&apos;t worry, getting one is also free.
        </DialogDescription>
      </DialogHeader>
      <h2>How to get it:</h2>
      <ul className='flex flex-col gap-1 text-muted-foreground text-sm -mt-4'>
        <li>
          1. Sign up or log in to your Gemini account on the{' '}
          <a
            href='https://gemini.google.com/'
            target='_blank'
            className='underline hover:text-primary'
          >
            Gemini website
          </a>
          .
        </li>
        <li>
          2. Go to your profile and select &quot;Account Settings,&quot; then navigate to
          &quot;API&quot; settings.
        </li>
        <li>
          3. Click &quot;Create API Key,&quot; set the permissions, and enable two-factor
          authentication (if needed).
        </li>
        <li>
          4. Copy the API key, then confirm the creation via the email Gemini
          sends you.
        </li>
      </ul>
      <DialogFooter>
        <ApiKeyForm />
      </DialogFooter>
    </DialogContent>
  );
};

export default ApiKeyDialogContent;

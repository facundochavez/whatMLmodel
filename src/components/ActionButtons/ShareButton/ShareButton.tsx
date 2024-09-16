import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

const ShareButton: React.FC = () => {
  function shareApp() {
    navigator.share({
      title: 'whatMLmodel application',
      url: 'https://whatmlmodel.vercel.app/',
    });
  }

  return (
    <Button onClick={shareApp} variant='secondary' size='icon'>
      <Share2 className='h-5 w-5' strokeWidth={1.6} />
      <span className='sr-only'>Share</span>
    </Button>
  );
};

export default ShareButton;

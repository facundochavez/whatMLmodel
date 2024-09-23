'use client';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { ButtonProps } from '@/components/ui/button';

const ShareButton: React.FC<ButtonProps> = ({...props}) => {
  function shareApp() {
    navigator.share({
      title: 'whatMLmodel application',
      url: 'https://whatmlmodel.vercel.app/',
    });
  }

  return (
    <Button onClick={shareApp} size='icon' {...props}>
      <Share2 className='h-5 w-5' strokeWidth={1.6} />
      <span className='sr-only'>Share</span>
    </Button>
  );
};

export default ShareButton;

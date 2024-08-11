import { Button } from '@/components/ui/button';
import { Github, Share2 } from 'lucide-react';

const CTAs = () => {
  function shareApp() {
    navigator.share({
      title: 'whatMLmodel appication',
      url: 'https://whatmlmodel.vercel.app/',
    });
  }
  return (
    <>
      <Button
        onClick={() =>
          window.open('https://github.com/facundochavez/whatMLmodel', '_blank')
        }
        variant='secondary'
        size='icon'
      >
        <Github className='h-[1.2rem] w-[1.2rem]' />
        <span className='sr-only'>Link to GitHub repository</span>
      </Button>
      <Button onClick={shareApp} variant='secondary' size='icon'>
        <Share2 className='h-[1.2rem] w-[1.2rem]' />
        <span className='sr-only'>Share</span>
      </Button>
    </>
  );
};

export default CTAs;

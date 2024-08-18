import { Button } from '@/components/ui/button';
import { Github, Share2 } from 'lucide-react';
import ModeToggle from './ModeToggle/ModeToggle';
import UserMenuButton from './UserMenuButton/UserMenuButton';

const ActionButtons: React.FC = () => {
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
        <Github className='h-5 w-5' />
        <span className='sr-only'>Link to GitHub repository</span>
      </Button>
      <Button onClick={shareApp} variant='secondary' size='icon'>
        <Share2 className='h-5 w-5' />
        <span className='sr-only'>Share</span>
      </Button>
      <ModeToggle />
      <UserMenuButton />
    </>
  );
};

export default ActionButtons;

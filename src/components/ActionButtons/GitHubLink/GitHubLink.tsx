import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

const GitHubLink: React.FC = () => {
  function shareApp() {
    navigator.share({
      title: 'whatMLmodel application',
      url: 'https://whatmlmodel.vercel.app/',
    });
  }

  return (
    <Button
      onClick={() =>
        window.open('https://github.com/facundochavez/whatMLmodel', '_blank')
      }
      variant='secondary'
      size='icon'
    >
      <Github className='h-5 w-5'  strokeWidth={1.8} />
      <span className='sr-only'>Link to GitHub repository</span>
    </Button>
  );
};

export default GitHubLink;

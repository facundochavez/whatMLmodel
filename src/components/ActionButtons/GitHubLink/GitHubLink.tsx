'use client';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { ButtonProps } from '@/components/ui/button';

const GitHubLink: React.FC<ButtonProps> = ({ ...props }) => {
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
      size='icon'
      {...props}
    >
      <Github className='h-5 w-5'  strokeWidth={1.8} />
      <span className='sr-only'>Link to GitHub repository</span>
    </Button>
  );
};

export default GitHubLink;

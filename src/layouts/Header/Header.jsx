import { Button } from '@/components/ui/button';
import { Github, Share2 } from 'lucide-react';
import Image from 'next/image';
import ModeToggle from '@/components/ModeToggle/ModeToggle';
import CTAs from '@/components/CTAs/CTAs';

const Header = () => {
  return (
    <header className='w-full px-[5%] py-6 flex flex-col items-center sm:py-8'>
      <nav className='w-full max-w-[1000px] flex flex-col gap-3 items-center justify-between sm:flex-row'>
        <Image
          src='/wMLm-logo-light.svg'
          alt='logo'
          width={100}
          height={100}
          className='w-[280px] h-[50px] dark:hidden'
        />
        <Image
          src='/wMLm-logo-dark.svg'
          alt='logo'
          width={100}
          height={100}
          className='w-[280px] h-[50px] hidden dark:flex'
        />
        <aside className='flex gap-2'>
          <CTAs />
          <ModeToggle />
        </aside>
      </nav>
    </header>
  );
};

export default Header;

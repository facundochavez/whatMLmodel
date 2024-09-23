'use client';
import Image from 'next/image';
import ActionButtons from '@/components/ActionButtons/ActionButtons';
import { useEffect, useState } from 'react';

const Header = () => {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollOnTop, setIsScrollOnTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY <= 10) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      setLastScrollY(currentScrollY);
      if (currentScrollY <= 25) {
        setIsScrollOnTop(true);
      } else {
        setIsScrollOnTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`z-[100] w-screen px-[5%] flex justify-center fixed transition-transform ${
        !showHeader && 'translate-y-[-100%]'
      } ${!isScrollOnTop && 'border-b backdrop-blur-md bg-background/50'}`}
    >
      <nav className='w-full max-w-[1050px] flex items-start justify-between gap-4 pt-6 pb-4'>
        <div className='flex-grow'>
          <Image
            src='/wMLm-logo-light.svg'
            alt='logo'
            width={100}
            height={48}
            className='w-full max-w-[270px] h-[48px] -translate-y-2 dark:hidden cursor-pointer'
          />
          <Image
            src='/wMLm-logo-dark.svg'
            alt='logo'
            width={100}
            height={48}
            className='w-full max-w-[270px] h-[48px] hidden -translate-y-2 dark:flex cursor-pointer'
          />
        </div>
        <div className='flex-shrink-0'>
          <ActionButtons />
        </div>
      </nav>
    </header>
  );
};

export default Header;

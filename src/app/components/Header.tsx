'use client';
import Image from 'next/image';
import ActionButtons from '@/components/ActionButtons/ActionButtons';
import { useEffect, useState } from 'react';
import { TransitionLink } from '@/components/TransitionLink';

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
      if (currentScrollY <= 15) {
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
      className={`z-[100] w-screen px-[5vw] flex flex-col items-center fixed transition-transform ${!showHeader && 'translate-y-[-100%]'} ${
        !isScrollOnTop && 'border-b backdrop-blur-md bg-background/50'
      }`}
    >
      {/* NAVIGATION */}
      <nav className={`w-full max-w-[70rem] flex justify-between gap-2 pt-6 pb-4 sm:pt-8 sm:pb-6 ${isScrollOnTop && '!pb-0'}`}>
        <aside className="flex items-center max-h-10">
          {/* WMLM LOGO */}
          <div className="flex items-center max-h-10">
            <TransitionLink href="/" className="flex items-center max-h-10">
              <Image src="/wMLm-logo-dark.svg" alt="logo" width={1} height={1} className="hidden dark:flex w-full h-[48px] sm:h-[54px]" />
              <Image src="/wMLm-logo-light.svg" alt="logo" width={1} height={1} className="flex dark:hidden w-full h-[48px] sm:h-[54px]" />
            </TransitionLink>
          </div>
        </aside>

        <aside className="min-w-max">
          <ActionButtons />
        </aside>
      </nav>
    </header>
  );
};

export default Header;

'use client';
import Image from 'next/image';
import ActionButtons from '@/components/ActionButtons/ActionButtons';
import { useEffect, useState } from 'react';
import { TransitionLink } from '@/components/TransitionLink/TransitionLink';
import { ArrowLeftRight, ChevronRight, Dot } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
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
      className={`z-[100] w-screen px-[5%] flex justify-center fixed transition-transform ${
        !showHeader && 'translate-y-[-100%]'
      } ${!isScrollOnTop && 'border-b backdrop-blur-md bg-background/50'}`}
    >
      {/* NAVIGATION */}
      <nav
        className={`w-full max-w-[1050px] flex justify-between gap-2 pt-6 pb-4 sm:pt-8 sm:pb-6 ${
          isScrollOnTop && '!pb-0'
        }`}
      >
        <aside className='flex items-center max-h-10'>
          {/* FCH LOGO + DOT */}
          <div className={`flex items-center justify-end overflow-hidden h-12`}>
            <div className={`opacity-65 flex items-center duration-200 -ml-20 cubic-bezier(0,.78,.58,1.02) ${pathname === '/' && '!-ml-0'}`}>
              <a
                href='https://www.facundochavez.com'
                target='_blank'
                className={`cursor-pointer hover:opacity-70`}
              >
                <Image
                  src='/fch-logo-dark.svg'
                  alt='logo'
                  width={10}
                  height={10}
                  className='hidden dark:flex w-full max-h-[40px] sm:max-h-[44px]'
                />
                <Image
                  src='/fch-logo-light.svg'
                  alt='logo'
                  width={10}
                  height={10}
                  className='dark:hidden w-full max-h-[40px] sm:max-h-[44px]'
                />
              </a>
              <span className='mx-1.5 xs:mx-2'>/</span>
            </div>
          </div>

          {/* WMLM LOGO */}
          <div className='flex items-center max-h-10'>
            <TransitionLink
              href='/'
              className='flex items-center hover:opacity-70 cursor-pointer max-h-10'
            >
              <Image
                src='/wMLm-logo-dark.svg'
                alt='logo'
                width={1}
                height={1}
                className='hidden dark:flex w-full h-[50px] sm:h-[54px]'
              />
              <Image
                src='/wMLm-logo-light.svg'
                alt='logo'
                width={1}
                height={1}
                className='flex dark:hidden w-full h-[50px] sm:h-[54px]'
              />
            </TransitionLink>
          </div>
        </aside>

        <aside className='min-w-max'>
          <ActionButtons />
        </aside>
      </nav>
    </header>
  );
};

export default Header;

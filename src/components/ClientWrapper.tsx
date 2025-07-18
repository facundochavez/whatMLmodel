'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useGlobalStore } from '@/store/global.store';

const ClientWrapper = () => {
  const setIsMobile = useGlobalStore((state) => state.setIsMobile);
  const isAiThinking = useGlobalStore((state) => state.isAiThinking);
  const setIsAiThinking = useGlobalStore((state) => state.setIsAiThinking);
  const transitionToHomePage = useGlobalStore((state) => state.transitionToHomePage);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAiThinking) {
      const timeout = setTimeout(() => {
        setIsAiThinking(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isAiThinking]);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    main.classList.remove('page-transition');
  }, [pathname]);

/*   useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    main.classList.add('page-transition');
    setTimeout(() => {
      router.push('/');
    }, 250);
  }, [transitionToHomePage]);
 */
  return null;
};

export default ClientWrapper;

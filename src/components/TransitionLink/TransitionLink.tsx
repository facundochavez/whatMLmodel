'use client';
import { useGlobalContext } from '@/context/global.context';
import Link, { LinkProps } from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import sleep from '@/utils/sleep';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  sleepTime?: number;
  className?: string;
}

export const TransitionLink = ({
  children,
  href,
  sleepTime = 0,
  className,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsAiGeneratingInfo } = useGlobalContext();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (pathname !== href) {
      await sleep(sleepTime);
      const main = document.querySelector('main');
      if (!main) return;
      main.classList.add('page-transition');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      await sleep(200);
      router.push(href);
    }
  };

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    setIsAiGeneratingInfo(false);
    main.classList.remove('page-transition');
  }, [pathname]);

  return (
    <Link
      onClick={handleTransition}
      href={href}
      {...props}
      className={className}
    >
      {children}
    </Link>
  );
};

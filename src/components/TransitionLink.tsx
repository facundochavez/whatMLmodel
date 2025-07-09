'use client';
import Link, { LinkProps } from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import sleep from '@/utils/sleep';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  sleepTime?: number;
  className?: string;
}

export const TransitionLink = ({ children, href, sleepTime = 0, className, ...props }: TransitionLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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

  return (
    <Link onClick={handleTransition} href={href} {...props} className={className}>
      {children}
    </Link>
  );
};

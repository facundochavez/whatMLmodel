'use client';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export const TransitionLink = ({
  children,
  href,
  className,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const main = document.querySelector('main');

    if (!main) return;

    main.classList.add('page-transition');

    await sleep(200);

    router.push(href);

    await new Promise<void>((resolve) => {
      const observer = new MutationObserver(() => {
        resolve();
        observer.disconnect();
      });

      observer.observe(main, { childList: true, subtree: true });
    });

    main.classList.remove('page-transition');
  };

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

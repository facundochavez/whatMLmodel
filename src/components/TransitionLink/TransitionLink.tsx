'use client';
import { useGlobalContext } from '@/context/global.context';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

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
  const { setIsAiGeneratingInfo: setIsGeneratingInfo } = useGlobalContext();

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    //AUXILIAR PARA SIMULAR EL ESTADO DE CARGA
    setIsGeneratingInfo(true);
    await sleep(sleepTime);

    const main = document.querySelector('main');

    if (!main) return;

    main.classList.add('page-transition');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    await sleep(200);

    router.push(href);

    await new Promise<void>((resolve) => {
      const observer = new MutationObserver(() => {
        resolve();
        observer.disconnect();
      });

      observer.observe(main, { childList: true, subtree: true });
    });

    setIsGeneratingInfo(false);

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

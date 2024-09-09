import Image from 'next/image';
import ActionButtons from '@/components/ActionButtons/ActionButtons';

const Header = () => {
  return (
    <header className='w-full px-[5%] flex justify-center'>
      <nav className='w-full max-w-[1050px] flex items-start justify-between gap-4 py-6 sm:py-8'>
        <div className="flex-grow">
          <Image
            src='/wMLm-logo-light.svg'
            alt='logo'
            width={100}
            height={100}
            className='w-full max-w-[270px] h-[48px] mb-2 -translate-y-2 dark:hidden '
          />
          <Image
            src='/wMLm-logo-dark.svg'
            alt='logo'
            width={100}
            height={100}
            className='w-full max-w-[270px] h-[48px] mb-2 hidden -translate-y-2 dark:flex'
          />
        </div>
        <div className="flex-shrink-0">
          <ActionButtons />
        </div>
      </nav>
    </header>
  );
};

export default Header;

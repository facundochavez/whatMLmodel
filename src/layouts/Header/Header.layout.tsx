import Image from 'next/image';
import ActionButtons from '@/components/ActionButtons/ActionButtons';

const Header = () => {
  return (
    <header className='w-full px-[5%] py-6 flex flex-col items-center sm:py-8'>
      <nav className='w-full max-w-[1100px] flex flex-col gap-3 items-center justify-between sm:flex-row'>
        <Image
          src='/wMLm-logo-light.svg'
          alt='logo'
          width={100}
          height={100}
          className='w-[270px] h-[48px] mb-2 dark:hidden'
        />
        <Image
          src='/wMLm-logo-dark.svg'
          alt='logo'
          width={100}
          height={100}
          className='w-[270px] h-[48px] mb-2 hidden dark:flex'
        />
        <aside className='flex gap-2'>
          <ActionButtons />
        </aside>
      </nav>
    </header>
  );
};

export default Header;

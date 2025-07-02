import Image from 'next/image';
import { Card } from './ui/card';

const StillDevelopingCard = () => {
  return (
    <a
      href='https://github.com/facundochavez/whatMLmodel'
      title='Go to repo'
      target='_blank'
      rel='noreferrer'
      className='hover:opacity-80'
    >
      <Card className='flex flex-col items-center justify-center p-6 gap-2 w-fit mx-auto bg-muted/30'>
        <Image
          src='/icons/developer-animated-icon.gif'
          alt='Developer animated icon'
          width={100}
          height={100}
        />

        <p className='font-semibold text-muted-foreground text-center'>
          We&apos;re still developing this...
        </p>
      </Card>
    </a>
  );
};

export default StillDevelopingCard;

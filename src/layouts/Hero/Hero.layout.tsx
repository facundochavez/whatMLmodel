import Image from 'next/image';
import ActionButtons from '@/components/ActionButtons/ActionButtons';
import tryExamplesData from '@/data/try-examples.data.json';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
  return (
    <section
      className={`w-full flex flex-col items-center max-w-[700px] py-5 sm:py-16`}
    >
      <h2 className='text-3xl text-center text-muted-foreground font-semibold sm:text-4xl'>
        Use IA to find the machine learning model that best fits your data
      </h2>
      <div className='w-full flex gap-2 items-center flex-wrap justify-center mt-6'>
        <p className='text-[13px]'>Try with:</p>
        {tryExamplesData.map((example) => (
          <Badge
            key={example.id}
            /* onClick={() => handleDescriptionValue(example.value)} */
            variant='secondary'
            className='cursor-pointer'
          >
            {`"${example.name}..."`}
          </Badge>
        ))}
      </div>
    </section>
  );
};

export default Hero;

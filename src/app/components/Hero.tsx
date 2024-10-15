import tryExamplesData from '@/data/try-examples.data.json';
import { Badge } from '@/components/ui/badge';
import { tryingExampleService } from '@/services/tryingExampleService';
import { useAnalysesContext } from '@/context/analyses.context';

const Hero = () => {
  const { setAuxiliarAnalysisIndex } = useAnalysesContext();

  return (
    <section
      className={`w-full flex flex-col items-center max-w-[700px] pt-6 sm:pt-16 lg:pt-20`}
    >
      <h2 className='text-3xl text-center text-muted-foreground font-semibold sm:text-4xl'>
        Use AI to find the machine learning model that best fits your data
      </h2>
      <div className='w-full flex gap-2 items-center flex-wrap justify-center mt-6'>
        <p className='text-[13px]'>Try with:</p>
        {tryExamplesData.map((example, index) => (
          <Badge
            key={index}
            variant='secondary'
            className='cursor-pointer'
            onClick={() => {
              tryingExampleService.setSubject(example.value);
              setAuxiliarAnalysisIndex(index);
            }}
          >
            {`"${example.name}..."`}
          </Badge>
        ))}
      </div>
    </section>
  );
};

export default Hero;

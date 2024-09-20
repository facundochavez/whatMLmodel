import { useGlobalContext } from '@/context/global.context';
import StepOne from './Steps/StepOne.layout';
import StepThree from './Steps/StepThree.layout';
import StepTwo from './Steps/StepTwo.layout';

const Analysis = () => {
  const { currentAnalysis, selectedStep } = useGlobalContext();

  return (
    <section className='w-full flex flex-col items-center gap-8 relative'>
      {selectedStep === 1 ? (
        <div className='pt-5'>
          <StepOne />
        </div>
      ) : (
        <div className='w-full flex flex-col items-center gap-8 p-0 sm:pt-2 animate-slide-up'>
          <StepTwo />
          <StepThree />
        </div>
      )}
    </section>
  );
};

export default Analysis;

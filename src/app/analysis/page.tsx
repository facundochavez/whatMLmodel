'use client';
import StepThree from '@/app/analysis/components/StepThree';
import StepTwo from '@/app/analysis/components/StepTwo';

const AnalysisPage = () => {
  return (
    <section className='w-full flex flex-col items-center gap-8 relative'>
      <div className='w-full flex flex-col items-center gap-8 p-0 sm:pt-2 animate-slide-up'>
        <StepTwo />
        <StepThree />
      </div>
    </section>
  );
};

export default AnalysisPage;

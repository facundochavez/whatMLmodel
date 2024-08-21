import StepOne from './Steps/StepOne.layout';
import StepThree from './Steps/StepThree.layout';
import StepTwo from './Steps/StepTwo.layout';

const Analysis = () => {
  return (
    <section className='w-full py-5 flex flex-col items-center gap-8'>
      <StepOne />
      <StepTwo />
      <StepThree />
    </section>
  );
};

export default Analysis;

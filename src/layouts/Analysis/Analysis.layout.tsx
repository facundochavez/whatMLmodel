import StepOne from './Steps/StepOne';
import StepThree from './Steps/StepThree';
import StepTwo from './Steps/StepTwo';

const Analysis = () => {
  return (
    <section className='w-full max-w-[700px] py-5'>
      <StepOne />
      <StepTwo />
      <StepThree />
    </section>
  );
};

export default Analysis;

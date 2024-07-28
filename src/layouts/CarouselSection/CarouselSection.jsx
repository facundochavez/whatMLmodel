import DescriptionSlide from './Slides/DescriptionSlide';
import InfoSlide from './Slides/InfoSlide';
import ModelsSlide from './Slides/ModelsSlide';
import { useCarouselContext } from '@/context/carousel.context';

const CarouselSection = () => {
  const { selectedSlide } = useCarouselContext();

  //// COMPONENT
  return (
    <section className='w-full max-w-[1000px] flex overflow-x-visible'>
      <div
        className={`min-w-[calc(100%*3)] flex duration-700 ease-out gap-x-[5%]`}
        style={{
          transform: `translateX(-${((selectedSlide - 1) * 100) / 3 + (selectedSlide - 1)*5}%)`,
        }}
      >
        <DescriptionSlide />
        <InfoSlide />
        <ModelsSlide />
      </div>
    </section>
  );
};

export default CarouselSection;

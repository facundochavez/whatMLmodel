import { createContext, useContext, useState } from 'react';

export const CarouselContext = createContext();

const CarouselProvider = ({ children }) => {
  const [selectedSlide, setSelectedSlide] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const goToSlide = (slide) => {
    const delay = slide > selectedSlide ? 1000 : 0;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSelectedSlide(slide);
    }, delay);
  };

  //// COMPONENT
  return (
    <CarouselContext.Provider
      value={{
        selectedSlide,
        isLoading,
        goToSlide
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (context === undefined) {
    throw new Error('CarouselContext must be used within a CarouselProvider');
  }
  return context;
};

export default CarouselProvider;

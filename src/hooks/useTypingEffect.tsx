import { useEffect, useState } from 'react';

const useTypingEffect = (
  text: string = '',
  wordsInterval: number = 10,
  delay: number = 0,
  duration: number = 50
) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const words = text.split(' ');
  const items: string[] = [];

  for (let i = 0; i < words.length; i += wordsInterval) {
    items.push(words.slice(i, i + wordsInterval).join(' '));
  }

  useEffect(() => {
    const startAnimation = setTimeout(() => {
      if (currentPosition < items.length) {
        const intervalId = setInterval(() => {
          setCurrentPosition((prevPosition) => prevPosition + 1);
        }, duration);

        return () => {
          clearInterval(intervalId);
        };
      }
    }, delay);

    return () => {
      clearTimeout(startAnimation);
    };
  }, [currentPosition, items, duration, delay]);

  return items.slice(0, currentPosition).join(' ');
};

export default useTypingEffect;


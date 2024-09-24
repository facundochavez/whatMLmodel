import { useEffect, useState } from 'react';
import sleep from '@/utils/sleep';

const useTypingEffect = (
  text: string = '',
  wordsInterval: number = 10,
  delay: number = 0,
  duration: number = 100
) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const words = text.split(' ');
  const items: string[] = [];

  for (let i = 0; i < words.length; i += wordsInterval) {
    items.push(words.slice(i, i + wordsInterval).join(' '));
  }

  useEffect(() => {
    const startAnimation = async () => {
      currentPosition === 0 && (await sleep(delay));

      while (currentPosition < items.length) {
        const interval = setInterval(() => {
          setCurrentPosition((prevPosition) => prevPosition + 1);
        }, duration);

        return () => clearInterval(interval);
      }
    };

    startAnimation();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCurrentPosition(Infinity);
    }, delay + 600);
  }, []);

  return items.slice(0, currentPosition).join(' ');
};

export default useTypingEffect;

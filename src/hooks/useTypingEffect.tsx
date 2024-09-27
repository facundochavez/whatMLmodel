import { useEffect, useState, useRef } from 'react';
import sleep from '@/utils/sleep';

const useTypingEffect = (
  text: string = '',
  wordsInterval: number = 10,
  delay: number = 0,
  disabled: boolean = false
) => {
  if (disabled) return text;

  const [currentPosition, setCurrentPosition] = useState(0);
  const words = text.split(' ');
  const items: string[] = [];

  for (let i = 0; i < words.length; i += wordsInterval) {
    items.push(words.slice(i, i + wordsInterval).join(' '));
  }

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const startAnimation = async () => {
      currentPosition === 0 && (await sleep(delay));

      for (let i = currentPosition; i < items.length; i++) {
        if (!isMounted.current) return;
        await sleep(100);
        setCurrentPosition((prevPosition) => prevPosition + 1);
      }
    };

    startAnimation();
    return () => {
      setCurrentPosition(0);
    };
  }, [text, delay]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isMounted.current) {
        setCurrentPosition(Infinity);
      }
    }, delay + 600);

    return () => clearTimeout(timeoutId);
  }, [delay, text]);

  return items.slice(0, currentPosition).join(' ');
};

export default useTypingEffect;

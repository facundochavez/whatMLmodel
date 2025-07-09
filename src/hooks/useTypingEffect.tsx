'use client';
import { useEffect, useState, useRef } from 'react';
import sleep from '@/utils/sleep';
import { useAnalysesContext } from '@/context/analyses.context';

const useTypingEffect = (text: string = '', wordsInterval: number = 10, delay: number = 0, disabled: boolean = false) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const words = text.split(' ');
  const items: string[] = [];

  for (let i = 0; i < words.length; i += wordsInterval) {
    items.push(words.slice(i, i + wordsInterval).join(' '));
  }

  useEffect(() => {
    const startAnimation = async () => {
      currentPosition === 0 && (await sleep(delay));
      for (let i = currentPosition; i < items.length; i++) {
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
      if (text?.length) {
        setCurrentPosition(Infinity);
      }
    }, delay + 600);
    return () => clearTimeout(timeoutId);
  }, [delay, text]);

  const { isPageTransitioning } = useAnalysesContext();
  if (disabled || isPageTransitioning) return text;
  return items.slice(0, currentPosition).join(' ');
};

export default useTypingEffect;

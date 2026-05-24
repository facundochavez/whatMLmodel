'use client';
import { useEffect, useState, useRef } from 'react';
import sleep from '@/utils/sleep';

const useTypingEffect = (
  text: string = '',
  wordsInterval: number = 10,
  delay: number = 0,
  disabled: boolean = false,
  stepMs: number = 100
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
      for (let i = currentPosition; i < items.length; i++) {
        await sleep(stepMs);
        setCurrentPosition((prevPosition) => prevPosition + 1);
      }
    };
    startAnimation();
    return () => {
      setCurrentPosition(0);
    };
  }, [text, delay, stepMs]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (text?.length) {
        setCurrentPosition(Infinity);
      }
    }, delay + items.length * stepMs + 200);
    return () => clearTimeout(timeoutId);
  }, [delay, text, stepMs, items.length]);

  if (disabled) return text;
  return items.slice(0, currentPosition).join(' ');
};

export default useTypingEffect;

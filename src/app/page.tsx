'use client';
import StepOne from './components/StepOne';
import Hero from './components/Hero';
import LatestPipelines from './components/LatestPipelines';
import Collaborators from './components/Collaborators';
import { useEffect } from 'react';
import { useGlobalStore } from '@/store/global.store';

export default function Home() {
  const setGeminiErrorOccurred = useGlobalStore((state) => state.setGeminiErrorOccurred);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setGeminiErrorOccurred(false);
  }, []);

  return (
    <>
      <Hero />
      <StepOne />
      <LatestPipelines />
      <Collaborators />
    </>
  );
}
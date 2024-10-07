'use client';
import StepOne from './components/StepOne';
import Hero from './components/Hero';
import LatestPipelines from './components/LatestPipelines';
import Collaborators from './components/Collaborators';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0 });
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

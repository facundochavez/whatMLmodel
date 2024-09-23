'use client';
import StepOne from '@/app/components/StepOne';
import Hero from '@/app/components/Hero';
import { LatestDatasets } from './components/LatestDatasets';

export default function Home() {
  return (
    <>
      <Hero />
      <StepOne />
      <LatestDatasets />
    </>
  );
}

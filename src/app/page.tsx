'use client';
import StepOne from './components/StepOne';
import Hero from './components/Hero';
import LatestDatasets from './components/LatestDatasets';
import Collaborators from './components/Collaborators';

export default function Home() {
  return (
    <>
      <Hero />
      <StepOne />
      <LatestDatasets />
      <Collaborators />
    </>
  );
}

'use client';
import StepOne from './components/StepOne';
import Hero from './components/Hero';
import LatestPipelines from './components/LatestPipelines';
import Collaborators from './components/Collaborators';

export default function Home() {
  return (
    <>
      <Hero />
      <StepOne />
      <LatestPipelines />
      <Collaborators />
    </>
  );
}

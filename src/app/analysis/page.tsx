'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepThree from '@/app/analysis/components/StepThree';
import StepTwo from '@/app/analysis/components/StepTwo';
import sleep from '@/utils/sleep';
import { useCurrentAnalysisStore } from '@/store/currentAnalysis.store';
import { useGlobalStore } from '@/store/global.store';

const AnalysisPage: React.FC = () => {
  const router = useRouter();
  const currentAnalysis = useCurrentAnalysisStore((state) => state.currentAnalysis);
  const setGeminiErrorOccurred = useGlobalStore((state) => state.setGeminiErrorOccurred);

  useEffect(() => {
    setGeminiErrorOccurred(false);
  }, []);

  useEffect(() => {
    const handleRoute = () => {
      if (!currentAnalysis?.info) {
        const main = document.querySelector('main');
        if (!main) return;
        main.classList.add('page-transition');
        sleep(300);
        router.push('/');
      }
    };
    handleRoute();
  }, [currentAnalysis]);

  return (
    <>
      <StepTwo />
      {currentAnalysis?.recommendations && <StepThree />}
    </>
  );
};

export default AnalysisPage;

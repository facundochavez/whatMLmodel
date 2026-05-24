'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StepThree from '@/app/analysis/components/StepThree';
import StepTwo from '@/app/analysis/components/StepTwo';
import sleep from '@/utils/sleep';
import { useCurrentAnalysisStore } from '@/store/currentAnalysis.store';
import { useAnalysesStore } from '@/store/analyses.store';
import { useGlobalStore } from '@/store/global.store';

const AnalysisPage: React.FC = () => {
  const router = useRouter();
  const currentAnalysis = useCurrentAnalysisStore((state) => state.currentAnalysis);
  const touchAnalysis = useAnalysesStore((state) => state.touchAnalysis);
  const setGeminiErrorOccurred = useGlobalStore((state) => state.setGeminiErrorOccurred);

  useEffect(() => {
    setGeminiErrorOccurred(false);
  }, []);

  useEffect(() => {
    if (!currentAnalysis?.id) return;

    const timeout = setTimeout(() => {
      touchAnalysis(currentAnalysis.id);
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentAnalysis?.id, touchAnalysis]);

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
      {(!!currentAnalysis?.recommendationsTitle ||
        !!currentAnalysis?.modelsIntroText ||
        !!currentAnalysis?.recommendations?.length) && (
        <StepThree key={currentAnalysis?.id} />
      )}
    </>
  );
};

export default AnalysisPage;

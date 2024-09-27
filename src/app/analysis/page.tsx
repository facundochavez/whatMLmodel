'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StepThree from '@/app/analysis/components/StepThree';
import StepTwo from '@/app/analysis/components/StepTwo';
import { useGlobalContext } from '@/context/global.context';
import { useAnalyzesContext } from '@/context/analyzes.context';

const AnalysisPage: React.FC = () => {
  const { currentAnalysis } = useAnalyzesContext();
  const router = useRouter();

  useEffect(() => {
    const handleRoute = () => {
      if (!currentAnalysis?.info) {
        router.push('/');
      }
    };
    handleRoute();
  }, [currentAnalysis]);

  return (
    <>
      <StepTwo />
      {currentAnalysis.recommendations && <StepThree />}
    </>
  );
};

export default AnalysisPage;

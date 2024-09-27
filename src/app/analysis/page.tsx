'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepThree from '@/app/analysis/components/StepThree';
import StepTwo from '@/app/analysis/components/StepTwo';
import { useAnalyzesContext } from '@/context/analyzes.context';

const AnalysisPage: React.FC = () => {
  const { currentAnalysis, isPageTransitioning } = useAnalyzesContext();
  const router = useRouter();
  const [isAiThinking, setIsAiThinking] = useState(true);

  useEffect(() => {
    if (isAiThinking) {
      setTimeout(() => {
        setIsAiThinking(false);
      }, 3000);
    }
  }, [isAiThinking]);

  useEffect(() => {
    const handleRoute = () => {
      if (!currentAnalysis?.info) {
        router.push('/');
      }
    };
    handleRoute();
  }, [currentAnalysis]);

  useEffect(() => {
    if (!isPageTransitioning) {
      setIsAiThinking(false);
    }
  }, [isPageTransitioning]);

  return (
    <>
      <StepTwo setIsAiThinking={setIsAiThinking} />
      {currentAnalysis.recommendations && (
        <StepThree isAiThinking={isAiThinking} />
      )}
    </>
  );
};

export default AnalysisPage;

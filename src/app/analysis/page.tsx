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
      }, 5000);
    }
  }, [isAiThinking]);
  
  useEffect(() => {
    setIsAiThinking(false);
  }, [isPageTransitioning]);
  
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
      <StepTwo setIsAiThinking={setIsAiThinking} />
      {currentAnalysis.recommendations && (
        <StepThree isAiThinking={isAiThinking} />
      )}
    </>
  );
};

export default AnalysisPage;

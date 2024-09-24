'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // useRouter para la navegación
import StepThree from '@/app/analysis/components/StepThree';
import StepTwo from '@/app/analysis/components/StepTwo';
import { useGlobalContext } from '@/context/global.context';

const AnalysisPage = () => {
  const { currentAnalysis, setIsAiThinking, setIsUserEditingInfo } =
    useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const handleContext = () => {
      setIsAiThinking(false);
      if (!currentAnalysis?.info) {
        router.push('/');
      }
      if (!currentAnalysis?.recommendations) {
        setIsUserEditingInfo(true);
      } else {
        setIsUserEditingInfo(false);
      }
    };

    handleContext();
  }, []);

  return (
    <>
      <StepTwo />
      {currentAnalysis.recommendations && <StepThree />}
    </>
  );
};

export default AnalysisPage;

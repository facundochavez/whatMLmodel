'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // useRouter para la navegación
import StepThree from '@/app/analysis/components/StepThree';
import StepTwo from '@/app/analysis/components/StepTwo';
import { useGlobalContext } from '@/context/global.context';

const AnalysisPage = () => {
  const { selectedAnalysis, setIsAiThinking, setIsUserEditingInfo } =
    useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const handleContext = () => {
      setIsAiThinking(false);
      if (!selectedAnalysis?.info) {
        router.push('/');
      }
      if (!selectedAnalysis?.recommendations) {
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
      {selectedAnalysis.recommendations && <StepThree />}
    </>
  );
};

export default AnalysisPage;

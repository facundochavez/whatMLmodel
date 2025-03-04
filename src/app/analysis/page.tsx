'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepThree from '@/components/Steps/StepThree';
import StepTwo from '@/components/Steps/StepTwo';
import { useAnalysisStore } from '@/store/analysis.store';
import { useRecommendationsStore } from '@/store/recommendations.store';

const AnalysisPage: React.FC = () => {
  const { analysis, setAnalysis } = useAnalysisStore();
  const { recommendations, setRecommendations } = useRecommendationsStore();
  const router = useRouter();
  const [isAiThinking, setIsAiThinking] = useState(true);

  // ✅ Recuperamos los datos de sessionStorage si Zustand está vacío
  useEffect(() => {
    if (!analysis) {
      const storedAnalysis = sessionStorage.getItem('analysis');
      if (storedAnalysis) {
        setAnalysis(JSON.parse(storedAnalysis));
      }
    }
    if (!recommendations || Object.keys(recommendations).length === 0) {
      const storedRecommendations = sessionStorage.getItem('recommendations');
      if (storedRecommendations) {
        setRecommendations(JSON.parse(storedRecommendations));
      }
    }
  }, [analysis, recommendations, setAnalysis, setRecommendations]);

  useEffect(() => {
    if (isAiThinking) {
      setTimeout(() => {
        setIsAiThinking(false);
      }, 5000);
    }
  }, [isAiThinking]);

  return (
    <>
      <StepTwo setIsAiThinking={setIsAiThinking} />
      {recommendations && Object.keys(recommendations).length > 0 && <StepThree />}
    </>
  );
};

export default AnalysisPage;

import { useEffect, useState } from 'react';
import TablesGroup from '@/components/TablesGroup/TablesGroup';
import TypingText from '@/components/TypingText';
import { useCurrentAnalysisStore } from '@/store/currentAnalysis.store';
import { useGlobalStore } from '@/store/global.store';
import { getModelsIntroText } from '@/utils/parsePartialRecommendations';

const StreamingCursor = () => (
  <span className="inline-block w-0.5 h-[1em] ml-0.5 align-text-bottom bg-foreground animate-pulse" />
);

const StepThree = () => {
  const isStreamingRecommendations = useGlobalStore((state) => state.isStreamingRecommendations);
  const currentAnalysis = useCurrentAnalysisStore((state) => state.currentAnalysis);

  const recommendations = currentAnalysis?.recommendations ?? [];
  const modelsIntroText = getModelsIntroText(currentAnalysis, recommendations);
  const hasContent =
    !!currentAnalysis?.recommendationsTitle || !!modelsIntroText || recommendations.length > 0;
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (!modelsIntroText) {
      setShowIntro(false);
      return;
    }

    if (!isStreamingRecommendations) {
      setShowIntro(true);
      return;
    }

    setShowIntro(false);
    const timer = setTimeout(() => setShowIntro(true), 300);
    return () => clearTimeout(timer);
  }, [modelsIntroText, isStreamingRecommendations]);

  const shouldShowTables = (index: number) => {
    const recommendation = recommendations[index];
    if (!recommendation?.tables?.modelsAlias?.length) return false;
    if (!isStreamingRecommendations) return true;
    return index < recommendations.length - 1;
  };

  const isParagraphStreaming = (index: number) => {
    if (!isStreamingRecommendations || index !== recommendations.length - 1) return false;
    const recommendation = recommendations[index];
    return !!recommendation?.paragraph && !recommendation?.tables;
  };

  const isTitleStreaming = isStreamingRecommendations && !recommendations.length;

  if (!hasContent) return null;

  return (
    <section className="w-full max-w-[70rem] flex flex-col gap-8 sm:gap-4">
      {currentAnalysis?.recommendationsTitle && (
        <h2 className="text-2xl font-semibold sm:pb-4">
          {currentAnalysis.recommendationsTitle}
          {isTitleStreaming && <StreamingCursor />}
        </h2>
      )}

      {recommendations.map((recommendation, index) => (
        <section key={index} className="flex flex-col gap-8 sm:gap-4">
          {recommendation?.paragraph && (
            <p className="text-muted-foreground">
              {recommendation.paragraph}
              {isParagraphStreaming(index) && <StreamingCursor />}
            </p>
          )}

          {index === 0 && showIntro && modelsIntroText && (
            <TypingText
              key={modelsIntroText}
              text={modelsIntroText}
              wordsInterval={4}
              stepMs={40}
              delay={0}
              disabled={!isStreamingRecommendations}
              className="text-muted-foreground"
            />
          )}

          {shouldShowTables(index) && (
            <div
              className={
                isStreamingRecommendations
                  ? 'w-full opacity-0 animate-slide-up [animation-fill-mode:forwards]'
                  : 'w-full'
              }
            >
              <TablesGroup type={recommendation.type} tables={recommendation.tables} />
            </div>
          )}
        </section>
      ))}
    </section>
  );
};

export default StepThree;

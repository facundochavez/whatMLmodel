'use client';

import { useEffect } from 'react';
import TablesGroup from '@/components/TablesGroup/TablesGroup';
import TypingText from '@/components/TypingText/TypingText';
import { useRecommendationsStore } from '@/store/recommendations.store';
import generateRandomUUID from '@/utils/generateRandomUUID';
import { ProblemType } from '../TablesGroup/types';

const StepThree: React.FC = () => {
  const { recommendations, setRecommendations } = useRecommendationsStore();

  useEffect(() => {
    if (!recommendations || Object.keys(recommendations).length === 0) {
      const storedRecommendations = sessionStorage.getItem("recommendations");
      if (storedRecommendations) {
        setRecommendations(JSON.parse(storedRecommendations));
      }
    }
  }, [recommendations, setRecommendations]);

  if (!recommendations || Object.keys(recommendations).length === 0) {
    console.log("===> NO DATA AVAILABLE", )
    return <p>No recommendations available.</p>;
  }

  return (
    <section className='w-full max-w-[1050px] flex flex-col gap-8'>
      {recommendations.recommendations?.map((recommendation, index) => (
        <section key={generateRandomUUID()} className='flex flex-col gap-8 sm:gap-4'>
        {recommendations.title && (
          <TypingText
            key={generateRandomUUID()}
            text={recommendations.title}
            wordsInterval={2}
            delay={0}
            disabled={false}
            className='text-2xl font-semibold sm:pb-4'
          />
        )}
        <TypingText
          key={generateRandomUUID()}
          text={recommendation.paragraph}
          wordsInterval={8}
          delay={index * 800 + 200}
          disabled={false}
          className='text-muted-foreground'
        />
        {index === 0 && (
          <TypingText
            key={generateRandomUUID()}
            text='Here is a list of the best models you can apply and their performance metrics for datasets similar to yours:'
            wordsInterval={8}
            delay={index * 800 + 600}
            disabled={false}
            className='text-muted-foreground'
          />
        )}
        <div
            className={`w-full opacity-0 animate-slide-up [animation-fill-mode:forwards]`}
            style={{ animationDelay: `${(index + 1) * 800}ms` }}
          >
          <TablesGroup
            type={recommendation.type as ProblemType}
            tables={recommendation.tables}
          />
        </div>
      </section>
      ))}
    </section>
  );
};

export default StepThree;

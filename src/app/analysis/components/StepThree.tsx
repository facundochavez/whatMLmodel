import TablesGroup from '@/components/TablesGroup/TablesGroup';
import { useAnalyzesContext } from '@/context/analyzes.context';
import { useGlobalContext } from '@/context/global.context';
import useTypingEffect from '@/hooks/useTypingEffect';
import { isAiThinkingService } from '@/services/isAiThinkingService';
import { useEffect, useState } from 'react';

const StepThree: React.FC = () => {
  const { currentAnalysis } = useAnalyzesContext();
  const isAiThinking = isAiThinkingService.getSubject();

  useEffect(() => {
    if (isAiThinking) {
      setTimeout(() => {
        isAiThinkingService.setSubject(false);
      }, 3000);
    }
  }, [isAiThinking]);

  return (
    <section className='w-full max-w-[1050px] flex flex-col gap-8'>
      {currentAnalysis?.recommendations?.map((recommendation, index) => {
        return (
          <section key={index} className='flex flex-col gap-8 sm:gap-4'>
            {recommendation.title && (
              <h3 className='text-2xl font-semibold sm:pb-4'>
                {useTypingEffect(recommendation.title, 2, 0, !isAiThinking)}
              </h3>
            )}
            <p className='text-muted-foreground'>
              {useTypingEffect(
                recommendation.paragraph,
                8,
                index * 800 + 200,
                !isAiThinking
              )}
            </p>
            {index === 0 && (
              <p className='text-muted-foreground'>
                {useTypingEffect(
                  'Here is a list of the best models you can apply and their performance metrics for datasets similar to yours:',
                  8,
                  index * 800 + 600,
                  !isAiThinking
                )}
              </p>
            )}
            <div
              className='opacity-0 w-full animate-slide-up [animation-fill-mode:forwards]'
              style={{ animationDelay: `${index * 800 + 700}ms` }}
            >
              <TablesGroup
                type={recommendation.type}
                tables={recommendation.tables}
              />
            </div>
          </section>
        );
      })}
    </section>
  );
};

export default StepThree;

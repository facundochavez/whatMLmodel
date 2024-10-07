'use client';
import TablesGroup from '@/components/TablesGroup/TablesGroup';
import TypingText from '@/components/TypingText/TypingText';
import { useAnalyzesContext } from '@/context/analyzes.context';

interface StepThreeProps extends React.PropsWithChildren {
  isAiThinking: boolean;
}

const StepThree: React.FC<StepThreeProps> = ({ isAiThinking }) => {
  const { currentAnalysis } = useAnalyzesContext();

  return (
    <section className='w-full max-w-[1050px] flex flex-col gap-8'>
      {currentAnalysis?.recommendations?.map((recommendation, index) => (
        <section key={index} className='flex flex-col gap-8 sm:gap-4'>
          {recommendation.title && (
            <TypingText
              text={recommendation.title}
              wordsInterval={2}
              delay={0}
              disabled={!isAiThinking}
              className='text-2xl font-semibold sm:pb-4'
            />
          )}
          <TypingText
            text={recommendation.paragraph}
            wordsInterval={8}
            delay={index * 800 + 200}
            disabled={!isAiThinking}
            className='text-muted-foreground'
          />
          {index === 0 && (
            <TypingText
              text='Here is a list of the best models you can apply and their performance metrics for datasets similar to yours:'
              wordsInterval={8}
              delay={index * 800 + 600}
              disabled={!isAiThinking}
              className='text-muted-foreground'
            />
          )}
          <div
            className={`w-full ${
              isAiThinking &&
              'opacity-0 animate-slide-up [animation-fill-mode:forwards]'
            }`}
            style={{ animationDelay: `${(index + 1) * 800}ms` }}
          >
            <TablesGroup
              type={recommendation.type}
              tables={recommendation.tables}
            />
          </div>
        </section>
      ))}
    </section>
  );
};

export default StepThree;

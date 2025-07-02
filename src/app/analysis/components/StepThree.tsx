'use client';
import TablesGroup from '@/components/TablesGroup/TablesGroup';
import TypingText from '@/components/TypingText';
import { useAnalysesContext } from '@/context/analyses.context';
import generateRandomUUID from '@/utils/generateRandomUUID';

interface StepThreeProps extends React.PropsWithChildren {
  isAiThinking: boolean;
}

const StepThree: React.FC<StepThreeProps> = ({ isAiThinking }) => {
  const { currentAnalysis } = useAnalysesContext();

  return (
    <section className='w-full max-w-[70rem] flex flex-col gap-8'>
      {currentAnalysis?.recommendations?.map((recommendation, index) => (
        <section key={generateRandomUUID()} className='flex flex-col gap-8 sm:gap-4'>
          {recommendation.title && (
            <TypingText
              key={generateRandomUUID()}
              text={recommendation.title}
              wordsInterval={2}
              delay={0}
              disabled={!isAiThinking}
              className='text-2xl font-semibold sm:pb-4'
            />
          )}
          <TypingText
            key={generateRandomUUID()}
            text={recommendation.paragraph}
            wordsInterval={8}
            delay={index * 800 + 200}
            disabled={!isAiThinking}
            className='text-muted-foreground'
          />
          {index === 0 && (
            <TypingText
              key={generateRandomUUID()}
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

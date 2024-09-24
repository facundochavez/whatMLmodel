import TablesGroup from '@/components/TablesGroup/TablesGroup';
import { useGlobalContext } from '@/context/global.context';
import useTypingEffect from '@/hooks/useTypingEffect';

// VALIDACIÓN DE DATOS (BORRAR LUEGO)
import modelsResponsesDataRaw from '@/prompts/modelsResponses.data.json';
import { ModelResponse } from '@/types';

const validateModelResponses = (data: any[]): ModelResponse[] => {
  return data.filter((item) => {
    if (typeof item !== 'object' || !item) return false;
    return true;
  }) as ModelResponse[];
};

const StepThree = () => {
  const { selectedAnalysis } = useGlobalContext();

  return (
    <section className='w-full max-w-[1050px] flex flex-col gap-8'>
      <h3 className='text-2xl font-semibold'>

        {useTypingEffect(selectedAnalysis.recomendationsTitle)}
      </h3>
      {selectedAnalysis?.recommendations?.map((recomendation, index) => {
        return (
          <section key={index} className='flex flex-col gap-4'>
            <p className='text-muted-foreground'>
              {useTypingEffect(recomendation.paragraph)}
            </p>
            {index === 0 && (
              <p className='text-muted-foreground'>
                {useTypingEffect(
                  'Here is a list of the best models you can apply and their performance metrics for datasets similar to yours:'
                )}
              </p>
            )}
            <TablesGroup
              type={recomendation.type}
              tables={recomendation.tables}
            />
          </section>
        );
      })}
    </section>
  );
};

export default StepThree;

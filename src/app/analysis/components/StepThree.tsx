import TablesGroup from '@/components/TablesGroup/TablesGroup';
import { ProblemType } from '@/components/TablesGroup/types';
import modelsResponsesDataRaw from '@/prompts/modelsResponses.data.json';
import { ModelResponse } from '@/types';

/* async function getModels(aliases: string[]): Promise<Model[]> {
  try {
    const response = await fetch('/api/models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ aliases }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
  
} */

const StepThree = () => {
  const modelsResponsesData: ModelResponse[] =
    modelsResponsesDataRaw as ModelResponse[];
  const response: ModelResponse = modelsResponsesData[0];

  return (
    <section className='w-full max-w-[1050px] flex flex-col gap-8 mt-8'>
      <h3 className='text-2xl font-semibold'>{response.recomendationsTitle}</h3>
      {response.recommendations.map((recomendation, index) => {
        return (
          <section key={index} className='flex flex-col gap-4'>
            <p className='text-muted-foreground'>{recomendation.paragraph}</p>
            {index === 0 && (
              <p className='text-muted-foreground'>
                Here is a list of the best models you can apply and their
                performance metrics for datasets similar to yours:
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

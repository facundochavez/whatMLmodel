import ModelsTable from '@/components/Tables/Models/Models.table';
import { Model, columnsModels } from '@/components/Tables/Models/columnsModels';
import SimilarDatasetsTable from '@/components/Tables/SimilarDatasets/SimilarDatasets.table';
import Tables from '@/components/Tables/Tables';
import modelsResponsesDataRaw from '@/prompts/modelsResponses.data.json';
import getModels from '@/utils/getModel';

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

interface Response {
  alias: string;
  title: string;
  recomendations: {
    type: string;
    paragraph: string;
    tables: {
      models: string[];
      similarDatasets: string[];
    };
  }[];
}

const modelsResponsesData = modelsResponsesDataRaw as Response[];

const StepThree = () => {
  const response: Response = modelsResponsesData[4];

  return (
    <div className='w-full max-w-[1050px] flex flex-col gap-8 mt-8'>
      <h1 className='text-2xl font-semibold'>{response.title}</h1>
      {response.recomendations.map((recomendation, index) => {
        return (
          <section key={index} className='flex flex-col gap-4'>
            <p className='text-muted-foreground'>{recomendation.paragraph}</p>
            {index === 0 && (
              <p className='text-muted-foreground'>
                Here’s a list of the best models you can apply and their metrics
                for datasets similar to yours:
              </p>
            )}
            <Tables type={recomendation.type} tables={recomendation.tables} />
          </section>
        );
      })}
    </div>
  );
};

export default StepThree;

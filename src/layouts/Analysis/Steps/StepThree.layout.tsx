import ModelsTable from '@/components/Tables/Models.table';
import SimilarDatasetsTable from '@/components/Tables/SimilarDatasets.table';
import modelsResponsesData from '@/prompts/modelsResponses.data.json';

const StepThree = () => {
  const response = modelsResponsesData[6];

  return (
    <div className='w-full max-w-[1100px] flex flex-col gap-8 mt-8'>
      <h1 className='text-2xl font-semibold'>{response.title}</h1>
      {response.tables.map((table, index) => (
        <div key={index} className='flex flex-col gap-2'>
          <p className='text-muted-foreground'>{table.paragraph}</p>
          {index === 0 && (
            <p className='text-muted-foreground'>
              Here’s a list of the best models you can apply and their metrics
              for datasets similar to yours:
            </p>
          )}
          <div className='flex gap-2'>
            <ModelsTable />
            <SimilarDatasetsTable />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepThree;

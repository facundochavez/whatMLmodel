import { useCarouselContext } from '@/context/carousel.context';
import ModelsTableClassification from '@/components/ModelsTableClassification/ModelsTableClassification';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, RotateCcw } from 'lucide-react';
import { columnsClassification } from '@/components/ModelsTableClassification/columnsClassification';
import modelsData from '@/data/models.data.json';
import similarDatasetData from '@/data/similar-datasets.data.json';
import getTableData from '@/utils/tableData';

const tableData = getTableData(modelsData.classification, similarDatasetData.classification[0]);

const ModelsSlide = () => {
  const { selectedSlide } = useCarouselContext();
  const { isLoading, goToSlide } = useCarouselContext();

  //// COMPONENT
  return (
    <section
      className={`min-w-[calc(100%/3)] flex flex-col duration-700 ease-out`}
      style={{ opacity: selectedSlide === 3 ? 1 : 0 }}
    >
      <header className='w-full flex justify-between mt-2 gap-3'>
        <Button
          variant='secondary'
          className='w-fit'
          onClick={() => {
            goToSlide(2);
          }}
        >
          <ArrowLeft size={20} className='mr-2' /> Back
        </Button>
        <Button
          type='submit'
          className='w-fit'
          disabled={isLoading}
          onClick={() => {
            goToSlide(1);
          }}
        >
          <RotateCcw className='w-4 h-4 mr-2' />
          Try again
        </Button>
      </header>
      <h2 className='text-xl font-semibold py-4'>Classification Models</h2>
      <ModelsTableClassification columns={columnsClassification} data={tableData} />
    </section>
  )
};

export default ModelsSlide;

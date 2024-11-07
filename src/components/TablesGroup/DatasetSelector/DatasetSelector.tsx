import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import ViewButton from './ViewButton/ViewButton';
import { useGlobalContext } from '@/context/global.context';
import { useTablesGroupContext } from '../tablesGroup.context';
import { useAnalysesContext } from '@/context/analyses.context';
import getPipelineByAlias from '@/utils/getPipelineByAlias';

const DatasetSelector: React.FC = () => {
  const { isMobile } = useGlobalContext();
  const { similarDatasets, setSelectedDatasetIndex, selectedDatasetIndex } =
    useTablesGroupContext();

  return (
    <header
      className={
        `flex flex-col gap-x-3 gap-y-1 lg:flex-row lg:items-center` +
        (isMobile ? '' : ' pl-[370px]')
      }
    >
      <h2 className='min-w-max text-base'>Similar dataset:</h2>
      <div className='flex gap-2 sm:gap-3 items-center w-full'>
        <Select
          defaultValue='0'
          value={`${selectedDatasetIndex}`}
          onValueChange={(value) => setSelectedDatasetIndex(value)}
        >
          <SelectTrigger className='w-full md:w-52 bg-muted/30 sm:bg-background text-sm sm:text-base'>
            <SelectValue placeholder='Select a datset' />
          </SelectTrigger>
          <SelectContent className='bg-primary-foreground sm:bg-background'>
            <SelectGroup>
              {similarDatasets.map((dataset, index) => (
                <SelectItem
                  key={index}
                  value={`${index}`}
                  className='text-sm sm:text-base'
                >
                  {dataset.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <ViewButton />
      </div>
    </header>
  );
};

export default DatasetSelector;

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DatasetSelectorProps } from '../types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Eye, ChevronRight } from 'lucide-react';
import ViewButton from './ViewButton/ViewButton';

const DatasetSelector: React.FC<DatasetSelectorProps> = ({
  similarDatasets,
  setSelectedDataset,
}) => {
  return (
    <header className='flex flex-col gap-x-3 gap-y-2 pl-[370px] lg:flex-row lg:items-center'>
      <h2 className='min-w-max'>Similar Datset:</h2>
      <div className='flex gap-3 items-center w-full'>
        <Select
          defaultValue='0'
          onValueChange={(value) => setSelectedDataset(value)}
        >
          <SelectTrigger className='w-full md:w-52'>
            <SelectValue placeholder='Select a datset' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {similarDatasets.map((dataset, index) => (
                <SelectItem key={index} value={`${index}`}>
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

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ViewButton from './ViewButton/ViewButton';
import { useTablesGroupContext } from '../tablesGroup.context';
import { useGlobalStore } from '@/store/global.store';

const PipelineSelector: React.FC = () => {
  const isMobile = useGlobalStore((state) => state.isMobile);
  const { similarPipelines, selectedSimilarPipelineIndex, setSelectedSimilarPipelineIndex } = useTablesGroupContext();

  return (
    <header className={`flex flex-col gap-x-3 gap-y-1 lg:flex-row lg:items-center` + (isMobile ? '' : ' pl-[370px]')}>
      <span className="min-w-max text-base">Similar dataset:</span>
      <div className="flex gap-2 sm:gap-3 items-center w-full">
        <Select value={`${selectedSimilarPipelineIndex}`} defaultValue="0" onValueChange={(value) => setSelectedSimilarPipelineIndex(value)}>
          <SelectTrigger className="w-full md:w-52 bg-muted/30 sm:bg-background text-sm sm:text-base">
            <SelectValue placeholder="Select a dataset" />
          </SelectTrigger>
          <SelectContent className="bg-primary-foreground sm:bg-background border rounded-lg">
            <SelectGroup>
              {similarPipelines.map((pipeline, index) => (
                <SelectItem key={index} value={`${index}`} className="text-sm sm:text-base pr-4">
                  {pipeline.title}
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

export default PipelineSelector;

'use client';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGlobalContext } from '@/context/global.context';
import Markdown from 'react-markdown';
import { Badge } from '../ui/badge';
import camelToTitleCase from '@/utils/camelToTitleCase';
import { Card } from '../ui/card';
import MyCodeMirror from '../MyCodeMirror';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import getModelNameByAlias from '@/utils/getModeNameByAlias';
import getPerformanceMetricNameByAlias from '@/utils/getPerformanceMetricNameByAlias';

const PipelineDialogContent: React.FC = () => {
  const { selectedPipeline, selectedPipelineModelIndex, setSelectedPipelineModelIndex } = useGlobalContext();

  return (
    <DialogContent
      className="flex flex-col pr-3 focus-visible:outline-none focus:outline-none duration-0"
      style={{ maxWidth: 'calc(min(90%, 50rem))' }}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <DialogTitle className="text-2xl text-center sm:text-left">{selectedPipeline?.title}</DialogTitle>

      <div className="w-full pr-4 flex flex-col max-h-[75vh] overflow-auto">
        <DialogHeader>
          <p className="text-sm !-mb-2">
            Problem type: <Badge className="ml-1 pointer-events-none">{camelToTitleCase(selectedPipeline?.problemType || '')}</Badge>
          </p>
          <p className="text-sm">
            Dataset on {selectedPipeline?.link.platform}:{' '}
            <a
              className="underline text-muted-foreground hover:text-foreground"
              href={selectedPipeline?.link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedPipeline?.link.url}
            </a>
          </p>
        </DialogHeader>
        <h3 className="text-lg font-semibold !mt-4 m mb-2">Description:</h3>
        <DialogDescription className="text-left [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-4 [&>ul]:mb-4 [&>ul]:-mt-2 [&>p]:mb-4 [&>p>code]:bg-muted [&>p>code]:rounded [&>p>code]:px-1.5 [&>p>code]:pb-0.5">
          <Markdown>{selectedPipeline?.problemDescription}</Markdown>
        </DialogDescription>
        <h3 className="text-lg font-semibold mb-3">Data preprocessing:</h3>
        <Card className="w-full bg-muted/30 mb-4">
          <MyCodeMirror value={selectedPipeline?.notebook.preprocessingCode || ''} />
        </Card>
        <div className="flex mb-4 gap-4 justify-between">
          <h3 className="text-lg font-semibold mt-1 min-w-fit">Training:</h3>
          <Select defaultValue="0" value={`${selectedPipelineModelIndex}`} onValueChange={(value) => setSelectedPipelineModelIndex(value)}>
            <SelectTrigger className="w-full sm:w-fit bg-muted/30 [&>svg]:ml-2 hover:bg-muted/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent noPortal align='end' className="bg-primary-foreground sm:bg-background max-h-[40vh] border rounded-lg">
              <SelectGroup>
                {selectedPipeline?.notebook.training.map((train, index) => (
                  <SelectItem key={index} value={`${index}`} className="text-sm sm:text-base">
                    {getModelNameByAlias({
                      type: selectedPipeline?.problemType,
                      modelAlias: train.modelAlias,
                    })}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Card className="w-full bg-muted/30 mb-4">
          <MyCodeMirror value={selectedPipeline?.notebook.training[Number(selectedPipelineModelIndex)].trainingCode || ''} />
        </Card>
        <h3 className="text-lg font-semibold mb-2">Performance:</h3>
        <ul className="text-muted-foreground text-sm leading-4">
          {Object.entries(selectedPipeline?.notebook.training[Number(selectedPipelineModelIndex)].performance || {}).map(([alias, value], index) => (
            <li key={index} className="list-disc list-inside pl-4 mb-2">
              {getPerformanceMetricNameByAlias({ type: selectedPipeline?.problemType || null, metricAlias: alias })}: {value}
            </li>
          ))}
        </ul>
      </div>
    </DialogContent>
  );
};

export default PipelineDialogContent;

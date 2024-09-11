import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { ModelsAccordionProps } from '../types';
import Image from 'next/image';
import DatasetSelector from '../DatasetSelector/DatasetSelector';
import { Button } from '@/components/ui/button';
import { CodeXml, Sparkles } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import GenerateCodeDialogContent from '@/components/DialogContents/GenerateCode.dialogContent';
import SimilarDatasetDialogContent from '@/components/DialogContents/SimilarDataset.dialogContent';
import kebabToTitleCase from '@/utils/kebabToTitleCase';

const ModelsAccordion: React.FC<ModelsAccordionProps> = ({
  models,
  type,
  similarDatasets,
  performanceMetrics,
  columnsPerformanceMetrics,
  setSelectedDataset,
}) => {
  console.log(performanceMetrics[0]);
  return (
    <Card>
      <Accordion type='single' collapsible>
        <header className='w-full h-14 p-4 flex items-center text-sm text-muted-foreground bg-muted/30 border-b'>
          <h3 className='text-left ml-1'>{kebabToTitleCase(type)} Models</h3>
        </header>
        {models.map((model, index) => {
          const modelPerformanceMetrics = performanceMetrics.find(
            (metric) => metric.modelAlias === model.alias
          );
          return (
            <AccordionItem key={index} value={model.alias}>
              <AccordionTrigger className='flex items-center gap-5 overflow-hidden'>
                <Image
                  src={`./models-icons/model-icon-${model.icon}.svg`}
                  alt={`${model.name} icon`}
                  width={26}
                  height={26}
                  className='ml-1'
                  /* style={{ filter: theme === 'dark' ? undefined : 'brightness(0)' }} */
                />
                <h2 className='w-full text-left text-base truncate'>
                  {model.name}
                </h2>
              </AccordionTrigger>
              <AccordionContent className='flex flex-col gap-2'>
                <header className='p-4 rounded border'>
                  <ul className='w-full [&>li]:w-full [&>li]:text-left [&>li]:flex [&>li]:justify-between [&>li>label]:text-muted-foreground'>
                    <li>
                      <label>Training time</label>
                      <span>{model.metrics.trainingTime}</span>
                    </li>
                    <li>
                      <label>Prediction speed</label>
                      <span>{model.metrics.predictionSpeed}</span>
                    </li>
                    <li>
                      <label>Memory usage</label>
                      <span>{model.metrics.memoryUsage}</span>
                    </li>
                  </ul>
                </header>
                <div className='flex flex-col gap-2'>
                  <DatasetSelector
                    similarDatasets={similarDatasets}
                    setSelectedDataset={setSelectedDataset}
                  />
                  <ul className='w-full p-4 bg-muted/30 rounded border [&>li]:w-full [&>li]:text-left [&>li]:flex [&>li]:justify-between [&>li>label]:text-muted-foreground'>
                    {columnsPerformanceMetrics.map(
                      (
                        metric: {
                          header: string;
                          accessorKey: keyof typeof modelPerformanceMetrics;
                        },
                        index: number
                      ) => {
                        const value =
                          modelPerformanceMetrics?.[metric.accessorKey] ?? '-';
                        return (
                          <li key={index}>
                            <label>{metric.header}</label>
                            <span>{value}</span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
                <footer className='flex flex-col gap-2'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant='secondary' >
                        <CodeXml className='mr-2 h-4 w-4' />
                        <span>Similar dataset code</span>
                      </Button>
                    </DialogTrigger>
                    <SimilarDatasetDialogContent />
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button >
                        <Sparkles className='mr-2 h-4 w-4' />
                        <span>Generate code</span>
                      </Button>
                    </DialogTrigger>
                    <GenerateCodeDialogContent />
                  </Dialog>
                </footer>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
};

export default ModelsAccordion;

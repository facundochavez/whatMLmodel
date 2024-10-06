import { ColumnDef } from '@tanstack/react-table';
import { Model, ProblemType } from '../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CodeXml, MoreHorizontal } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import PipelineDialogContent from '@/components/DialogContents/Pipeline.dialogContent';
import { useState } from 'react';
import GenerateCodeDialogContent from '@/components/DialogContents/GenerateCode.dialogContent';
import camelToTitleCase from '@/utils/camelToTitleCase';
import getModelIcon from '@/utils/getModelIcon';
import { AiStarsIcon } from '@/icons/AiStarsIcon';

const columnsModels = (type: ProblemType): ColumnDef<Model>[] => [
  {
    accessorKey: 'name',
    header: () => {
      return (
        <h3 className='text-left ml-1'>{camelToTitleCase(type)} Models</h3>
      );
    },
    cell: ({ row }) => {
      const [showTooltip, setShowTooltip] = useState(false);
      const modelName: string = row.original.name;
      const icon: number = row.original.icon;
      const ModelIcon = getModelIcon({ iconNumber: icon }) as React.FC;

      return (
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={0} open={showTooltip}>
            <TooltipTrigger
              asChild
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <div className='flex items-center gap-4 p-4 min-w-max pl-5'>
                <ModelIcon />
                <h2 className='w-full max-w-56 min-w-56 text-left text-base truncate pr-1'>
                  {modelName}
                </h2>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side='right'
              className='ml-11 flex flex-col items-start p-4'
            >
              <h2 className='mb-2'>{modelName}</h2>
              <ul className='w-full min-w-56 [&>li]:w-full [&>li]:text-left [&>li]:flex [&>li]:justify-between [&>li>label]:text-muted-foreground'>
                <li>
                  <label>Training time</label>
                  <span>{row.original.metrics.trainingTime}</span>
                </li>
                <li>
                  <label>Prediction speed</label>
                  <span>{row.original.metrics.predictionSpeed}</span>
                </li>
                <li>
                  <label>Memory usage</label>
                  <span>{row.original.metrics.memoryUsage}</span>
                </li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const [isGenerating, setIsGenerating] = useState<boolean>(true);
      const payment = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='mr-4'>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='center' className='text-base'>
              <DialogTrigger asChild onClick={() => setIsGenerating(true)}>
                <DropdownMenuItem>
                  <AiStarsIcon className='ml-0.5 mr-2 h-[16px] w-[16px]' />
                  <span className='text-base'>Generate code</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild onClick={() => setIsGenerating(false)}>
                <DropdownMenuItem>
                  <CodeXml className='mr-2 h-[18px] w-[18px]' />
                  <span className='text-base pr-1'>Similar dataset code</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          {isGenerating ? (
            <GenerateCodeDialogContent />
          ) : (
            <PipelineDialogContent />
          )}
        </Dialog>
      );
    },
  },
];

export default columnsModels;

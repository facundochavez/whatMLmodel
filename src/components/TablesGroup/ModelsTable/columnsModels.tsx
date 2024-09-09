import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Model, ProblemType } from '../types';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Code, CodeXml, MoreHorizontal, Sparkles } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function kebabToTitleCase(kebabStr: string): string {
  return kebabStr
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const columnsModels = (type: ProblemType): ColumnDef<Model>[] => [
  {
    accessorKey: 'name',
    header: () => {
      return (
        <div className='text-left ml-1'>{kebabToTitleCase(type)} Models</div>
      );
    },
    cell: ({ row }) => {
      const modelName: string = row.original.name;
      const icon: number = row.original.icon;
      const { theme } = useTheme();

      return (
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className='flex items-center gap-5 p-4 min-w-max'>
                <Image
                  src={`./models-icons/model-icon-${icon}.svg`}
                  alt={`${modelName} icon`}
                  width={26}
                  height={26}
                  className='ml-1'
                  /* style={{ filter: theme === 'dark' ? undefined : 'brightness(0)' }} */
                />
                <h2 className='w-full max-w-56 min-w-56 text-left text-base truncate pr-1'>
                  {modelName}
                </h2>
              </div>
            </TooltipTrigger>
            <TooltipContent side='right' className='ml-11 flex flex-col items-start p-4'>
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
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='mr-4'>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='center' className='text-base'>
            <DropdownMenuItem>
              <Sparkles className='mr-2 h-4 w-4' />
              <span className='text-base'>Generate code</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CodeXml className='mr-2 h-4 w-4' />
              <span className='text-base pr-1'>Similar dataset code</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columnsModels;

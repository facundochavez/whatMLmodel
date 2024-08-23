import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export type Model = {
  id: string;
  alias: string;
  name: string;
  type: string;
  icon: number;
  metrics: {
    trainingTime: string;
    predictionSpeed: string;
    memoryUsage: string;
  };
};

function kebabToTitleCase(kebabStr: string): string {
  return kebabStr
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export const columnsModels: ColumnDef<Model>[] = [
  {
    accessorKey: 'name',
    header: () => {
      return <div className='text-left ml-1'>Classification Models</div>;
    },
    cell: ({ row }) => {
      const modelName: string = row.getValue('name');
      const icon: number = row.getValue('icon');
      const { theme } = useTheme();

      return (
        <div className='flex items-center gap-5 min-w-max'>
          <Image
            src={`./models-icons/model-icon-${icon}.svg`}
            alt={`${modelName} icon`}
            width={30}
            height={30}
            className='ml-1'
            style={{ filter: theme === 'dark' ? undefined : 'brightness(0)' }}
          />
          <h2 className='text-left min-w-max text-base'>{modelName}</h2>
        </div>
      );
    },
  },
  {
    accessorKey: 'icon',
    header: () => <div className='w-0' />,
    cell: () => <div className='w-0' />,
  },
  {
    accessorKey: 'type',
    header: () => <div className='w-0' />,
    cell: () => <div className='w-0' />,
  },
];

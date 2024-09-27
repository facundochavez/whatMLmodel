import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Pipeline } from '@/types';
import getModelIcon from '@/utils/getModelIcon';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useGlobalContext } from '@/context/global.context';
import { DialogTrigger } from '@radix-ui/react-dialog';

const DatasetCard = ({ dataset }: { dataset: Pipeline }) => {
  const DatasetIcon = getModelIcon({
    iconNumber: dataset.icon as number,
  }) as React.FC;
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <DialogTrigger asChild>
      <div
        className='relative cursor-pointer'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DatasetLayerCard dataset={dataset} DatasetIcon={DatasetIcon} />
        <DatasetLayerCard
          dataset={dataset}
          DatasetIcon={DatasetIcon}
          isTopLayer
          isHovered={isHovered}
        />
      </div>
    </DialogTrigger>
  );
};

const DatasetLayerCard = ({
  dataset,
  DatasetIcon,
  isTopLayer = false,
  isHovered = false,
}: {
  dataset: Pipeline;
  DatasetIcon: React.FC;
  isTopLayer?: boolean;
  isHovered?: boolean;
}) => {
  const { isMobile } = useGlobalContext();

  return (
    <Card
      className={`w-full ${
        isTopLayer && 'absolute top-0 left-0 bg-foreground'
      }`}
      style={{
        transitionDuration: '0.35s',
        clipPath: isTopLayer
          ? isHovered
            ? 'polygon(0 100%, 100% 100%, 100% 0, 0 0)'
            : 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'
          : undefined,
        transitionTimingFunction: isHovered
          ? 'cubic-bezier(0,.78,.58,1.02)'
          : 'cubic-bezier(0.5, 0, 0.5, 1)',
      }}
    >
      <CardHeader>
        <div
          className={`flex items-center justify-between ${
            isTopLayer ? 'text-background' : ''
          }`}
        >
          <CardTitle className='truncate leading-normal font-normal text-xl pr-4'>
            {dataset?.title}
          </CardTitle>
          <DatasetIcon />
        </div>
      </CardHeader>
      <CardContent className='pb-4'>
        <p
          className={`text-sm sm:h-[60px] text-muted-foreground ${
            isTopLayer ? 'text-[hsl(var(--muted-foreground-inverted))]' : ''
          } ${isMobile ? 'line-clamp-2' : 'line-clamp-3'}`}
        >
          {dataset?.info?.problemDescription}
        </p>
      </CardContent>
      <CardFooter className='flex pb-5 justify-between'>
        <Button
          variant='link'
          className={`p-0 ${isTopLayer ? 'text-background' : ''}`}
          onClick={() => {
            if (dataset?.link?.url) window.open(dataset.link.url, '_blank');
          }}
        >
          {dataset?.link?.url ? (
            <>
              <span>View on {dataset.link.platform || 'platform'}</span>
              <ArrowRight className='ml-2 h-4 w-4' />
            </>
          ) : (
            <span>View details</span>
          )}
        </Button>
        {dataset.updatedAt && (
          <Badge
            className={`font-bold hover:bg-foreground active:bg-foreground ${
              isTopLayer
                ? 'text-foreground bg-background hover:bg-background active:bg-background'
                : ''
            }`}
          >
            Update
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default DatasetCard;

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pipeline } from '@/types/pipeline.types';
import getModelIcon from '@/utils/getModelIcon';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DialogTrigger } from '@radix-ui/react-dialog';
import camelToTitleCase from '@/utils/camelToTitleCase';
import { Skeleton } from './ui/skeleton';

const PipelineCard = ({ pipeline }: { pipeline: Pipeline }) => {
  const Icon = getModelIcon({
    iconNumber: pipeline?.icon || 1,
  }) as React.FC;
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <DialogTrigger asChild>
      <div className="relative cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <DatasetLayerCard pipeline={pipeline} Icon={Icon} />
        <DatasetLayerCard pipeline={pipeline} Icon={Icon} isTopLayer isHovered={isHovered} />
      </div>
    </DialogTrigger>
  );
};

const DatasetLayerCard = ({
  pipeline: pipeline,
  Icon,
  isTopLayer = false,
  isHovered = false,
}: {
  pipeline: Pipeline;
  Icon: React.FC;
  isTopLayer?: boolean;
  isHovered?: boolean;
}) => {
  return (
    <Card
      className={`w-full min-h-[13.5rem] ${isTopLayer && 'absolute top-0 left-0 bg-foreground'}`}
      style={{
        clipPath: isTopLayer ? (isHovered ? 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' : 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)') : undefined,
        transitionProperty: 'clip-path',
        transitionDuration: '0.35s',
        transitionTimingFunction: isHovered ? 'cubic-bezier(0,.78,.58,1.02)' : 'cubic-bezier(0.5, 0, 0.5, 1)',
      }}
    >
      <CardHeader>
        <div className={`flex items-center justify-between ${isTopLayer ? 'text-background' : ''}`}>
          {pipeline?.title ? (
            <CardTitle className="truncate leading-normal font-normal text-xl pr-4 duration-200">{pipeline.title}</CardTitle>
          ) : (
            <Skeleton className="h-6 w-1/2 mt-1 rounded-full" />
          )}
          {pipeline?.icon ? <Icon /> : <Skeleton className="h-9 w-9 rounded-full" />}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        {pipeline?.problemDescription ? (
          <p className={`text-sm sm:h-[60px] text-muted-foreground line-clamp-3 ${isTopLayer ? 'text-[hsl(var(--muted-foreground-inverted))]' : ''}`}>
            {pipeline.problemDescription}
          </p>
        ) : (
          <div className="flex flex-col gap-1 mb-2">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-1/2 rounded-full" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex pb-5 justify-between gap-2">
        {pipeline?.title ? (
          <Button
            variant="link"
            className={`p-0 ${isTopLayer ? 'text-background' : ''}`}
            onClick={() => {
              if (pipeline?.link?.url) window.open(pipeline?.link.url, '_blank');
            }}
          >
            {pipeline?.link?.url ? (
              <>
                <span>View on {pipeline?.link.platform || 'source site'}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <span>View details</span>
            )}
          </Button>
        ) : (
          <Skeleton className="h-5 w-1/2 rounded-full mt-1/2" />
        )}
        {pipeline?.problemType ? (
          <Badge className={`hover:bg-foreground !bg-foreground ${isTopLayer ? 'text-foreground !bg-background' : ''}`}>
            {camelToTitleCase(pipeline.problemType)}
          </Badge>
        ) : (
          <Skeleton className="h-5 w-1/4 rounded-full mt-1/2" />
        )}
      </CardFooter>
    </Card>
  );
};

export default PipelineCard;

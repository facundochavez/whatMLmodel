import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pipeline } from '@/types/pipeline.types';
import getModelIcon from '@/utils/getModelIcon';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useGlobalContext } from '@/context/global.context';
import { DialogTrigger } from '@radix-ui/react-dialog';
import camelToTitleCase from '@/utils/camelToTitleCase';
import Markdown from 'react-markdown';

const PipelineCard = ({ pipeline }: { pipeline: Pipeline }) => {
  const Icon = getModelIcon({
    iconNumber: pipeline.icon,
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
  const { isMobile } = useGlobalContext();

  return (
    <Card
      className={`w-full ${isTopLayer && 'absolute top-0 left-0 bg-foreground'}`}
      style={{
        clipPath: isTopLayer ? (isHovered ? 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' : 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)') : undefined,
        transitionProperty: 'clip-path',
        transitionDuration: '0.35s',
        transitionTimingFunction: isHovered ? 'cubic-bezier(0,.78,.58,1.02)' : 'cubic-bezier(0.5, 0, 0.5, 1)',
      }}
    >
      <CardHeader>
        <div className={`flex items-center justify-between ${isTopLayer ? 'text-background' : ''}`}>
          <CardTitle className="truncate leading-normal font-normal text-xl pr-4 duration-200">{pipeline?.title}</CardTitle>
          <Icon />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className={`text-sm sm:h-[60px] text-muted-foreground line-clamp-3 ${isTopLayer ? 'text-[hsl(var(--muted-foreground-inverted))]' : ''}`}>
          {pipeline?.problemDescription}
        </p>
      </CardContent>
      <CardFooter className="flex pb-5 justify-between gap-2">
        <Button
          variant="link"
          className={`p-0 ${isTopLayer ? 'text-background' : ''}`}
          onClick={() => {
            if (pipeline?.link?.url) window.open(pipeline.link.url, '_blank');
          }}
        >
          {pipeline?.link?.url ? (
            <>
              <span>View on {pipeline.link.platform || 'platform'}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <span>View details</span>
          )}
        </Button>
        <Badge className={`hover:bg-foreground !bg-foreground ${isTopLayer ? 'text-foreground !bg-background' : ''}`}>
          {camelToTitleCase(pipeline.problemType)}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default PipelineCard;

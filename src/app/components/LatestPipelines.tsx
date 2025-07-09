'use client';

import React, { useEffect, useState } from 'react';
import PipelineCard from '@/components/PipelineCard';
import { Pipeline } from '@/types/pipeline.types';
import { Dialog } from '@radix-ui/react-dialog';
import PipelineDialogContent from '@/components/DialogContents/Pipeline.dialogContent';
import { CollapsibleBox } from '@/components/CollapsibleBox';
import { useGlobalContext } from '@/context/global.context';
import { getLatestPipelines } from '@/utils/getLatestPipelines';

const LatestPipelines = () => {
  const [isBoxCollapsed, setIsBoxCollapsed] = useState(true);
  const { isMobile, setSelectedPipelineModelIndex } = useGlobalContext();
  const { setSelectedPipeline } = useGlobalContext();
  const [latestPipelines, setLatestPipelines] = useState<Pipeline[]>(new Array(6).fill(null));

  useEffect(() => {
    getLatestPipelines().then(setLatestPipelines);
  }, []);

  return (
    <Dialog onOpenChange={() => setSelectedPipelineModelIndex('0')}>
      <section className="w-full flex flex-col max-w-[70rem] mt-4 gap-5">
        <h3 className="text-2xl font-semibold duration-300 delay-75">Latest added pipelines</h3>
        <CollapsibleBox collapsedHeight={isMobile ? 750 : 380} externalIsCollapsed={isBoxCollapsed} onCollapseChange={setIsBoxCollapsed}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestPipelines.map((pipeline, index) => (
              <li key={index} onClick={() => setSelectedPipeline(pipeline)}>
                <PipelineCard pipeline={pipeline} />
              </li>
            ))}
          </ul>
        </CollapsibleBox>
      </section>
      <PipelineDialogContent />
    </Dialog>
  );
};

export default LatestPipelines;

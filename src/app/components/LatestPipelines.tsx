'use client';

import React, { useState } from 'react';
import modelsResponsesDataRaw from '@/prompts/modelsResponses.data.json';
import DatasetCard from '@/components/DatasetCard/DatasetCard';
import { Pipeline } from '@/types';
import { Dialog } from '@radix-ui/react-dialog';
import SimilarDatasetDialogContent from '@/components/DialogContents/SimilarDataset.dialogContent';
import { CollapsibleBox } from '@/components/CollapsibleBox/CollapsibleBox';
import { useGlobalContext } from '@/context/global.context';

// VALIDACIÓN DE DATOS (BORRAR LUEGO)
const validateModelResponses = (data: any[]): Pipeline[] => {
  return data.filter((item) => {
    if (typeof item !== 'object' || !item) return false;
    return true;
  }) as Pipeline[];
};

const LatestPipelines = () => {
  const [isBoxCollapsed, setIsBoxCollapsed] = useState(true);
  const { isMobile } = useGlobalContext();
  const modelsResponsesData: Pipeline[] = validateModelResponses(
    modelsResponsesDataRaw
  );

  return (
    <Dialog>
      <section className={`w-full flex flex-col max-w-[1050px] mt-4 gap-5`}>
        <h3 className='text-2xl font-semibold'>Latest pipelines added</h3>
        <CollapsibleBox
          collapsedHeight={isMobile ? 750 : 380}
          externalIsCollapsed={isBoxCollapsed}
          onCollapseChange={setIsBoxCollapsed}
        >
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {modelsResponsesData.map((response, index) => {
              return (
                <li key={index}>
                  <DatasetCard dataset={response} />
                </li>
              );
            })}
          </ul>
        </CollapsibleBox>
      </section>
      <SimilarDatasetDialogContent />
    </Dialog>
  );
};

export default LatestPipelines;

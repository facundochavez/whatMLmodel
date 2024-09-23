import React from 'react';
import modelsResponsesDataRaw from '@/prompts/modelsResponses.data.json';
import { DatasetCard } from '@/components/DatasetCard/DatasetCard';
import { ModelResponse } from '@/types';
import { Dialog } from '@radix-ui/react-dialog';
import SimilarDatasetDialogContent from '@/components/DialogContents/SimilarDataset.dialogContent';
import { CollapsibleBox } from '@/components/CollapsibleBox/CollapsibleBox';
import { useGlobalContext } from '@/context/global.context';

export const LatestDatasets = () => {
  const {isMobile} = useGlobalContext();
  const modelsResponsesData: ModelResponse[] =
    modelsResponsesDataRaw as ModelResponse[];

  return (
    <Dialog>
      <section className={`w-full flex flex-col max-w-[1050px] mt-20 gap-5`}>
        <h3 className='text-2xl font-semibold'>Latest datasets added</h3>
        <CollapsibleBox collapsedHeight={isMobile ? 750 : 380} >
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

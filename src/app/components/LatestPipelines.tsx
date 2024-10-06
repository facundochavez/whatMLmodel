'use client';

import React, { useState } from 'react';
import modelsResponsesDataRaw from '@/prompts/modelsResponses.data.json';
import PipelineCard from '@/components/PipelineCard/PipelineCard';
import { Pipeline } from '@/types';
import { Dialog } from '@radix-ui/react-dialog';
import PipelineDialogContent from '@/components/DialogContents/Pipeline.dialogContent';
import { CollapsibleBox } from '@/components/CollapsibleBox/CollapsibleBox';
import { useGlobalContext } from '@/context/global.context';
import { useAnalyzesContext } from '@/context/analyzes.context';

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
  // SE CARGA DATOS LOCALES DE MANERA AUXILIAR
  const modelsResponsesData: Pipeline[] = validateModelResponses(
    modelsResponsesDataRaw
  );
  // EL PIPELINE SELECCIONADO DEBERÍA HACER UN GET PARA REQUERIR INFORMACIÓN MÁS DETALLADA
  const { setSelectedPipeline } = useAnalyzesContext();

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
                <li key={index} onClick={() => setSelectedPipeline(response)}>
                  <PipelineCard dataset={response} />
                </li>
              );
            })}
          </ul>
        </CollapsibleBox>
      </section>
      <PipelineDialogContent />
    </Dialog>
  );
};

export default LatestPipelines;

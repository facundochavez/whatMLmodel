'use client';

import { Button } from '@/components/ui/button';

import { ArrowLeft, LoaderCircle, PenLine, RefreshCcw } from 'lucide-react';
import { DialogFooter } from '@/components/ui/dialog';
import { AiStarsIcon } from '@/icons/AiStarsIcon';
import { useGlobalContext } from '@/context/global.context';
import useTextReveal from '@/hooks/useTextReveal';
import { TransitionLink } from '@/components/TransitionLink/TransitionLink';

// VALIDACIÓN DE DATOS (BORRAR LUEGO)
import modelsResponsesDataRaw from '@/prompts/modelsResponses.data.json';
import { ModelResponse } from '@/types';
import StepTwoForm from '@/components/Forms/StepTwo.form';
import { useState } from 'react';

const validateModelResponses = (data: any[]): ModelResponse[] => {
  return data.filter((item) => {
    if (typeof item !== 'object' || !item) return false;
    return true;
  }) as ModelResponse[];
};

const StepTwo = () => {
  const {
    isAiGettingRecommendations: isGettingRecommendations,
    setIsAiGettingRecommendations: setIsGettingRecommendations,
    setCurrentAnalysis,
    currentAnalysis,
    currentAnalysisIndex,
    setIsAiThinking,
    isUserEditingInfo,
    setIsUserEditingInfo,
  } = useGlobalContext();

  const [isFormCollapsed, setIsFormCollapsed] = useState(false);

  // SIMULANDO GENERACIÓN DE RECOMENDACIONES (CAMBIAR ÚNICAMENTE LA DEPENDENCIA DE "ISGETTINGRECOMMENDATIONS", CUIDAR LOS ESTADOS )
  const modelsResponsesData: ModelResponse[] = validateModelResponses(
    modelsResponsesDataRaw
  );
  const handleGetRecomendations = () => {
    setIsFormCollapsed(true);
    setIsGettingRecommendations(true);

    const auxiliarAnalysis = modelsResponsesData[currentAnalysisIndex];

    setTimeout(() => {
      setIsAiThinking(true);
      setCurrentAnalysis((prev) => ({
        ...prev,
        recomendationsTitle: auxiliarAnalysis.recomendationsTitle,
        recommendations: auxiliarAnalysis.recommendations,
      }));
      setIsGettingRecommendations(false);
      setIsUserEditingInfo(false);
    }, 1000);
  };

  return (
    <section className='w-full flex flex-col items-center gap-6'>
      <header className='w-full flex items-center justify-center max-w-[1050px] relative pl-14 pr-8 md:pr-14'>
        <TransitionLink
          href='/'
          className='absolute left-0 opacity-0 animate-fade-in [animation-fill-mode:forwards]'
        >
          <Button variant='outline' size='icon'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </TransitionLink>
        {useTextReveal(currentAnalysis.title || '')}
      </header>

      <StepTwoForm
        isFormCollapsed={isFormCollapsed}
        onCollapseChange={(collapsed) => setIsFormCollapsed(collapsed)}
      >
        <DialogFooter className='mt-4 md:mt-0'>
          {isUserEditingInfo ? (
            !currentAnalysis?.recommendations ? (
              <>
                {!isGettingRecommendations && (
                  <TransitionLink href='/'>
                    <Button type='button' variant='secondary' className='w-full'>
                      <RefreshCcw className='w-4 h-4 mr-2' />
                      Cancel and retry
                    </Button>
                  </TransitionLink>
                )}
                {isGettingRecommendations ? (
                  <Button type='button' disabled className='flex items-center'>
                    <LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
                    Getting models
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    onClick={handleGetRecomendations}
                    className='flex items-center'
                  >
                    <AiStarsIcon className='mr-1.5 h-[18px] w-[18px]' />
                    Get models
                  </Button>
                )}
              </>
            ) : (
              <>
                {!isGettingRecommendations && (
                  <Button
                    variant='secondary'
                    onClick={() => {
                      setIsUserEditingInfo(false);
                      setIsFormCollapsed(true);
                    }}
                  >
                    Cancel
                  </Button>
                )}
                {isGettingRecommendations ? (
                  <Button type='button' disabled className='flex items-center'>
                    <LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
                    Getting models
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    onClick={handleGetRecomendations}
                    className='flex items-center'
                  >
                    Apply changes
                  </Button>
                )}
              </>
            )
          ) : (
            <Button onClick={() => setIsUserEditingInfo(true)}>
              <PenLine className='w-4 h-4 mr-2' /> Edit info
            </Button>
          )}
        </DialogFooter>
      </StepTwoForm>
    </section>
  );
};

export default StepTwo;

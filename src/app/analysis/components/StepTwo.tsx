'use client';

import { Button } from '@/components/ui/button';

import {
  ArrowLeft,
  LoaderCircle,
  PenLine,
  RefreshCcw,
  Star,
} from 'lucide-react';
import { DialogFooter } from '@/components/ui/dialog';
import { AiStarsIcon } from '@/icons/AiStarsIcon';
import useTextReveal from '@/hooks/useTextReveal';
import { TransitionLink } from '@/components/TransitionLink/TransitionLink';
import StepTwoForm from '@/components/Forms/StepTwo.form';
import { useEffect, useState } from 'react';
import { useAnalyzesContext } from '@/context/analyzes.context';
import { isAiThinkingService } from '@/services/isAiThinkingService';

const StepTwo: React.FC = () => {
  const [isAiGettingRecommendations, setIsAiGettingRecommendations] =
    useState<boolean>(false);
  const [isUserEditingInfo, setIsUserEditingInfo] = useState<boolean>(true);

  const {
    currentAnalysis,
    setCurrentAnalysis,
    handleToggleFavorite,
    auxiliarAnalysis,
    auxiliarAnalysisTwo,
    handleAddAnalysis,
    handleUpdateRecommendations,
  } = useAnalyzesContext();

  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [isCreatingNewAnalysis, setIsCreatingNewAnalysis] = useState(false);
  const [isUpdatingRecommendations, setIsUpdatingRecommendations] =
    useState(false);

  // SIMULACIÓN DE AI (MODIFICAR):
  const handleGetRecommendations = () => {
    setIsFormCollapsed(true);
    setIsAiGettingRecommendations(true);
    
    isAiThinkingService.setSubject(true);

    setTimeout(() => {
      if (!currentAnalysis.id) {
        const newAnalysis = {
          ...currentAnalysis,
          id: crypto.randomUUID(),
          createdAt: auxiliarAnalysis.createdAt,
          updatedAt: auxiliarAnalysis.updatedAt,
          isFavorite: auxiliarAnalysis.isFavorite,
          icon: auxiliarAnalysis.icon,
          link: auxiliarAnalysis.link,
          recommendations: auxiliarAnalysis.recommendations,
        };
        setCurrentAnalysis({ ...newAnalysis });
        setIsCreatingNewAnalysis(true);
      } else {
        const newRecommendations = {
          recommendations: auxiliarAnalysisTwo.recommendations,
        };
        setCurrentAnalysis({
          ...currentAnalysis,
          ...newRecommendations,
        });
        setIsUpdatingRecommendations(true);
      }
      setIsAiGettingRecommendations(false);
      setIsUserEditingInfo(false);
    }, 1000);
  };

  useEffect(() => {
    if (isCreatingNewAnalysis) {
      currentAnalysis.id && handleAddAnalysis();
      setIsCreatingNewAnalysis(false);
    }
  }, [isCreatingNewAnalysis]);

  useEffect(() => {
    if (isUpdatingRecommendations) {
      currentAnalysis.id && handleUpdateRecommendations();
      setIsUpdatingRecommendations(false);
    }
  }, [isUpdatingRecommendations]);

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
                {!isAiGettingRecommendations && (
                  <TransitionLink href='/'>
                    <Button type='button' variant='outline' className='w-full'>
                      <RefreshCcw className='w-4 h-4 mr-2' />
                      Cancel and retry
                    </Button>
                  </TransitionLink>
                )}
                {isAiGettingRecommendations ? (
                  <Button type='button' disabled className='flex items-center'>
                    <LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
                    Getting models
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    onClick={handleGetRecommendations}
                    className='flex items-center'
                  >
                    <AiStarsIcon className='mr-1.5 h-[18px] w-[18px]' />
                    Get models
                  </Button>
                )}
              </>
            ) : (
              <>
                {!isAiGettingRecommendations ? (
                  <>
                    <Button
                      variant='outline'
                      onClick={() => {
                        setIsUserEditingInfo(false);
                        setIsFormCollapsed(true);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      onClick={handleGetRecommendations}
                      className='flex items-center'
                    >
                      <AiStarsIcon className='mr-1.5 h-[18px] w-[18px]' />
                      Apply changes
                    </Button>
                  </>
                ) : (
                  <Button type='button' disabled className='flex items-center'>
                    <LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
                    Getting models
                  </Button>
                )}
              </>
            )
          ) : (
            <>
              <Button
                variant='outline'
                onClick={() => {
                  handleToggleFavorite(currentAnalysis.id as string);
                }}
              >
                {!currentAnalysis?.isFavorite ? (
                  <>
                    <Star className='w-4 h-4 mr-2' />
                    Favorite
                  </>
                ) : (
                  <>
                    <Star className='w-4 h-4 mr-2 fill-foreground' />
                    In favorites
                  </>
                )}
              </Button>
              <Button onClick={() => setIsUserEditingInfo(true)}>
                <PenLine className='w-4 h-4 mr-2' /> Edit info
              </Button>
            </>
          )}
        </DialogFooter>
      </StepTwoForm>
    </section>
  );
};

export default StepTwo;

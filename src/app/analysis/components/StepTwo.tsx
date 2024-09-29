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
import generateRandomUUID from '@/utils/generateRandomUUID';

interface StepTwoProps extends React.PropsWithChildren {
  setIsAiThinking: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepTwo: React.FC<StepTwoProps> = ({ setIsAiThinking }) => {
  const {
    currentAnalysis,
    setCurrentAnalysis,
    handleToggleFavorite,
    auxiliarAnalysis,
    auxiliarAnalysisTwo,
    handleAddAnalysis,
    handleUpdateRecommendations,
  } = useAnalyzesContext();

  const [isUserEditingInfo, setIsUserEditingInfo] = useState<boolean>(false);
  const [isFormCollapsed, setIsFormCollapsed] = useState(true);
  const [isFormBlocked, setIsFormBlocked] = useState(false);
  const [isButtonGettingRecommendations, setIsButtonGettingRecommendations] =
    useState<boolean>(false);

  const [isUseCreatingNewAnalysis, setIsUserCreatingNewAnalysis] =
    useState(false);
  const [isUserUpdatingRecommendations, setIsUserUpdatingRecommendations] =
    useState(false);

  useEffect(() => {
    if (!currentAnalysis.recommendations) {
      setIsUserEditingInfo(true);
      setIsFormCollapsed(false);
      setIsFormBlocked(true);
    } else {
      setIsUserEditingInfo(false);
      setIsFormCollapsed(true);
      setIsFormBlocked(false);
    }
  }, [currentAnalysis.recommendations]);

  useEffect(() => {
    if (isUserEditingInfo) {
      setIsFormCollapsed(false);
      setIsFormBlocked(true);
    }
  }, [isUserEditingInfo]);

  // SIMULACIÓN DE AI: CREACIÓN DE NUEVO ANÁLISIS
  const handleCreateNewAnalysis = () => {
    setIsFormCollapsed(true);
    setIsButtonGettingRecommendations(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    
    setTimeout(() => {
      setIsAiThinking(true);
      const id = generateRandomUUID();
      const newAnalysis = {
        ...currentAnalysis,
        id: id,
        createdAt: auxiliarAnalysis.createdAt,
        updatedAt: auxiliarAnalysis.updatedAt,
        isFavorite: auxiliarAnalysis.isFavorite,
        icon: auxiliarAnalysis.icon,
        link: auxiliarAnalysis.link,
        recommendations: auxiliarAnalysis.recommendations,
      };
      setCurrentAnalysis({ ...newAnalysis });
      setIsUserCreatingNewAnalysis(true);

      setIsButtonGettingRecommendations(false);
      setIsUserEditingInfo(false);
      setIsFormBlocked(false);
    }, 1000);
  };
  useEffect(() => {
    if (isUseCreatingNewAnalysis) {
      currentAnalysis.id && handleAddAnalysis();
      setIsUserCreatingNewAnalysis(false);
    }
  }, [isUseCreatingNewAnalysis]);

  // SIMULACIÓN DE AI: RENOVAR RECOMENDACIONES
  const handleGetNewRecommendations = () => {
    setIsFormCollapsed(true);
    setIsButtonGettingRecommendations(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setIsAiThinking(true);
      const newRecommendations = {
        recommendations: auxiliarAnalysisTwo.recommendations,
      };
      setCurrentAnalysis({
        ...currentAnalysis,
        ...newRecommendations,
      });
      setIsUserUpdatingRecommendations(true);
      setIsButtonGettingRecommendations(false);
      setIsUserEditingInfo(false);
      setIsFormBlocked(false);
    }, 1000);
  };
  useEffect(() => {
    if (isUserUpdatingRecommendations) {
      currentAnalysis.id && handleUpdateRecommendations();
      setIsUserUpdatingRecommendations(false);
    }
  }, [isUserUpdatingRecommendations]);

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
        isFormBlocked={isFormBlocked}
        isUserEditingInfo={isUserEditingInfo}
        onCollapseChange={(collapsed) => setIsFormCollapsed(collapsed)}
      >
        <DialogFooter className='mt-4 md:mt-0'>
          {isUserEditingInfo ? (
            !currentAnalysis?.recommendations ? (
              <>
                {!isButtonGettingRecommendations ? (
                  <>
                    <TransitionLink href='/'>
                      <Button
                        type='button'
                        variant='outline'
                        className='w-full'
                      >
                        <RefreshCcw className='w-4 h-4 mr-2' />
                        Cancel and retry
                      </Button>
                    </TransitionLink>
                    <Button
                      type='submit'
                      onClick={handleCreateNewAnalysis}
                      className='flex items-center'
                    >
                      <AiStarsIcon className='mr-1.5 h-[18px] w-[18px]' />
                      Get models
                    </Button>
                  </>
                ) : (
                  <Button type='button' disabled className='flex items-center'>
                    <LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
                    Getting models
                  </Button>
                )}
              </>
            ) : (
              <>
                {!isButtonGettingRecommendations ? (
                  <>
                    <Button
                      variant='outline'
                      onClick={() => {
                        setIsUserEditingInfo(false);
                        setIsFormCollapsed(true);
                        setIsFormBlocked(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      onClick={handleGetNewRecommendations}
                      className='flex items-center'
                    >
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
              <Button
                onClick={() => {
                  setIsUserEditingInfo(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
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

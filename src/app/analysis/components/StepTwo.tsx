'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LoaderCircle, PenLine, RefreshCcw, Star } from 'lucide-react';
import { AiStarsIcon } from '@/icons/AiStarsIcon';
import useTextReveal from '@/hooks/useTextReveal';
import { TransitionLink } from '@/components/TransitionLink';
import StepTwoForm from '@/components/Forms/StepTwo.form';
import { useEffect, useState } from 'react';
import { useAnalysesStore } from '@/store/analyses.store';
import { useCurrentAnalysisStore } from '@/store/currentAnalysis.store';

const StepTwo = () => {
  const currentAnalysis = useCurrentAnalysisStore((state) => state.currentAnalysis);
  const handleToggleFavorite = useAnalysesStore((state) => state.toggleFavorite);
  const [isUserEditingInfo, setIsUserEditingInfo] = useState<boolean>(false);
  const [isFormCollapsed, setIsFormCollapsed] = useState(true);
  const [isFormBlocked, setIsFormBlocked] = useState(false);
  const [isAiGettingRecommendations, setIsAiGettingRecommendations] = useState<boolean>(false);

  const formState = {
    isUserEditingInfo,
    setIsUserEditingInfo,
    isFormCollapsed,
    setIsFormCollapsed,
    isFormBlocked,
    setIsFormBlocked,
    isAiGettingRecommendations,
    setIsAiGettingRecommendations,
  };

  useEffect(() => {
    if (!currentAnalysis?.recommendations) {
      setIsUserEditingInfo(true);
      setIsFormCollapsed(false);
      setIsFormBlocked(true);
    } else {
      setIsUserEditingInfo(false);
      setIsFormCollapsed(true);
      setIsFormBlocked(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentAnalysis?.recommendations]);

  const handleEditInfo = () => {
    setIsUserEditingInfo(true);
    setIsFormCollapsed(false);
    setIsFormBlocked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditingInfo = () => {
    setIsUserEditingInfo(false);
    setIsFormCollapsed(true);
    setIsFormBlocked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full flex flex-col items-center gap-6">
      <header className="w-full flex items-center justify-center max-w-[70rem] relative pl-14 pr-8 md:pr-14">
        <TransitionLink href="/" className="absolute left-0 opacity-0 animate-fade-in [animation-fill-mode:forwards]">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </TransitionLink>
        {useTextReveal(currentAnalysis?.title || '')}
      </header>

      <StepTwoForm formState={formState} key={currentAnalysis?.id}>
        <footer className="mt-4 md:mt-0 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {isUserEditingInfo ? (
            !currentAnalysis?.recommendations ? (
              <>
                {!isAiGettingRecommendations ? (
                  <>
                    <TransitionLink href="/">
                      <Button type="button" variant="outline" className="w-full">
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Cancel and retry
                      </Button>
                    </TransitionLink>
                    <Button type="submit" className="flex items-center">
                      <AiStarsIcon className="mr-1.5 h-[18px] w-[18px]" />
                      Get models
                    </Button>
                  </>
                ) : (
                  <Button type="button" disabled className="flex items-center">
                    <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                    Getting models
                  </Button>
                )}
              </>
            ) : (
              <>
                {!isAiGettingRecommendations ? (
                  <>
                    <Button type="reset" variant="outline" onClick={cancelEditingInfo}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex items-center">
                      Apply changes
                    </Button>
                  </>
                ) : (
                  <Button type="button" disabled className="flex items-center">
                    <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                    Getting models
                  </Button>
                )}
              </>
            )
          ) : (
            <>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  handleToggleFavorite(currentAnalysis?.id as string);
                }}
              >
                {!currentAnalysis?.isFavorite ? (
                  <>
                    <Star className="w-4 h-4 mr-2" />
                    Favorite
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 mr-2 fill-foreground" />
                    In favorites
                  </>
                )}
              </Button>
              <Button type="button" onClick={handleEditInfo}>
                <PenLine className="w-4 h-4 mr-2" /> Edit info
              </Button>
            </>
          )}
        </footer>
      </StepTwoForm>
    </section>
  );
};

export default StepTwo;

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useAnalysesStore } from '@/store/analyses.store';
import { useCurrentAnalysisStore } from '@/store/currentAnalysis.store';

export function useAnalysesView() {
  const pathname = usePathname();
  const router = useRouter();

  const analyses = useAnalysesStore((state) => state.analyses);
  const setCurrentAnalysis = useCurrentAnalysisStore((state) => state.setCurrentAnalysis);

  const analysesView = useMemo(
    () =>
      analyses
        .slice()
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .map(({ id, title, isFavorite }) => ({ id, title, isFavorite })),
    [analyses]
  );

  const recentsView = useMemo(() => analysesView.filter((a) => !a.isFavorite), [analysesView]);
  const favoritesView = useMemo(() => analysesView.filter((a) => a.isFavorite), [analysesView]);

  const handleSelectAnalysis = (id: string) => {
    const found = analyses.find((a) => a.id === id);
    const main = document.querySelector('main');
    if (!found || !main || (pathname === '/analysis' && found.id === useCurrentAnalysisStore.getState().currentAnalysis?.id)) return;

    main?.classList.add('page-transition');

    setTimeout(() => {
      if (pathname !== '/analysis') {
        setCurrentAnalysis(found);
        router.push('/analysis');
      } else {
        setCurrentAnalysis(found);
        main?.classList.remove('page-transition');
      }
    }, 250);
  };

  return {
    analysesView,
    recentsView,
    favoritesView,
    handleSelectAnalysis,
  };
}

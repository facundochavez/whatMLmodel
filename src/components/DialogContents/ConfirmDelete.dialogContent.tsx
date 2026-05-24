'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAnalysesStore } from '@/store/analyses.store';
import { useCurrentAnalysisStore } from '@/store/currentAnalysis.store';
import { useGlobalStore } from '@/store/global.store';
import sleep from '@/utils/sleep';

const ConfirmDeleteDialogContent: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const markedAnalysisId = useAnalysesStore((state) => state.markedAnalysisId);
  const deleteAnalysis = useAnalysesStore((state) => state.deleteAnalysis);
  const closeUserMenus = useGlobalStore((state) => state.closeUserMenus);
  const setShowDeleteDialog = useGlobalStore((state) => state.setShowDeleteDialog);

  const handleDelete = () => {
    const analysisId = markedAnalysisId;

    setShowDeleteDialog(false);
    closeUserMenus();

    void (async () => {
      await sleep(300);

      const currentAnalysis = useCurrentAnalysisStore.getState().currentAnalysis;
      const isCurrentAnalysis = analysisId === currentAnalysis?.id;

      if (!isCurrentAnalysis) {
        deleteAnalysis(analysisId);
        return;
      }

      if (pathname === '/analysis') {
        const main = document.querySelector('main');
        if (main) {
          main.classList.add('page-transition');
          void main.offsetHeight;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          await sleep(250);
          router.push('/');
        }
      }

      await sleep(1500);
      deleteAnalysis(analysisId);
    })();
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete this analysis?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ConfirmDeleteDialogContent;

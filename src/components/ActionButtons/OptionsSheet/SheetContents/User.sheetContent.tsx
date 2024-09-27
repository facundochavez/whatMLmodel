import { Star, LogOut, History, CirclePlus, UserRound } from 'lucide-react';
import ConfirmDeleteDialogContent from '@/components/DialogContents/ConfirmDelete.dialogContent';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AnalysisActionsDropdown from '@/components/ActionButtons/AnalysisDropdown/AnalysisActions.dropdown';

import { SheetClose } from '@/components/ui/sheet';
import { useGlobalContext } from '@/context/global.context';
import { useAnalyzesContext } from '@/context/analyzes.context';

const UserSheetContent = () => {
  const pathname = usePathname();
  const { setShowAccountSettingsDialog } = useGlobalContext();
  const { recentsView, favoritesView } = useAnalyzesContext();

  return (
    <div className='flex flex-col gap-4 h-full overflow-y-hidden w-full'>
      {pathname === '/analysis' && (
        <header className='flex flex-col gap-2 w-full -mb-2'>
          <SheetClose asChild>
            <Button variant='secondary'>
              <CirclePlus className='mr-2 h-4 w-4' />
              <span>New analysis</span>
            </Button>
          </SheetClose>
        </header>
      )}

      <AlertDialog>
        <div className='flex flex-col h-full overflow-auto gap-2 [&>label]:text-muted-foreground mt-2'>
          {favoritesView.length !== 0 && (
            <>
              <Label className='flex items-center'>
                <Star className='h-4 w-4 mr-2' />
                <span>Favorites</span>
              </Label>

              <ul>
                {favoritesView.map((favoriteView) => {
                  return (
                    <SheetClose asChild>
                      <li className='relative h-8' key={favoriteView.id}>
                        <Button
                          variant='ghost'
                          className='flex w-full text-left h-full px-0 pr-8 font-normal'
                        >
                          <span className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                            {favoriteView.title}
                          </span>
                        </Button>
                        <div className='absolute right-0 top-0'>
                          <AnalysisActionsDropdown
                            analysisId={favoriteView.id as string}
                            isFavorite
                          />
                        </div>
                      </li>
                    </SheetClose>
                  );
                })}
              </ul>
            </>
          )}

          {favoritesView.length !== 0 && recentsView.length !== 0 && <Separator className='mt-2 mb-3' />}

          {recentsView.length !== 0 && (
            <>
              <Label className='flex items-center'>
                <History className='h-4 w-4 mr-2' />
                <span>Recents</span>
              </Label>

              <ul>
                {recentsView.map((recentView) => {
                  return (
                    <li className='relative h-8' key={recentView.id}>
                      <Button
                        variant='ghost'
                        className='flex w-full text-left h-full px-0 pr-8 font-normal'
                      >
                        <span className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                          {recentView.title}
                        </span>
                      </Button>
                      <div className='absolute right-0 top-0'>
                        <AnalysisActionsDropdown
                          analysisId={recentView.id as string}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
        <ConfirmDeleteDialogContent />
      </AlertDialog>

      <footer className='flex flex-col gap-2'>
        <SheetClose asChild>
          <Button
            className='w-full'
            onClick={() => setShowAccountSettingsDialog(true)}
          >
            <UserRound className='mr-2 h-4 w-4' />
            <span>Account settings</span>
          </Button>
        </SheetClose>
        <AlertDialogTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SheetClose asChild>
            <Button variant='outline'>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </Button>
          </SheetClose>
        </AlertDialogTrigger>
      </footer>
    </div>
  );
};

export default UserSheetContent;

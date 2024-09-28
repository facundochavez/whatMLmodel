import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Star,
  LogOut,
  History,
  CirclePlus,
  Menu,
  UserRound,
} from 'lucide-react';
import ConfirmDeleteDialogContent from '@/components/DialogContents/ConfirmDelete.dialogContent';

import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import AnalysisActionsDropdown from '@/components/ActionButtons/AnalysisDropdown/AnalysisActions.dropdown';
import { useGlobalContext } from '@/context/global.context';
import { useAnalyzesContext } from '@/context/analyzes.context';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

const UserDropdown: React.FC = () => {
  const pathname = usePathname();
  const { setShowAccountSettingsDialog } = useGlobalContext();
  const { analyzesView, recentsView, favoritesView, handleSelectAnalysis } =
    useAnalyzesContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='min-w-36 z-[150]' loop>
        {pathname === '/analysis' && (
          <>
            <DropdownMenuItem className='font-semibold md:hidden'>
              <CirclePlus className='mr-2 h-4 w-4' />
              <span>New analysis</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className='md:hidden' />
          </>
        )}

        <AlertDialog>
          {favoritesView.length !== 0 && (
            <>
              <DropdownMenuLabel className='flex items-center text-muted-foreground'>
                <Star className='h-4 w-4 mr-2' />
                <span>Favorites</span>
              </DropdownMenuLabel>
              <ScrollArea
                style={{
                  height: `${
                    (analyzesView.length <= 10
                      ? favoritesView.length
                      : favoritesView.length <= 5
                      ? favoritesView.length
                      : 4.6) * 32
                  }px`,
                }}
              >
                <DropdownMenuGroup className='overflow-auto /*max-h-40*/ max-w-52'>
                  {favoritesView.map((favoriteView) => {
                    return (
                      <div
                        className='w-full flex justify-between relative'
                        key={favoriteView.id}
                      >
                        <DropdownMenuItem
                          className='w-full'
                          onClick={() =>
                            handleSelectAnalysis(favoriteView.id as string)
                          }
                        >
                          <span className='line-clamp-1 pr-8 w-full'>
                            {favoriteView.title}
                          </span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className='p-0 absolute right-0'>
                          <AnalysisActionsDropdown
                            analysisId={favoriteView.id as string}
                            isFavorite
                          />
                        </DropdownMenuItem>
                      </div>
                    );
                  })}
                </DropdownMenuGroup>
              </ScrollArea>
              <DropdownMenuSeparator />
            </>
          )}

          {recentsView.length !== 0 && (
            <>
              <DropdownMenuLabel className='flex items-center text-muted-foreground'>
                <History className='h-4 w-4 mr-2' />
                <span>Recents</span>
              </DropdownMenuLabel>
              <ScrollArea
                style={{
                  height: `${
                    (analyzesView.length <= 10
                      ? recentsView.length
                      : recentsView.length <= 5
                      ? recentsView.length
                      : 4.6) * 32
                  }px`,
                }}
              >
                <DropdownMenuGroup className='overflow-auto /*max-h-40*/ max-w-52'>
                  {recentsView.map((recentView) => {
                    return (
                      <div
                        className='w-full flex justify-between relative'
                        key={recentView.id}
                      >
                        <DropdownMenuItem
                          className='w-full'
                          onClick={() =>
                            handleSelectAnalysis(recentView.id as string)
                          }
                        >
                          <span className='line-clamp-1 pr-8 w-full'>
                            {recentView.title}
                          </span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className='p-0 absolute right-0'>
                          <AnalysisActionsDropdown
                            analysisId={recentView.id as string}
                          />
                        </DropdownMenuItem>
                      </div>
                    );
                  })}
                </DropdownMenuGroup>
              </ScrollArea>
              <DropdownMenuSeparator />
            </>
          )}
          <ConfirmDeleteDialogContent />
        </AlertDialog>

        <DropdownMenuItem
          className='font-semibold'
          onClick={() => setShowAccountSettingsDialog(true)}
        >
          <UserRound className='mr-2 h-4 w-4' />
          <span>Account settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <AlertDialogTrigger asChild>
          <DropdownMenuItem className='font-semibold'>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
          </DropdownMenuItem>
        </AlertDialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

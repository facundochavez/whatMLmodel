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
  Trash,
  Star,
  LogOut,
  History,
  Ellipsis,
  StarOff,
  CirclePlus,
} from 'lucide-react';
import infoResponsesData from '@/prompts/infoResponses.data.json';
import { recentResponses } from '@/types';
import ConfirmDeleteDialogContent from '@/components/DialogsContents/ConfirmDelete.dialogContent';
import ConfirmLogoutDialogContent from '@/components/DialogsContents/ConfirmLogout.dialogContent';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface UserDropdownProps {
  children?: React.ReactNode;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ children }) => {
  const [action, setAction] = useState('log-out');

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='min-w-36' loop>
          <DropdownMenuItem>
            <CirclePlus className='mr-2 h-4 w-4' />
            <span>New analysis</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuLabel className='flex items-center'>
            <Star className='h-4 w-4  mr-2' />
            <span>Favorites</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup
            className='overflow-auto max-h-40 max-w-52'
            onClick={() => setAction('delete-analysis')}
          >
            {infoResponsesData.slice(0, 3).map((item: recentResponses) => (
              <div
                className='w-full flex justify-between'
                key={item.output.alias}
              >
                <DropdownMenuItem className='w-full'>
                  <span className='line-clamp-1 pr-4 w-full'>
                    {item.output.name}
                  </span>
                </DropdownMenuItem>
                <ActionsForRecentMenu isFavorite setAction={setAction} />
              </div>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuLabel className='flex items-center'>
            <History className='h-4 w-4 mr-2' />
            <span>Recent</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup className='overflow-auto max-h-40 max-w-52'>
            {infoResponsesData.slice(3, 7).map((item: recentResponses) => (
              <div
                className='w-full flex jkustify-between'
                key={item.output.alias}
              >
                <DropdownMenuItem className='w-full'>
                  <span className='line-clamp-1 pr-4 w-full'>
                    {item.output.name}
                  </span>
                </DropdownMenuItem>
                <ActionsForRecentMenu setAction={setAction} />
              </div>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <AlertDialogTrigger
            asChild
            onClick={(e) => {
              e.stopPropagation();
              setAction('log-out');
            }}
          >
            <DropdownMenuItem>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      {action === 'delete-analysis' ? (
        <ConfirmDeleteDialogContent />
      ) : (
        <ConfirmLogoutDialogContent />
      )}
    </AlertDialog>
  );
};

type ActionsForRecentMenuProps = {
  isFavorite?: boolean;
  setAction?: (action: string) => void;
};

const ActionsForRecentMenu: React.FC<ActionsForRecentMenuProps> = ({
  isFavorite = false,
  setAction = () => {},
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
      }}
      className='p-0 absolute right-[5px]'
    >
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <Button
            variant='ghost'
            className='h-full w-6 p-1 flex opacity-50 hover:opacity-100'
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent onClick={(e) => e.stopPropagation()} loop>
          {!isFavorite ? (
            <DropdownMenuItem>
              <Star className='mr-2 h-4 w-4' />
              <span>Favorite</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <StarOff className='mr-2 h-4 w-4' />
              <span>Remove</span>
            </DropdownMenuItem>
          )}

          <AlertDialogTrigger
            asChild
            onClick={(e) => {
              e.stopPropagation();
              setAction('delete-analysis');
            }}
          >
            <DropdownMenuItem>
              <Trash className='mr-2 h-4 w-4' />
              <span>Delete</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </DropdownMenuItem>
  );
};

export default UserDropdown;

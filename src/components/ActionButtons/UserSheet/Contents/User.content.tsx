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
import ViewButton from '@/components/TablesGroup/DatasetSelector/ViewButton/ViewButton';
import { Label } from '@/components/ui/label';

interface UserDropdownProps {
  children?: React.ReactNode;
}
ViewButton;
const UserContent: React.FC<UserDropdownProps> = ({ children }) => {
  const [action, setAction] = useState('log-out');

  return (
    <AlertDialog>
      <div className='h-full flex flex-col justify-between'>
        <div className='flex flex-col gap-3'>
          <Label className='flex items-center'>
            <Star className='h-4 w-4  mr-2' />
            <span>Favorites</span>
          </Label>

          <ul
            className='overflow-auto max-h-40 max-w-52'
            onClick={() => setAction('delete-analysis')}
          >
            {infoResponsesData.slice(0, 3).map((item: recentResponses) => (
              <div
                className='w-full flex justify-between'
                key={item.output.alias}
              >
                <li className='w-full'>
                  <span className='line-clamp-1 pr-4 w-full'>
                    {item.output.name}
                  </span>
                </li>
                {/* <ActionsForRecentMenu isFavorite setAction={setAction} /> */}
              </div>
            ))}
          </ul>

          <Label className='flex items-center'>
            <History className='h-4 w-4 mr-2' />
            <span>Recent</span>
          </Label>

          <ul className='overflow-auto max-h-40 max-w-52'>
            {infoResponsesData.slice(3, 7).map((item: recentResponses) => (
              <div
                className='w-full flex jkustify-between'
                key={item.output.alias}
              >
                <li className='w-full'>
                  <span className='line-clamp-1 pr-4 w-full'>
                    {item.output.name}
                  </span>
                </li>
                {/* <ActionsForRecentMenu setAction={setAction} /> */}
              </div>
            ))}
          </ul>
        </div>
        <footer className='flex flex-col gap-2'>
          <Button variant='secondary'>
            <CirclePlus className='mr-2 h-4 w-4' />
            <span>New analysis</span>
          </Button>

          <AlertDialogTrigger
            asChild
            onClick={(e) => {
              e.stopPropagation();
              setAction('log-out');
            }}
          >
            <Button variant='outline'>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </Button>
          </AlertDialogTrigger>

          {action === 'delete-analysis' ? (
            <ConfirmDeleteDialogContent />
          ) : (
            <ConfirmLogoutDialogContent />
          )}
        </footer>
      </div>
    </AlertDialog>
  );
};

type ActionsForRecentMenuProps = {
  isFavorite?: boolean;
  setAction?: (action: string) => void;
};

/* const ActionsForRecentMenu: React.FC<ActionsForRecentMenuProps> = ({
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
      className='p-0 absolute right-1.5'
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
}; */

export default UserContent;

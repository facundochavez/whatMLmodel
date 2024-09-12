import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash, Ellipsis, Star, StarOff } from 'lucide-react';

type AnalysisActionsDropdownProps = {
  isFavorite?: boolean;
};

const AnalysisActionsDropdown: React.FC<AnalysisActionsDropdownProps> = ({
  isFavorite = false,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant='ghost'
          className='h-full w-6 p-1 flex opacity-50 hover:opacity-100'
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        loop
        align='end'
        className='z-[200]'
      >
        {!isFavorite ? (
          <DropdownMenuItem>
            <Star className='mr-2.5 h-3.5 w-3.5' />
            <span>Favorite</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <StarOff className='mr-2.5 h-3.5 w-3.5' />
            <span>Remove</span>
          </DropdownMenuItem>
        )}

        <AlertDialogTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DropdownMenuItem>
            <Trash className='mr-2.5 h-3.5 w-3.5' />
            <span>Delete</span>
          </DropdownMenuItem>
        </AlertDialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnalysisActionsDropdown;

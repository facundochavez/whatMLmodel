import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash, Ellipsis, Star, StarOff } from 'lucide-react';
import { useAnalyzesContext } from '@/context/analyzes.context';

type AnalysisActionsDropdownProps = {
  analysisId: string;
  isFavorite?: boolean;
};

const AnalysisActionsDropdown: React.FC<AnalysisActionsDropdownProps> = ({
  analysisId,
  isFavorite = false,
}) => {
  const { handleToggleFavorite, setSelectedAnalysisId } = useAnalyzesContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          asChild
          size='icon'
          variant='ghost'
          className='h-[32px] w-6 p-1 flex opacity-50 hover:opacity-100'
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        loop
        align='end'
        className='z-[200]'
      >
        <DropdownMenuItem onClick={() => handleToggleFavorite(analysisId)}>
          {!isFavorite ? (
            <>
              <Star className='mr-2.5 h-3.5 w-3.5' />
              <span>Favorite</span>
            </>
          ) : (
            <>
              <StarOff className='mr-2.5 h-3.5 w-3.5' />
              <span>Unfavorite</span>
            </>
          )}
        </DropdownMenuItem>

        <AlertDialogTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
            setSelectedAnalysisId(analysisId as string);
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

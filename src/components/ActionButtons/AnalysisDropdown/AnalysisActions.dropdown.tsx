import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Trash, Ellipsis, Star, StarOff } from 'lucide-react';
import { useAnalysesStore } from '@/store/analyses.store';
import { useGlobalStore } from '@/store/global.store';

type AnalysisActionsDropdownProps = {
  analysisId: string;
  isFavorite?: boolean;
};

const AnalysisActionsDropdown: React.FC<AnalysisActionsDropdownProps> = ({ analysisId, isFavorite = false }) => {
  const toggleFavorite = useAnalysesStore((state) => state.toggleFavorite);
  const setMarkedAnalysisId = useAnalysesStore((state) => state.setMarkedAnalysisId);
  const setShowDeleteDialog = useGlobalStore((state) => state.setShowDeleteDialog);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="h-[32px] w-8 p-2 flex opacity-50 hover:opacity-100 hover:bg-transparent">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        loop
        align="end"
        className="z-[200]"
      >
        <DropdownMenuItem onClick={() => toggleFavorite(analysisId)}>
          {!isFavorite ? (
            <>
              <Star className="mr-2.5 h-3.5 w-3.5" />
              <span>Favorite</span>
            </>
          ) : (
            <>
              <StarOff className="mr-2.5 h-3.5 w-3.5" />
              <span>Unfavorite</span>
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setMarkedAnalysisId(analysisId);
            setShowDeleteDialog(true);
          }}
        >
          <Trash className="mr-2.5 h-3.5 w-3.5" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnalysisActionsDropdown;

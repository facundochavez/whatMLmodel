import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  UserRound,
  Trash,
  Star,
  LogIn,
  LogOut,
  CircleUserRound,
  History,
  Ellipsis,
  StarOff,
} from 'lucide-react';
import infoResponsesData from '@/prompts/infoResponses.data.json';
import { recentResponses } from '@/types';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogTrigger } from '@/components/ui/dialog';
import ConfirmDeleteDialog from '@/components/DialogsContent/ConfirmDeleteDialogContent';
import AuthDropdown from './Dropdowns/AuthDropdown';
import UserDropdown from './Dropdowns/UserDropdown';

const UserMenuButton: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const trigger = (
      <Button variant='outline' size='icon'>
        <UserRound className='h-5 w-5 rotate-0 scale-100 transition-all' />
        <span className='sr-only'>Toggle menu</span>
      </Button>
    
  );

  return !isLoggedIn ? (
    <AuthDropdown>{trigger}</AuthDropdown>
  ) : (
    <UserDropdown>{trigger}</UserDropdown>
  );
};

export default UserMenuButton;
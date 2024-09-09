import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';
import { useState } from 'react';
import AuthDropdown from './Dropdowns/Auth.dropdown';
import UserDropdown from './Dropdowns/User.dropdown';

const UserMenuButton: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
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

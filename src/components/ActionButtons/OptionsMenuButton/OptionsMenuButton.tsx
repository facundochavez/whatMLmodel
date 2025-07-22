import AuthDropdown from './Dropdowns/Auth.dropdown';
import UserDropdown from './Dropdowns/User.dropdown';
import { useGlobalStore } from '@/store/global.store';

const OptionsMenuButton: React.FC = () => {
  const isUserLoggedIn = useGlobalStore((state) => state.isUserLoggedIn);
  return !isUserLoggedIn ? <AuthDropdown /> : <UserDropdown />;
};

export default OptionsMenuButton;
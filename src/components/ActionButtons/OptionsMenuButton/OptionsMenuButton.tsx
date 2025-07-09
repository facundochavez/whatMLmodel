import { useGlobalContext } from '@/context/global.context';
import AuthDropdown from './Dropdowns/Auth.dropdown';
import UserDropdown from './Dropdowns/User.dropdown';

const OptionsMenuButton: React.FC = () => {
  const { isUserLoggedIn } = useGlobalContext();
  return !isUserLoggedIn ? <AuthDropdown /> : <UserDropdown />;
};

export default OptionsMenuButton;
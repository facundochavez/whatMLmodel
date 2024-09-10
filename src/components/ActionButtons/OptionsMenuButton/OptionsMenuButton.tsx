import AuthDropdown from './Dropdowns/Auth.dropdown';
import UserDropdown from './Dropdowns/User.dropdown';

const OptionsMenuButton: React.FC<{ isLoggedIn: boolean }> = ({
  isLoggedIn,
}) => {
  return !isLoggedIn ? <AuthDropdown /> : <UserDropdown />;
};

export default OptionsMenuButton;

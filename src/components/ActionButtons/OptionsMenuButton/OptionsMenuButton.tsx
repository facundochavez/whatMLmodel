import AuthDropdown from './Dropdowns/Auth.dropdown';
import UserDropdown from './Dropdowns/User.dropdown';

const OptionsMenuButton: React.FC<{ isUserLoggedIn: boolean }> = ({
  isUserLoggedIn,
}) => {
  return !isUserLoggedIn ? <AuthDropdown /> : <UserDropdown />;
};

export default OptionsMenuButton;

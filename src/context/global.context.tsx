'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pipeline } from '@/types';

interface GlobalContextProps {
  isUserLoggedIn: boolean;
  userEmail: string;

  isMobile: boolean;
  isUserRegistering: boolean;
  setIsUserRegistering: React.Dispatch<React.SetStateAction<boolean>>;

  showAuthDialog: boolean;
  setShowAuthDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showAccountSettingsDialog: boolean;
  setShowAccountSettingsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showChangePasswordDialog: boolean;
  setShowChangePasswordDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showApiKeyDialog: boolean;
  setShowApiKeyDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showResetPasswordDialog: boolean;
  setShowResetPasswordDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  // MOVER A REDUX
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(true);
  const userEmail = 'your_email@gmail.com';



  // BASICS
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isUserRegistering, setIsUserRegistering] = useState<boolean>(false);

  // DIALOGS STATES
  const [showAuthDialog, setShowAuthDialog] = useState<boolean>(false);
  const [showAccountSettingsDialog, setShowAccountSettingsDialog] =
    useState<boolean>(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState<boolean>(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState<boolean>(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] =
    useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isUserLoggedIn,
        userEmail,
        isMobile,
        isUserRegistering,
        setIsUserRegistering,
        showAuthDialog,
        setShowAuthDialog,
        showAccountSettingsDialog,
        setShowAccountSettingsDialog,
        showChangePasswordDialog,
        setShowChangePasswordDialog,
        showApiKeyDialog,
        setShowApiKeyDialog,
        showResetPasswordDialog,
        setShowResetPasswordDialog,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export default GlobalProvider;

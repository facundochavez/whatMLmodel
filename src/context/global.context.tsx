import React, { createContext, useContext, useState, useEffect } from 'react';

interface GlobalContextProps {
  isLoggedIn: boolean;
  isMobile: boolean;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isRegistering: boolean;
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(true);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const [isUserRegistering, setIsUserRegistering] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

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
        isLoggedIn: isUserLoggedIn,
        isMobile,
        showDialog,
        setShowDialog,
        isRegistering: isUserRegistering,
        setIsRegistering: setIsUserRegistering,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export default GlobalProvider;
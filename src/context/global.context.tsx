'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GlobalContextProps {
  isUserLoggedIn: boolean;
  userEmail: string;
  currentAnalysis: any;
  isMobile: boolean;
  isUserRegistering: boolean;
  setIsUserRegistering: React.Dispatch<React.SetStateAction<boolean>>;
  isAiThinking: boolean;
  setIsAiThinking: React.Dispatch<React.SetStateAction<boolean>>;
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
  selectedStep: number;
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  isGeneratingInfo: boolean;
  setIsGeneratingInfo: React.Dispatch<React.SetStateAction<boolean>>;
  isGettingModels: boolean;
  setIsGettingModels: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(true);
  const userEmail = 'your_email@gmail.com';
  const [currentAnalysis, setCurrentAnalysis] = useState<any>({
    title: 'Titanic Survivors',
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isUserRegistering, setIsUserRegistering] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // DIALOGS STATES
  const [showAuthDialog, setShowAuthDialog] = useState<boolean>(false);
  const [showAccountSettingsDialog, setShowAccountSettingsDialog] =
    useState<boolean>(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState<boolean>(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState<boolean>(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] =
    useState<boolean>(false);

  // ANALYSIS STEPS
  const [selectedStep, setSelectedStep] = useState<number>(1);

  //AUXILIAR PARA SIMULAR EL ESTADO DE CARGA
  const [isGeneratingInfo, setIsGeneratingInfo] = useState<boolean>(false);
  const [isGettingModels, setIsGettingModels] = useState<boolean>(false);

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
        currentAnalysis,
        isMobile,
        isUserRegistering,
        setIsUserRegistering,
        isAiThinking,
        setIsAiThinking,
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
        selectedStep,
        setSelectedStep,
        isGeneratingInfo,
        setIsGeneratingInfo,
        isGettingModels,
        setIsGettingModels,
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

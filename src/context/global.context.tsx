'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ModelResponse } from '@/types';

interface GlobalContextProps {
  isUserLoggedIn: boolean;
  userEmail: string;
  currentAnalysis: ModelResponse;
  setCurrentAnalysis: React.Dispatch<React.SetStateAction<ModelResponse>>;
  isAiGeneratingInfo: boolean;
  setIsAiGeneratingInfo: React.Dispatch<React.SetStateAction<boolean>>;
  isAiGettingRecommendations: boolean;
  setIsAiGettingRecommendations: React.Dispatch<React.SetStateAction<boolean>>;
  currentAnalysisIndex: number;
  selectedAnalysisId: string;
  setSelectedAnalysisId: React.Dispatch<React.SetStateAction<string>>;

  isMobile: boolean;
  isUserRegistering: boolean;
  setIsUserRegistering: React.Dispatch<React.SetStateAction<boolean>>;
  isAiThinking: boolean;
  setIsAiThinking: React.Dispatch<React.SetStateAction<boolean>>;
  isUserEditingInfo: boolean;
  setIsUserEditingInfo: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [currentAnalysis, setCurrentAnalysis] = useState<ModelResponse>({});
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string>('');

  //AUXILIARES PARA SIMULAR LA GENERACIÓN DE INFO Y EL ESTADO DE CARGA (BORRAR AL FINAL)
  const [isAiGeneratingInfo, setIsAiGeneratingInfo] = useState<boolean>(false);
  const [isAiGettingRecommendations, setIsAiGettingRecommendations] =
    useState<boolean>(false);
  const currentAnalysisIndex = 0;

  // BASICS
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isUserRegistering, setIsUserRegistering] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [isUserEditingInfo, setIsUserEditingInfo] = useState<boolean>(false);

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

  useEffect(() => {
    setTimeout(() => {
      setIsAiThinking(false);
    }, 3000);
  }, [isAiThinking]);

  return (
    <GlobalContext.Provider
      value={{
        isUserLoggedIn,
        userEmail,
        currentAnalysis,
        setCurrentAnalysis,
        isAiGeneratingInfo,
        setIsAiGeneratingInfo,
        isAiGettingRecommendations,
        setIsAiGettingRecommendations,
        currentAnalysisIndex,
        selectedAnalysisId,
        setSelectedAnalysisId,

        isMobile,
        isUserRegistering,
        setIsUserRegistering,
        isAiThinking,
        setIsAiThinking,
        isUserEditingInfo,
        setIsUserEditingInfo,
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

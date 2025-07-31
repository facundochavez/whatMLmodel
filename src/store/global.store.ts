import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pipeline } from '@/types/pipeline.types';

export interface GlobalStore {
  // Importants
  availableFreeAnalyses: number;
  userGeminiApiKey: string;
  isUserLoggedIn: boolean;
  userEmail: string;
  geminiErrorOccurred: boolean;
  decrementAvailableFreeAnalyses: () => void;
  setUserGeminiApiKey: (apiKey: string) => void;
  setIsUserLoggedIn: (value: boolean) => void;
  setUserEmail: (email: string) => void;
  setGeminiErrorOccurred: (value: boolean) => void;

  // Basics
  isMobile: boolean;
  selectedPipeline: Pipeline | null;
  selectedPipelineModelIndex: string;
  isAiThinking: boolean;
  transitionToHomePage: boolean;
  setIsMobile: (value: boolean) => void;
  setSelectedPipeline: (pipeline: Pipeline | null) => void;
  setSelectedPipelineModelIndex: (index: string) => void;
  setIsAiThinking: (value: boolean) => void;
  onOpenChangePipelineDialog: () => void;

  //Minors
  isUserRegistering: boolean;
  showAuthDialog: boolean;
  showAccountSettingsDialog: boolean;
  showChangePasswordDialog: boolean;
  showApiKeyDialog: boolean;
  showResetPasswordDialog: boolean;
  setIsUserRegistering: (value: boolean) => void;
  setShowAuthDialog: (value: boolean) => void;
  setShowAccountSettingsDialog: (value: boolean) => void;
  setShowChangePasswordDialog: (value: boolean) => void;
  setShowApiKeyDialog: (value: boolean) => void;
  setShowResetPasswordDialog: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      // Importants
      availableFreeAnalyses: 2,
      userGeminiApiKey: '',
      isUserLoggedIn: true,
      userEmail: '',
      geminiErrorOccurred: false,
      decrementAvailableFreeAnalyses: () => {
        const current = get().availableFreeAnalyses;
        if (current > 0) {
          set({ availableFreeAnalyses: current - 1 });
        }
      },
      setUserGeminiApiKey: (apiKey: string) => set({ userGeminiApiKey: apiKey }),
      setIsUserLoggedIn: (value: boolean) => set({ isUserLoggedIn: value }),
      setUserEmail: (email: string) => set({ userEmail: email }),
      setGeminiErrorOccurred: (value: boolean) => set({ geminiErrorOccurred: value }),

      // Basics
      isMobile: false,
      selectedPipeline: null,
      selectedPipelineModelIndex: '0',
      isAiThinking: false,
      transitionToHomePage: false,
      setIsMobile: (value: boolean) => set({ isMobile: value }),
      setSelectedPipeline: (pipeline: Pipeline | null) => set({ selectedPipeline: pipeline }),
      setSelectedPipelineModelIndex: (index: string) => set({ selectedPipelineModelIndex: index }),
      setIsAiThinking: (value: boolean) => set({ isAiThinking: value }),
      onOpenChangePipelineDialog: () => {
        const { setSelectedPipelineModelIndex } = get();
        setTimeout(() => setSelectedPipelineModelIndex('0'), 500);
      },

      // Minors
      isUserRegistering: false,
      showAuthDialog: false,
      showAccountSettingsDialog: false,
      showChangePasswordDialog: false,
      showApiKeyDialog: false,
      showResetPasswordDialog: false,
      setIsUserRegistering: (value: boolean) => set({ isUserRegistering: value }),
      setShowAuthDialog: (value: boolean) => set({ showAuthDialog: value }),
      setShowAccountSettingsDialog: (value: boolean) => set({ showAccountSettingsDialog: value }),
      setShowChangePasswordDialog: (value: boolean) => set({ showChangePasswordDialog: value }),
      setShowApiKeyDialog: (value: boolean) => set({ showApiKeyDialog: value }),
      setShowResetPasswordDialog: (value: boolean) => set({ showResetPasswordDialog: value }),
    }),
    {
      name: 'global-store',
      partialize: (state) => ({
        // Only save the important values
        availableFreeAnalyses: state.availableFreeAnalyses,
        userGeminiApiKey: state.userGeminiApiKey,
        isUserLoggedIn: state.isUserLoggedIn,
        userEmail: state.userEmail,
      }),
    }
  )
);
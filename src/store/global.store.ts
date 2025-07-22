import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pipeline } from '@/types/pipeline.types';

export interface GlobalStore {
  // Importants
  availableFreeAnalyses: number;
  userGeminiApiKey: string;
  isUserLoggedIn: boolean;
  userEmail: string;
  decrementAvailableFreeAnalyses: () => void;
  setUserGeminiApiKey: (apiKey: string) => void;
  setIsUserLoggedIn: (value: boolean) => void;
  setUserEmail: (email: string) => void;

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
  toggleTransitionToHomePage: () => void;
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
      availableFreeAnalyses: 3,
      userGeminiApiKey: '',
      isUserLoggedIn: true,
      userEmail: '',
      decrementAvailableFreeAnalyses: () => {
        const current = get().availableFreeAnalyses;
        if (current > 0) {
          set({ availableFreeAnalyses: current - 1 });
        }
      },
      setUserGeminiApiKey: (apiKey: string) => set({ userGeminiApiKey: apiKey }),
      setIsUserLoggedIn: (value: boolean) => set({ isUserLoggedIn: value }),
      setUserEmail: (email: string) => set({ userEmail: email }),

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
      toggleTransitionToHomePage: () => set((state) => ({ transitionToHomePage: !state.transitionToHomePage })),
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
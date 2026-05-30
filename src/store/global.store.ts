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
  apiKeyIndex: number;
  geminiApiKeyCount: number | null;
  apiKeyRotationInitialized: boolean;
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
  isStreamingRecommendations: boolean;
  transitionToHomePage: boolean;
  userDropdownOpen: boolean;
  userSheetOpen: boolean;
  showDeleteDialog: boolean;
  setIsMobile: (value: boolean) => void;
  setSelectedPipeline: (pipeline: Pipeline | null) => void;
  setSelectedPipelineModelIndex: (index: string) => void;
  setIsAiThinking: (value: boolean) => void;
  setIsStreamingRecommendations: (value: boolean) => void;
  onOpenChangePipelineDialog: () => void;
  setUserDropdownOpen: (value: boolean) => void;
  setUserSheetOpen: (value: boolean) => void;
  setShowDeleteDialog: (value: boolean) => void;
  closeUserMenus: () => void;

  // Minors
  focusStepOne: boolean;
  setFocusStepOne: (value: boolean) => void;
  restoreStepOneText: boolean;
  setRestoreStepOneText: (value: boolean) => void;
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
      geminiErrorOccurred: false,
      apiKeyIndex: 1,
      geminiApiKeyCount: null,
      apiKeyRotationInitialized: false,
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
      isStreamingRecommendations: false,
      transitionToHomePage: false,
      userDropdownOpen: false,
      userSheetOpen: false,
      showDeleteDialog: false,
      setIsMobile: (value: boolean) => set({ isMobile: value }),
      setSelectedPipeline: (pipeline: Pipeline | null) => set({ selectedPipeline: pipeline }),
      setSelectedPipelineModelIndex: (index: string) => set({ selectedPipelineModelIndex: index }),
      setIsAiThinking: (value: boolean) => set({ isAiThinking: value }),
      setIsStreamingRecommendations: (value: boolean) => set({ isStreamingRecommendations: value }),
      onOpenChangePipelineDialog: () => {
        const { setSelectedPipelineModelIndex } = get();
        setTimeout(() => setSelectedPipelineModelIndex('0'), 500);
      },
      setUserDropdownOpen: (value: boolean) => set({ userDropdownOpen: value }),
      setUserSheetOpen: (value: boolean) => set({ userSheetOpen: value }),
      setShowDeleteDialog: (value: boolean) => set({ showDeleteDialog: value }),
      closeUserMenus: () => set({ userDropdownOpen: false, userSheetOpen: false }),

      // Minors
      focusStepOne: false,
      setFocusStepOne: (value: boolean) => set({ focusStepOne: value }),
      restoreStepOneText: false,
      setRestoreStepOneText: (value: boolean) => set({ restoreStepOneText: value }),
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
        apiKeyIndex: state.apiKeyIndex,
        apiKeyRotationInitialized: state.apiKeyRotationInitialized,
      }),
    }
  )
);
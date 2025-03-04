import { create } from "zustand";

interface GlobalState {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isMobile: false, // ✅ Estado inicial
  setIsMobile: (value) => set({ isMobile: value }), // ✅ Función para actualizarlo
}));

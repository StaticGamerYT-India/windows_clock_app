import { create } from "zustand";

export const useDismissPopup = create((set) => ({
  showDismiss: false,
  name: "",
  mainName: "",
  showTimeOnDismiss: true,
  
  setShowDismiss: (value = true) => set({ showDismiss: value }),
  setName: (name) => set({ name }),
  setMainName: (mainName) => set({ mainName }),
  setShowTimeOnDismiss: (showTimeOnDismiss) => set({ showTimeOnDismiss }),
  
  // Reset the popup state
  resetPopup: () => set({
    showDismiss: false,
    name: "",
    mainName: "",
    showTimeOnDismiss: true,
  }),
}));

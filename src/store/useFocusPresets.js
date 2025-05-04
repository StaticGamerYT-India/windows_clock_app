import { create } from "zustand";
import { times } from "../data/focusSessionTimes";

// Get index for specific time values
const getTimeIndex = (minutes) => {
  const index = times.findIndex(t => t === minutes);
  return index >= 0 ? index : 0;
};

export const useFocusPresets = create((set) => ({
  presets: [
    {
      id: 'pomodoro',
      name: 'Pomodoro',
      focusIndex: getTimeIndex(25),  // 25 minutes
      breakIndex: getTimeIndex(5),   // 5 minutes
      skipBreaks: false
    },
    {
      id: 'long-focus',
      name: 'Deep Work',
      focusIndex: getTimeIndex(50),  // 50 minutes
      breakIndex: getTimeIndex(10),  // 10 minutes
      skipBreaks: false
    },
    {
      id: 'short-bursts',
      name: 'Short Bursts',
      focusIndex: getTimeIndex(15),  // 15 minutes
      breakIndex: getTimeIndex(5),   // 5 minutes
      skipBreaks: false
    }
  ],
  
  addPreset: (preset) => set((state) => ({ 
    presets: [...state.presets, {
      id: Date.now().toString(),
      ...preset
    }]
  })),
  
  updatePreset: (id, updatedPreset) => set((state) => ({
    presets: state.presets.map(preset => 
      preset.id === id ? { ...preset, ...updatedPreset } : preset
    )
  })),
  
  deletePreset: (id) => set((state) => ({
    presets: state.presets.filter(preset => preset.id !== id)
  }))
}));

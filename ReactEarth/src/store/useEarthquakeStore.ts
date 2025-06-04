import { create } from 'zustand';
import type { Earthquake } from "../types/Earthquake"

// Define the shape of the global store used to manage earthquake selection
type EarthquakeStore = {
  selected: Earthquake | null;
  setSelected: (eq: Earthquake | null) => void;
};

// Create a Zustand store to globally manage selected earthquake state
export const useEarthquakeStore = create<EarthquakeStore>((set) => ({
  selected: null,
  setSelected: (eq) => set({ selected: eq }),  // Update selected state using Zustand's setter
}));

import { create } from 'zustand';
import type { Earthquake } from "../types/Earthquake"

type EarthquakeStore = {
  selected: Earthquake | null;
  setSelected: (eq: Earthquake | null) => void;
};

export const useEarthquakeStore = create<EarthquakeStore>((set) => ({
  selected: null,
  setSelected: (eq) => set({ selected: eq }),
}));

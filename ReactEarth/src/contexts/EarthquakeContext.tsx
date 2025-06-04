import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import type { Earthquake } from "../types/Earthquake"

type EarthquakeContextType = {
  selected: Earthquake | null;
  setSelected: (eq: Earthquake | null) => void;
  data: Earthquake[];
  loading: boolean;
};

const EarthquakeContext = createContext<EarthquakeContextType | null>(null);

export function EarthquakeProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Earthquake | null>(null);
  const [data, setData] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/earthquakes.json")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load earthquake data", err);
          setLoading(false);
        });
  }, []);

  return (
      <EarthquakeContext.Provider value={{ selected, setSelected, data, loading }}>
        {children}
      </EarthquakeContext.Provider>
  );
}

export function useEarthquake() {
  const context = useContext(EarthquakeContext);
  if (!context) throw new Error("useEarthquake must be used within EarthquakeProvider");
  return context;
}

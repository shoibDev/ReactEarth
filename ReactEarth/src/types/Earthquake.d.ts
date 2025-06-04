export interface Earthquake {
  time: string;
  latitude: number;
  longitude: number;
  depth: number;
  mag: number;
  place: string;
  [key: string]: any; // Allows for extra fields like id, etc.
}

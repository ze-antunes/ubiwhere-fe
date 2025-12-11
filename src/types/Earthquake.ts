export interface Earthquake {
  id: string;
  magnitude: number;
  color: string;
  location: string;
  timestamp: number;
  depth: number;
  coordinates: {
    lat: number;
    long: number;
  };
}

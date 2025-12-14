import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { Earthquake } from "../types/Earthquake";

interface Props {
  earthquake: Earthquake | null;
  fallbackEarthquake?: Earthquake;
}

export default function MapCenterUpdater({
  earthquake,
  fallbackEarthquake
}: Props) {
  const map = useMap();

  useEffect(() => {
    const target = earthquake ?? fallbackEarthquake;

    if (!target) return;

    map.flyTo([target.coordinates.lat, target.coordinates.long], 14, {
      duration: 1
    });
  }, [earthquake, fallbackEarthquake, map]);

  return null;
}

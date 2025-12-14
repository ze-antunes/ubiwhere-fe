import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Earthquake } from "../../types/Earthquake";
import "leaflet/dist/leaflet.css";
import styles from "./MapView.module.css";
import L from "leaflet";
import MapLegend from "./MapLegend";
import MapCenterUpdater from "../../helpers/MapCenterUpdater";

interface MapViewProps {
    earthquakes: Earthquake[] | undefined;
    earthquake: Earthquake | undefined; // selected
    onSelect: (id: string) => void;
}

export default function MapView({
    earthquake,
    earthquakes,
    onSelect,
}: MapViewProps) {
    if (!earthquakes || earthquakes.length === 0) {
        return <div className={styles.map__empty}>No data</div>;
    }

    // Create custom icon for markers
    const createIcon = (eq: Earthquake, isActive: boolean) =>
        new L.DivIcon({
            html: `
        <div
          style="
            background:${eq.color};
            width:${isActive ? 26 : 18}px;
            height:${isActive ? 26 : 18}px;
            border-radius:50%;
            border:3px solid white;
            box-shadow:0 0 ${isActive ? 10 : 4}px rgba(0,0,0,.5);
          "
        ></div>
      `,
            className: "",
        });

    return (
        <div className={styles.map__wrapper}>
            <MapLegend />

            <MapContainer center={[0, 0]} zoom={14} className={styles.map}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                <MapCenterUpdater
                    earthquake={earthquake ?? null}
                    fallbackEarthquake={earthquakes[0]}
                />

                {earthquakes.map((eq) => {
                    const isActive = eq.id === earthquake?.id;

                    return (
                        <Marker
                            key={eq.id}
                            icon={createIcon(eq, isActive)}
                            position={[eq.coordinates.lat, eq.coordinates.long]}
                            eventHandlers={{
                                click: () => onSelect(eq.id),
                            }}
                        >
                            <Popup>
                                <strong>{eq.magnitude}</strong> Location<br />
                                {eq.location}
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}

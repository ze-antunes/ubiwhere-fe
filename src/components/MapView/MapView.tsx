import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Earthquake } from "../../types/Earthquake";
import "leaflet/dist/leaflet.css";
import styles from "./MapView.module.css";
import L from "leaflet";
import MapLegend from "./MapLegend";

interface MapViewProps {
    earthquakes: Earthquake[] | undefined;
    onSelect: (id: string) => void;
}

export default function MapView({ earthquakes, onSelect }: MapViewProps) {
    if (!earthquakes || earthquakes.length === 0) {
        return <div className={styles.map__empty}>No data</div>;
    }

    const createIcon = (eq: Earthquake) =>
        new L.DivIcon({
            html: `
        <div
          style="
            background:${eq.color};
            width:18px;
            height:18px;
            border-radius:50%;
            border:2px solid white;
            box-shadow:0 0 4px rgba(0,0,0,.4);
          "
        ></div>
      `,
            className: "",
        });

    return (
        <div className={styles.map__wrapper}>
            <MapLegend />

            <MapContainer
                center={[
                    earthquakes[0].coordinates.lat,
                    earthquakes[0].coordinates.long,
                ]}
                zoom={6}
                className={styles.map}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {earthquakes.map((eq) => (
                    <Marker
                        key={eq.id}
                        icon={createIcon(eq)}
                        position={[eq.coordinates.lat, eq.coordinates.long]}
                        eventHandlers={{
                            click: () => onSelect(eq.id),
                        }}
                    >
                        <Popup>
                            <div>
                                <strong>{eq.magnitude}</strong> Location <br />
                                {eq.location}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

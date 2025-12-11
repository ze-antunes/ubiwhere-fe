import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Earthquake } from "../../types/Earthquake";
import "leaflet/dist/leaflet.css";
import styles from "./MapView.module.css";
import L from "leaflet";

interface MapViewProps {
    earthquakes: Earthquake[] | undefined;
    onSelect: (id: string) => void;
}

export default function MapView({ earthquakes, onSelect }: MapViewProps) {

    function getEarthquakeIcon(eq: Earthquake) {
        return new L.DivIcon({
            html: `
                <div
                    style="
                    background:${eq.color};
                    width:20px;
                    height:20px;
                    border-radius:50%;
                    border:2px solid white;
                    "
                ></div>
            `,
            className: "",
        });
    }

    if (!earthquakes || earthquakes.length === 0) return <p>No data</p>;

    return (
        <MapContainer
            center={[38, -122]}
            zoom={6}
            className={styles.map}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />

            {earthquakes.map(eq => (
                <Marker
                    key={eq.id}
                    icon={getEarthquakeIcon(eq)}
                    position={[eq.coordinates.lat, eq.coordinates.long]}
                    eventHandlers={{
                        click: () => onSelect(eq.id),
                    }}
                >
                    <Popup>
                        <div>
                            <strong>{eq.magnitude}</strong> magnitude<br />
                            {eq.location}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

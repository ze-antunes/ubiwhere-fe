import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useEarthquakes } from "../../hooks/useEarthquakes";
import styles from "./Dashboard.module.css";
import { MapContainer, TileLayer } from "react-leaflet";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const { data, isLoading } = useEarthquakes(0, 5);

    if (isLoading) return <p>Loading...</p>;
    console.log(data);

    // handle logout
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className={styles.dashboard__container}>
            <header className={styles.dashboard__header}>
                <h1 className={styles.dashboard__title}>QuakeWatch</h1>

                <button
                    className={styles.dashboard__logoutButton}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </header>
            <main className={styles.dashboard__main}>
                <MapContainer
                    center={[data[0].coordinates.lat, data[0].coordinates.long]}
                    zoom={10}
                    className={styles.dashboard__map}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </main>
        </div>
    )
}

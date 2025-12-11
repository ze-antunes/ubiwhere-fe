import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useEarthquakes, useEarthquakeDetails } from "../../hooks/useEarthquakes";
import styles from "./Dashboard.module.css";
import MapView from "../../components/MapView/MapView";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: earthquakes, isLoading } = useEarthquakes(0, 20);
    const { data: details } = useEarthquakeDetails(selectedId ?? "");

    if (isLoading) return <p>Loading...</p>;

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
            {selectedId && details && (
                <aside className={styles.detailsPanel}>
                    <h2>Earthquake Details</h2>
                    <p><strong>ID:</strong> {details.id}</p>
                    <p><strong>Magnitude:</strong> {details.magnitude}</p>
                    <p><strong>Depth:</strong> {details.depth} km</p>
                    <p><strong>Location:</strong> {details.location}</p>
                    <p><strong>Timestamp:</strong> {new Date(details.timestamp).toLocaleString()}</p>
                </aside>
            )}
                <MapView earthquakes={Array.isArray(earthquakes) ? earthquakes : undefined} onSelect={id => setSelectedId(id)} />

            </main>
        </div>
    )
}

/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
    useEarthquakes,
    useEarthquakeDetails,
} from "../../hooks/useEarthquakes";
import styles from "./Dashboard.module.css";
import MapView from "../../components/MapView/MapView";
import DetailsPanel from "../../components/DetailsPanel/DetailsPanel";
import EarthquakesTable from "../../components/EarthquakesTable/EarthquakesTable";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const PAGE_SIZE = 4;

    const { data: earthquakes, isLoading } = useEarthquakes(currentPage, PAGE_SIZE);
    const { data: details } = useEarthquakeDetails(selectedId ?? "");

    useEffect(() => {
        if (earthquakes && earthquakes.length > 0) {
            setSelectedId(earthquakes[0].id);
            setIsPanelOpen(true);
        }
    }, [earthquakes, setSelectedId, setIsPanelOpen]);

    if (isLoading) return <p>Loading...</p>;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleSelectEarthquake = (id: string) => {
        setSelectedId(id);
        setIsPanelOpen(true);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSelectedId(null);
        setIsPanelOpen(false);
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
                <EarthquakesTable
                    earthquakes={earthquakes ?? []}
                    currentPage={currentPage}
                    totalPages={5}
                    onSelect={id => setSelectedId(id)}
                    onPageChange={handlePageChange}
                />

                {details && (
                    <DetailsPanel
                        earthquake={details}
                        isOpen={isPanelOpen}
                        onClose={() => setIsPanelOpen(false)}
                    />
                )}

                <MapView
                    earthquake={details}
                    earthquakes={Array.isArray(earthquakes) ? earthquakes : undefined}
                    onSelect={handleSelectEarthquake}
                />
            </main>
        </div>
    );
}

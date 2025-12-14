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
import MobileBottomPanel from "../../components/MobileBottomPanel/MobileBottomPanel";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // State variables
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isTableOpen, setIsTableOpen] = useState(true);

    // Number of earthquakes per page
    const PAGE_SIZE = 5;

    // Fetch earthquakes and details
    const { data: earthquakes, isLoading } = useEarthquakes(currentPage, PAGE_SIZE);
    const { data: details } = useEarthquakeDetails(selectedId ?? "");

    // Automatically select the first earthquake when the list changes
    useEffect(() => {
        if (earthquakes && earthquakes.length > 0) {
            setSelectedId(earthquakes[0].id);
            setIsPanelOpen(true);
        }
    }, [earthquakes, setSelectedId, setIsPanelOpen]);

    // Handlers
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleSelectMap = (id: string) => {
        setSelectedId(id);
        setIsPanelOpen(true);
        setIsTableOpen(false);
    };

    const handleSelectEarthquake = (id: string) => {
        setSelectedId(id);
        setIsPanelOpen(true);
        setIsTableOpen(false);
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
                {isLoading && <LoadingScreen />}
                <div className={styles.desktopOnly}>
                    <EarthquakesTable
                        earthquakes={earthquakes ?? []}
                        currentPage={currentPage}
                        totalPages={5}
                        selectedId={selectedId}
                        onSelect={id => setSelectedId(id)}
                        onPageChange={handlePageChange}
                    />
                </div>

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
                    onSelect={handleSelectMap}
                />

                <div className={styles.mobileOnly}>
                    <MobileBottomPanel title="Earthquakes" isOpen={isTableOpen}
                        onToggle={() => setIsTableOpen(prev => !prev)}>
                        <EarthquakesTable
                            earthquakes={earthquakes ?? []}
                            currentPage={currentPage}
                            totalPages={5}
                            selectedId={selectedId}
                            onSelect={handleSelectEarthquake}
                            onPageChange={setCurrentPage}
                        />
                    </MobileBottomPanel>
                </div>
            </main>
        </div>
    );
}

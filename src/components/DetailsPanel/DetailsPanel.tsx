import styles from "./DetailsPanel.module.css";
import type { Earthquake } from "../../types/Earthquake";

interface Props {
    earthquake: Earthquake;
    isOpen: boolean;
    onClose: () => void;
}

export default function DetailsPanel({
    earthquake,
    isOpen,
    onClose,
}: Props) {
    if (!isOpen) return null;

    return (
        <aside className={styles.panel}>
            <header className={styles.panel__header}>
                <h2 className={styles.panel__title}>Earthquake details</h2>
                <button className={styles.panel__close} onClick={onClose}>
                    ✕
                </button>
            </header>

            <div className={styles.panel__content}>
                <p><strong>ID:</strong> {earthquake.id}</p>
                <p><strong>Magnitude:</strong> {earthquake.magnitude}</p>
                <p><strong>Depth:</strong> {earthquake.depth} km</p>
                <p><strong>Location:</strong> {earthquake.location}</p>
                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(earthquake.timestamp).toLocaleString()}
                </p>
            </div>
        </aside>
    );
}

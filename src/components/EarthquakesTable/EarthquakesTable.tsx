import type { Earthquake } from "../../types/Earthquake";
import styles from "./EarthquakesTable.module.css";

interface Props {
    earthquakes: Earthquake[];
    currentPage: number;
    totalPages: number;
    onSelect: (id: string) => void;
    onPageChange: (page: number) => void;
}

export default function EarthquakesTable({
    earthquakes,
    currentPage,
    totalPages,
    onSelect,
    onPageChange,
}: Props) {
    return (
        <div className={styles.tablePanel}>
            <h3 className={styles.title}>Earthquakes</h3>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {earthquakes.map(eq => (
                        <tr
                            key={eq.id}
                            onClick={() => onSelect(eq.id)}
                            className={styles.row}
                        >
                            <td>
                                <span
                                    className={styles.colorDot}
                                    style={{ backgroundColor: eq.color }}
                                />
                            </td>
                            <td>{eq.id}</td>
                            <td>{eq.location}</td>
                            <td>
                                {new Date(eq.timestamp).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button
                    disabled={currentPage === 0}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Prev
                </button>

                <span>
                    Page {currentPage + 1} / {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages - 1}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

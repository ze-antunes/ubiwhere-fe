import styles from "./MapLegend.module.css";

export default function MapLegend() {
    return (
        <div className={styles.legend}>
            <h4 className={styles.legend__title}>Magnitude</h4>

            <ul className={styles.legend__list}>
                <li>
                    <span className={`${styles.dot} ${styles.green}`} />
                    &lt; 2.0
                </li>
                <li>
                    <span className={`${styles.dot} ${styles.yellow}`} />
                    2.0 – 4.9
                </li>
                <li>
                    <span className={`${styles.dot} ${styles.orange}`} />
                    5.0 – 6.9
                </li>
                <li>
                    <span className={`${styles.dot} ${styles.red}`} />
                    ≥ 7.0
                </li>
            </ul>
        </div>
    );
}

import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
    return (
        <div className={styles.overlay}>
            <div className={styles.spinner} />
            <span className={styles.text}>Loading...</span>
        </div>
    );
}

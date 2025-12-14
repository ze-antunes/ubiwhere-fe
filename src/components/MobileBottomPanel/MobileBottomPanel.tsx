import styles from "./MobileBottomPanel.module.css";

interface Props {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

export default function MobileBottomPanel({ title,
    isOpen,
    onToggle,
    children, }: Props) {

    return (
        <div className={`${styles.panel} ${isOpen ? styles.open : styles.close}`}>
            <div className={styles.handle} onClick={onToggle}>
                <div className={styles.bar} />
                {title && <span className={styles.title}>{title}</span>}
            </div>

            <div className={styles.content}>{children}</div>
        </div>
    );
}

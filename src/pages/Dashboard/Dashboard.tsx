import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import styles from "./Dashboard.module.css";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // handle logout
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className={styles.dashboard__container}>
            <header className={styles.dashboard__header}>
                <h1 className={styles.dashboard__title}>Dashboard</h1>

                <button
                    className={styles.dashboard__logoutButton}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </header>

            {/* resto do conteúdo do dashboard */}
        </div>
    )
}

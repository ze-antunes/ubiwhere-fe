import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    // State variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handle form submission
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        // Attempt to log in
        try {
            const res = await api.post("/token", { email, password });
            // Save the token and navigate to dashboard
            login(res.data.access_token);
            navigate("/");
        } catch {
            // Handle login failure
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login__container}>
            <form className={styles.login__form} onSubmit={handleLogin}>
                <h1 className={styles.login__title}>Welcome to QuakeWatch</h1>
                <p className={styles.login__subtitle}>
                    Explore recent earthquake activity
                </p>

                {error && <div className={styles.login__error}>{error}</div>}

                <input
                    type="email"
                    placeholder="Email"
                    className={styles.login__input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className={styles.login__input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className={styles.login__button} disabled={loading}>
                    {loading ? "Signing in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

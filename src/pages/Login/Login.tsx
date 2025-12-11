import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth.ts";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/token", { email, password });
            login(res.data.access_token);
            if (res.data.access_token)
                navigate("/");
        } catch (err) {
            console.error(err);
            alert("Credenciais inválidas");
        }
    };

    return (
        <div className={styles.login__container}>
            <form className={styles.login__form} onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    className={styles.login__input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className={styles.login__input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className={styles.login__button} disabled={loading}>
                    {loading ? "A autenticar..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}

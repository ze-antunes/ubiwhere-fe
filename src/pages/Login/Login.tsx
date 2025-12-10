import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth.ts";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await api.post("/token", { email, password });
            login(res.data.access_token);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Credenciais inválidas");
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Entrar</button>
            </form>
        </div>
    );
}

import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

export default function PublicRoute({ children }: { children: JSX.Element }) {
    const { token } = useAuth();

    // If there is a token, redirect to home page
    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
}
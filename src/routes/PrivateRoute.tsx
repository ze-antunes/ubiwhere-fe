import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

export default  function PrivateRoute({ children }: { children: JSX.Element }) {
    const { token } = useAuth();

    // If there is no token, redirect to login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
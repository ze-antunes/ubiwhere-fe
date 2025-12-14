import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";

export function useAuth() {
  const context = useContext(AuthContext);

  // Ensure the hook is used within an AuthProvider
  if (!context) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }

  return context;
}

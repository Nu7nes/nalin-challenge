import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import persistAuthentication from "../utils/persistAuthentication";

export default function PrivateRoute({ children }) {
    const isAuthenticated = persistAuthentication.check();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

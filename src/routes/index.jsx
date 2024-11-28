import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/login",
        index: true,
        element: <Login />,
    },
    {
        path: "/",
        element: (
            <PrivateRoute>
                <Home />
            </PrivateRoute>
        ),
    },
]);

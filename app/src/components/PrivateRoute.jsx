import React from "react";
import { Navigate, Outlet } from "react-router-dom"; 
import { getRole } from "../utility/Utility";

const PrivateRoute = ({ allowedRoles }) => {
    const role = getRole();
    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

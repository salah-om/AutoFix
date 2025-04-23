import React from "react";
import { Navigate, Outlet } from "react-router-dom"; 
import { getRole } from "../utility/Utility";

/*
-----------------------------------------------------------------------------
    Purpose: Restricts access to certain routes based on user roles
    Param: allowedRoles (array) - list of roles permitted to access route
    Postcondition: Renders the `Outlet` if user has access, otherwise redirects 
                   to "/unauth" page
----------------------------------------------------------------------------
*/
const PrivateRoute = ({ allowedRoles }) => {
    const role = getRole();
    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/unauth" />;
};

export default PrivateRoute;

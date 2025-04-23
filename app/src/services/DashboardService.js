import http from '../http-common';

/*
-----------------------------------------------------------------------
  Purpose: Fetches all Admin stats from the database
  Returns: JSON of stats for admin view
-----------------------------------------------------------------------
*/
export const getAdminDashboardStats = async () => {
    try {
        const response = await http.get(`/dashboard/adminstats`);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin dashboard stats", error);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches all Mechanic stats from the database
  Returns: JSON of stats for mechanic view
-----------------------------------------------------------------------
*/
export const getMechanicDashboardStats = async () => {
    try {
        const response = await http.get(`/dashboard/mechanicstats`);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin dashboard stats", error);
    }
};
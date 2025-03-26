import http from '../http-common';

export const getAdminDashboardStats = async () => {
    try {
        const response = await http.get(`/dashboard/adminstats`);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin dashboard stats", error);
        return null;
    }
};

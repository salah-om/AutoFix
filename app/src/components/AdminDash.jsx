import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../services/DashboardService";
import RespSidebar from "./RespSidebar";
import "../styles/index.css"; 


const AdminDash = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalMechanics: 0,
        totalAdmins: 0,
        totalVehicles: 0,
        totalComplaints: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            const data = await getAdminDashboardStats();
            if (data) setStats(data);
        }
        fetchStats();
    }, []);

    return ( 
        <>
        <div className="admin-dashboard">
            <div className="card-container">
                <div className="cardsdash">
                    <img src="/images/users-icon.png" alt="Users" />
                    <div className="card-content">
                        <h3>Number of Users:</h3>
                        <p>{stats.totalUsers}</p>
                    </div>
                </div>

                <div className="cardsdash">
                    <img src="/images/mechanics.png" alt="Mechanics" />
                    <div className="card-content">
                        <h3>Number of Mechanics:</h3>
                        <p>{stats.totalMechanics}</p>
                    </div>
                </div>

                <div className="cardsdash">
                    <img src="/images/admins.png" alt="Admins" />
                    <div className="card-content">
                        <h3>Number of Admins:</h3>
                        <p>{stats.totalAdmins}</p>
                    </div>
                </div>

                <div className="cardsdash">
                    <img src="/images/vehicles.png" alt="Vehicles" />
                    <div className="card-content">
                        <h3>Number of Vehicles:</h3>
                        <p>{stats.totalVehicles}</p>
                    </div>
                </div>

                <div className="cardsdash">
                    <img src="/images/complaints.png" alt="Complaints" />
                    <div className="card-content">
                        <h3>Number of Complaints:</h3>
                        <p>{stats.totalComplaints}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AdminDash;

import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../../services/DashboardService";
import { FaAngry, FaCar, FaUser, FaWrench } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";

const AdminDash = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalMechanics: 0,
        totalAdmins: 0,
        totalVehicles: 0,
        totalComplaints: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        const data = await getAdminDashboardStats();
        if (data) setStats(data);
    }
    
    return ( 
        <>
        <div className="admin-dashboard">
            <div className="card-container">
                <div className="cardsdash">
                    <FaUser />
                    <div className="card-content">
                        <h3>Number of Users:</h3>
                        <p>{stats.totalUsers}</p>
                    </div>
                </div>

                <div className="cardsdash">
                <FaWrench />
                    <div className="card-content">
                        <h3>Number of Mechanics:</h3>
                        <p>{stats.totalMechanics}</p>
                    </div>
                </div>

                <div className="cardsdash">
                <BsShieldLock />
                    <div className="card-content">
                        <h3>Number of Admins:</h3>
                        <p>{stats.totalAdmins}</p>
                    </div>
                </div>

                <div className="cardsdash">
                <FaCar />
                    <div className="card-content">
                        <h3>Number of Vehicles:</h3>
                        <p>{stats.totalVehicles}</p>
                    </div>
                </div>

                <div className="cardsdash">
                    <FaAngry />
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

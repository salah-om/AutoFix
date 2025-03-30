import { useEffect, useState } from "react";
import { getMechanicDashboardStats } from "../services/DashboardService";
import "../styles/index.css"; 


const MechanicDash = () => {
    const [stats, setStats] = useState({
        totalComplaints: 0,
        totalFixes: 0,
        totalChats: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            const data = await getMechanicDashboardStats();
            if (data) setStats(data);
        }
        fetchStats();
    }, []);

    return ( 
        <>
        <div className="mechanic-dashboard">
            <div className="card-container">
                <div className="mcardsdash">
                    <img src="/images/users-icon.png" alt="Complaints" />
                    <div className="card-content">
                        <h3>Number of Complaints:</h3>
                        <p>{stats.totalComplaints}</p>
                    </div>
                </div>

                <div className="mcardsdash">
                    <img src="/images/mechanics.png" alt="Fixes" />
                    <div className="card-content">
                        <h3>Number of Fixes:</h3>
                        <p>{stats.totalFixes}</p>
                    </div>
                </div>

                <div className="mcardsdash">
                    <img src="/images/admins.png" alt="Chats" />
                    <div className="card-content">
                        <h3>Number of Chats:</h3>
                        <p>{stats.totalChats}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default MechanicDash;

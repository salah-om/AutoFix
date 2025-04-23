import { useEffect, useState } from "react";
import { getMechanicDashboardStats } from "../../services/DashboardService";
import { FaAngry, FaHammer, FaHeadset } from "react-icons/fa";

const MechanicDash = () => {
    const [stats, setStats] = useState({
        totalComplaints: 0,
        totalFixes: 0,
        totalChats: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

   /*
    -----------------------------------------------------------------------
      Purpose: Fetches dashboard stats.
      Parameters: None.
      Postcondition: Sets the JSON data to stats to display to the user.
    -----------------------------------------------------------------------
    */
    async function fetchStats() {
        const data = await getMechanicDashboardStats();
        if (data) setStats(data);
    }
    
    return ( 
        <>
        <div className="mechanic-dashboard">
            <div className="card-container-m">
                <div className="mcardsdash">
                    <FaAngry />
                    <div className="card-content">
                        <h3>Number of Complaints:</h3>
                        <p>{stats.totalComplaints}</p>
                    </div>
                </div>

                <div className="mcardsdash">
                    <FaHammer />
                    <div className="card-content">
                        <h3>Number of Fixes:</h3>
                        <p>{stats.totalFixes}</p>
                    </div>
                </div>

                <div className="mcardsdash">
                    <FaHeadset />
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

import { useEffect, useState } from "react";
import http from "../../http-common";
import MechSidebar from "../sidebars/MechSidebar";

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    
    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await http.get("/complaints");
            setComplaints(response?.data);
        } catch (e) {
            alert('Route not found: ' + e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await http.delete(`/complaints/${id}`);
            setComplaints(complaints.filter(complaint => complaint.id !== id)); 
        } catch (e) {
            alert('Error deleting complaint: ' + e);
        }
    };

    return (
        <>
            <MechSidebar />
            <div className="container" style={{ maxWidth: "965px" }}>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Vehicle</th>
                            <th>Issue</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint.id}>
                                <td>{complaint.id}</td>
                                <td>{complaint.user?.username ?? "Unknown"}</td>
                                <td>
                                    {complaint.vehicle 
                                        ? `${complaint.vehicle.make} ${complaint.vehicle.model} (${complaint.vehicle.year})` 
                                        : "Unknown Vehicle"}
                                </td>
                                <td>{complaint.issue}</td>
                                <td>{complaint.description}</td>
                                <td>${complaint.cost}</td>
                                <td>{new Date(complaint.date).toLocaleDateString()}</td>
                                <td> 
                                    <button onClick={() => handleDelete(complaint.id)} className="btn btn-danger btn-sm mx-2">
                                        <i className="bx bxs-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Complaints;

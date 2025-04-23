import { useEffect, useState } from "react";
import MechSidebar from "../sidebars/MechSidebar";
import { getAllComplaints, deleteComplaint } from "../../services/ComplaintService";

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComplaints();
    }, []);

    /*
    -----------------------------------------------------------------------
      Purpose: Retrieves all complaints from the API
      Postcondition: Updates component state with complaint data
    -----------------------------------------------------------------------
    */
    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const data = await getAllComplaints();
            setComplaints(data);
        } catch (err) {
            console.error("Failed to load complaints:", err);
        } finally {
            setLoading(false);
        }
    };

    /*
    -----------------------------------------------------------------------
      Purpose: Handles deletion of a complaint
      Parameters: id - The ID of the complaint to delete
      Postcondition: Updates state to remove deleted complaint
    -----------------------------------------------------------------------
    */
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this complaint?")) return;
        
        try {
            await deleteComplaint(id);
            setComplaints(prev => prev.filter(complaint => complaint.id !== id));
        } catch (err) {
            alert(`Failed to delete complaint: ${err.message}`);
        }
    };

    if (loading) return <div>Loading complaints...</div>;

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
                                    <button 
                                        onClick={() => handleDelete(complaint.id)} 
                                        className="btn btn-danger btn-sm mx-2"
                                    >
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
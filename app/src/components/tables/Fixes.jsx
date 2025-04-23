import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MechSidebar from "../sidebars/MechSidebar";
import { getAllFixes, deleteFix } from "../../services/FixService";

const Fixes = () => {
    const [fixes, setFixes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFixes();
    }, []);

    /*
    -----------------------------------------------------------------------
      Purpose: Retrieves all fixes from the API
      Postcondition: Updates component state with fix data
    -----------------------------------------------------------------------
    */
    const fetchFixes = async () => {
        try {
            setLoading(true);
            const data = await getAllFixes();
            setFixes(data);
        } catch (err) {
            console.error("Failed to load fixes:", err);
        } finally {
            setLoading(false);
        }
    };

    /*
    -----------------------------------------------------------------------
      Purpose: Handles navigation to edit form
      Parameters: id - The fix ID to edit
      Postcondition: Navigates to edit route
    -----------------------------------------------------------------------
    */
    const handleEdit = (id) => {
        navigate(`/mechanic/fixes/edit-form/${id}`);
    };

    /*
    -----------------------------------------------------------------------
      Purpose: Handles deletion of a fix
      Parameters: id - The ID of the fix to delete
      Postcondition: Updates state to remove deleted fix
    -----------------------------------------------------------------------
    */
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this fix?")) return;
        
        try {
            await deleteFix(id);
            setFixes(prev => prev.filter(fix => fix.id !== id));
        } catch (err) {
            alert(`Failed to delete fix: ${err.message}`);
        }
    };

    if (loading) return <div>Loading fixes...</div>;

    return (
        <>
        <MechSidebar />
        <div className="container" style={{maxWidth: "965px"}}>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Issue</th>
                        <th>Description</th>
                        <th>VideoUrl</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fixes.map((fix)=>{
                            return(
                                <tr key={fix.id}>
                                    <td>{fix?.id}</td>
                                    <td>{fix?.issue}</td>
                                    <td>{fix?.description}</td>
                                    <td>{fix?.videourl}</td>
                                    <td> 
                                        <button onClick={() => handleEdit(fix.id)} className="btn btn-primary btn-sm">
                                        <i className="bx bxs-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(fix.id)} className="btn btn-danger btn-sm mx-2">
                                        <i className="bx bxs-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            </div>
        </>
    )
}

export default Fixes;
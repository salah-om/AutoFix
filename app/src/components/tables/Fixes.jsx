import { useEffect, useState } from "react";
import http from "../../http-common";
import MechSidebar from "../sidebars/MechSidebar";

const Fixes = () => {
    const [fixes, setFixes] = useState([]);
    
    useEffect(()=>{
        fetchFixes();
    }, []);

    const fetchFixes = async () => {
        try {
            const response = await http.get("/fixes");
            setFixes(response?.data);
        } catch (e) {
            alert('Route not found'+e);
        }
    }

    const handleEdit = (id) => {
        window.location.href = `/mechanic/fixes/edit-form/${id}`;
    };

    const handleDelete = async (id) => {
        try {
            await http.delete(`/fixes/${id}`);
            setFixes(fixes.filter(fix => fix.id !== id)); 
        } catch (e) {
            alert('Error deleting fix: ' + e);
        }
    };


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
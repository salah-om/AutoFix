import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RespSidebar from "../sidebars/RespSidebar";
import { getAllVehicles, deleteVehicle } from "../../services/VehicleService";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVehicles();
    }, []);

    /*
    -----------------------------------------------------------------------
      Purpose: Retrieves all vehicles from the API
      Postcondition: Updates component state with vehicle data
    -----------------------------------------------------------------------
    */
    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const data = await getAllVehicles();
            setVehicles(data);
        } catch (err) {
            console.error("Failed to load vehicles:", err);
        } finally {
            setLoading(false);
        }
    };

    /*
    -----------------------------------------------------------------------
      Purpose: Handles navigation to edit form
      Parameters: id - The vehicle ID to edit
      Postcondition: Navigates to edit route
    -----------------------------------------------------------------------
    */
    const handleEdit = (id) => {
        navigate(`/admin/vehicles/edit-form/${id}`);
    };

    /*
    -----------------------------------------------------------------------
      Purpose: Handles deletion of a vehicle
      Parameters: id - The ID of the vehicle to delete
      Postcondition: Updates state to remove deleted vehicle
    -----------------------------------------------------------------------
    */
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
        
        try {
            await deleteVehicle(id);
            setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
        } catch (err) {
            alert(`Failed to delete vehicle: ${err.message}`);
        }
    };

    if (loading) return <div>Loading vehicles...</div>;

    return (
      <>
      <RespSidebar />
        <div className="container" style={{maxWidth: "965px"}}>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>ImgUrl</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vehicles.map((vehicle)=>{
                            return(
                                <tr key={vehicle.id}>
                                    
                                    <td>{vehicle?.id}</td>
                                    <td>{vehicle?.make}</td>
                                    <td>{vehicle?.model}</td>
                                    <td>{vehicle?.year}</td>
                                    <td>{vehicle?.imgurl}</td>
                                    <td> 
                                        <button onClick={() => handleEdit(vehicle.id)} className="btn btn-primary btn-sm">
                                        <i className="bx bxs-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(vehicle.id)} className="btn btn-danger btn-sm mx-2">
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
      );
}
 
export default Vehicles;
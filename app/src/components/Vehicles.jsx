import RespSidebar from "./RespSidebar";
import { useState, useEffect } from "react";
import http from "../http-common";

const Vehicles = () => {

  const [vehicles, setVehicles] = useState([]);
      
      useEffect(()=>{
          fetchVehicles();
      }, []);
  
      const fetchVehicles = async () => {
          try {
              const response = await http.get("/vehicles");
              setVehicles(response?.data);
          } catch (e) {
              alert('Route not found'+e);
          }
      }
  
      const handleEdit = (id) => {
          window.location.href = `/admin/vehicles/edit-form/${id}`;
      };
  
      const handleDelete = async (id) => {
          try {
              await http.delete(`/vehicles/${id}`);
              setVehicles(vehicles.filter(vehicle => vehicle.id !== id)); 
          } catch (e) {
              alert('Error deleting vehicle: ' + e);
          }
      };

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
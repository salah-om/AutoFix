import http from "../http-common";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";

const VehiclesForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState({
        make: '',
        model: '',
        year: ''
    });

    useEffect(() => {
        if (id) {
            fetchVehicleById(id);
        }
    }, [id]);

    const fetchVehicleById = async (vehicleId) => {
        try {
            const response = await http.get(`/vehicles/${vehicleId}`);
            setVehicle(response.data); 
        } catch (e) {
            console.error("Error fetching vehicle data:", e);
        }
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "imgurl") {
          setVehicle((prev) => ({ ...prev, imgFile: files[0] }));
        } else {
          setVehicle((prev) => ({ ...prev, [name]: value }));
        }
      };
      
      const saveVehicle = async (event) => {
        event.preventDefault();
      
        const formData = new FormData();
        formData.append("make", vehicle.make);
        formData.append("model", vehicle.model);
        formData.append("year", vehicle.year);
        if (vehicle.imgFile) {
          formData.append("imgurl", vehicle.imgFile); 
        }
      
        try {
          if (id) {
            await http.patch(`/vehicles/${id}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          } else {
            await http.post("/vehicles", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
      
          navigate("/admin/vehicles");
        } catch (error) {
          console.error("Error saving vehicle:", error);
        }
      };
      

    return (
        <>
        <div className="container-veh-form">
        <div className="card-veh">
            <nav className="back">
              <IoCaretBackCircle />
              <Link to="/admin/vehicles">Back</Link></nav>
            <h2>{id ? "Edit Vehicle" : "Add Vehicle"}</h2>
            <form onSubmit={saveVehicle}>
                <div className="form-group">
                    <label style={{color: "#fc9c00"}} >Make</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Make" name="make" value={vehicle.make || ""} />
                </div>
                <div className="form-group">
                    <label style={{color: "#fc9c00"}}>Model</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Model" name="model" value={vehicle.model || ""} />
                </div>
                <div className="form-group">
                    <label style={{color: "#fc9c00"}}>Year</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Year" name="year" value={vehicle.year || ""} />
                </div>
                <label style={{color: "#fc9c00"}}>File</label>
                <input type="file"
                        id="imgurl" 
                        name="imgurl" 
                        className="form-control"  
                        onChange={handleChange} 
                        required
                   ></input>
                <button type="submit" className="add-veh-btn">{id ? "Update Vehicle" : "Add Vehicle"}</button>
            </form>
            </div>
            </div>
        </>
    );
};

export default VehiclesForm;

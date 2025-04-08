import http from "../http-common";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const VehiclesForm = () => {
    const { id } = useParams(); // Get vehicle ID from URL
    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState({
        make: '',
        model: '',
        year: ''
    });

    // If there's an ID, fetch the vehicle data
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
            <nav><Link to="/admin/vehicles">Back</Link></nav>
            <h2 style={{ color: "white" }}>{id ? "Edit Vehicle" : "Add Vehicle"}</h2>
            <form onSubmit={saveVehicle}>
                <div className="form-group">
                    <label style={{ color: "white" }}>Make</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Make" name="make" value={vehicle.make || ""} />
                </div>
                <div className="form-group">
                    <label style={{ color: "white" }}>Model</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Model" name="model" value={vehicle.model || ""} />
                </div>
                <div className="form-group">
                    <label style={{ color: "white" }}>Year</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Year" name="year" value={vehicle.year || ""} />
                </div>
                <input type="file"
                        id="imgurl" 
                        name="imgurl" 
                        className="form-control"  
                        onChange={handleChange} 
                        required
                   ></input>
                <button type="submit" className="btn btn-primary">{id ? "Update Vehicle" : "Add Vehicle"}</button>
            </form>
        </>
    );
};

export default VehiclesForm;

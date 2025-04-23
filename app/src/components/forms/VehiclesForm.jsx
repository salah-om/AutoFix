import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";
import { getVehicleById, createVehicleEntry, modifyVehicle } from "../../services/VehicleService";

const VehiclesForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    imgFile: null
  });

  useEffect(() => {
    if (id) {
      fetchVehicleById(id);
    }
  }, [id]);

    /*
    -----------------------------------------------------------------------
      Purpose: Fetches vehicle by id.
      Parameters: vehicle id.
      Postcondition: Sets the JSON data to setVehicle.
    -----------------------------------------------------------------------
    */
  const fetchVehicleById = async (vehicleId) => {
    try {
      const response = await getVehicleById(vehicleId);
      console.log('Full API response:', response);
      
      const vehicleData = response.data?.vehicle || response.data || response;
      console.log('Extracted vehicle data:', vehicleData);
  
      if (!vehicleData) {
        throw new Error('No vehicle data received');
      }
  
      setVehicle({
        make: vehicleData.make || '',
        model: vehicleData.model || '',
        year: vehicleData.year || '',
        imgFile: null
      });
    } catch (e) {
      console.error("Failed to fetch vehicle:", e);
      setVehicle({
        make: '',
        model: '',
        year: '',
        imgFile: null
      });
    }
  };

    /*
    -----------------------------------------------------------------------
      Purpose: Handles change in data.
      Parameters: Event.
      Postcondition: Updates component state from input values.
    -----------------------------------------------------------------------
    */
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "imgurl") {
      setVehicle(prev => ({ ...prev, imgFile: files[0] }));
    } else {
      setVehicle(prev => ({ ...prev, [name]: value }));
    }
  };

  /*
    -----------------------------------------------------------------------
      Purpose: Updates vehicle Data user is editing.
      Parameters: Event.
      Postcondition: Updates vehicle and navigates to list view.
    -----------------------------------------------------------------------
    */
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
        await modifyVehicle(id, formData);
      } else {
        await createVehicleEntry(formData);
      }
      navigate("/admin/vehicles");
    } catch (error) {
      console.error("Error saving vehicle:", error);
    }
  };

  return (
    <div className="container-veh-form">
      <div className="card-veh">
        <nav className="back">
          <IoCaretBackCircle />
          <Link to="/admin/vehicles">Back</Link>
        </nav>
        <h2>{id ? "Edit Vehicle" : "Add Vehicle"}</h2>
        
        <form onSubmit={saveVehicle}>
          <div className="form-group">
            <label style={{color: "#fc9c00"}}>Make</label>
            <input 
              onChange={handleChange} 
              type="text" 
              className="form-control" 
              placeholder="Make" 
              name="make" 
              value={vehicle.make} 
              required
            />
          </div>
          
          <div className="form-group">
            <label style={{color: "#fc9c00"}}>Model</label>
            <input 
              onChange={handleChange} 
              type="text" 
              className="form-control" 
              placeholder="Model" 
              name="model" 
              value={vehicle.model}
              required
            />
          </div>
          
          <div className="form-group">
            <label style={{color: "#fc9c00"}}>Year</label>
            <input 
              onChange={handleChange} 
              type="text" 
              className="form-control" 
              placeholder="Year" 
              name="year" 
              value={vehicle.year}
              required
            />
          </div>
          
          <div className="form-group">
            <label style={{color: "#fc9c00"}}>Image</label>
            <input 
              type="file"
              id="imgurl" 
              name="imgurl" 
              className="form-control"  
              onChange={handleChange} 
              required={!id} 
            />
          </div>
          
          <button type="submit" className="add-veh-btn">
            {id ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehiclesForm;
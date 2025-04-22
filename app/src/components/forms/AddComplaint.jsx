import { useEffect, useState } from "react";
import { getMakes, getModels, getYears, findVehicle } from "../../services/VehicleService"
import { submitComplaint } from "../../services/ComplaintService"
import Menu from "../sidebars/Menu";
import Footer from "../sidebars/Footer";

const AddComplaint = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const DESCRIPTION_MAX_LENGTH = 255;

  const [complaint, setComplaint] = useState({
    make: '',
    model: '',
    year: '',
    issue: '',
    description: '',
    cost: ''
  });

  const charCount = complaint.description.length;

  useEffect(() => {
    loadMakes();
  }, []);

  useEffect(() => {
    loadModelsAndYears();
  }, [complaint.make, complaint.model]);

    /*
    -----------------------------------------------------------------------
      Purpose: Loads car makes.
      Parameters: None.
      Postcondition: Sets the JSON data to makes to load them for the user.
    -----------------------------------------------------------------------
    */
  const loadMakes = async () => {
    try {
      const makesData = await getMakes();
      setMakes(makesData);
    } catch(error) {
      console.error("Error loading makes:", error);
    }
  };

    /*
    -----------------------------------------------------------------------
      Purpose: Loads car models and years.
      Parameters: None.
      Postcondition: Sets the JSON data to models and years based on make.
    -----------------------------------------------------------------------
    */
  const loadModelsAndYears = async () => {
    if (complaint.make) {
      try {
        const modelsData = await getModels(complaint.make);
        setModels(modelsData);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    }
    
    if (complaint.make && complaint.model) {
      try {
        const yearsData = await getYears(complaint.make, complaint.model);
        setYears(yearsData);
      } catch (error) {
        console.error("Error loading years:", error);
      }
    }
  };

    /*
    -----------------------------------------------------------------------
      Purpose: Handles change in data.
      Parameters: Event.
      Postcondition: Updates component state from input values.
    -----------------------------------------------------------------------
    */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint((prev) => ({
      ...prev,
      [name]: value
    }));
  };

    /*
    -----------------------------------------------------------------------
      Purpose: Handle submission of complaint.
      Parameters: Event.
      Postcondition: Updates component state from input values.
    -----------------------------------------------------------------------
    */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (complaint.description.length > DESCRIPTION_MAX_LENGTH) {
      alert(`Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters. Currently at ${complaint.description.length} characters.`);
      return;
    }

    try {
      const vehicle = await findVehicle(
        complaint.make, 
        complaint.model, 
        complaint.year
      );
      
      if (!vehicle) {
        alert("No matching vehicle found.");
        return;
      }

      await submitComplaint(
        {
          vehicleId: vehicle.id,
          issue: complaint.issue,
          description: complaint.description,
          cost: complaint.cost
        },
        localStorage.getItem('token')
      );

      setComplaint({
        make: '',
        model: '',
        year: '',
        issue: '',
        description: '',
        cost: ''
      });
      
      alert("Complaint submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit complaint. Please try again.");
    } 
  };

  return (
    <>
      <Menu />
      <div className="fixes-container">
      <div className="complaint-holder" style={{ background: "#ca0000", borderRadius: "12px", width: "65%",  marginLeft: "15%" }}>
        <h2 style={{ color: "#e2e2e2", marginLeft: "37%"  }}>
          Add Complaint
        </h2>

        <div className="complaint-holder2" style={{ background: "#e2e2e2", borderRadius: "12px", padding: "3%" }}>
          <form onSubmit={handleSubmit}>
            <label>1. Select the Car Brand</label>
            <div>
              <select name="make" value={complaint.make} onChange={handleChange} required>
                <option value="">Select Make</option>
                {makes.map((make, idx) => (
                  <option key={idx} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <label>2. Select the Car Model</label>
            <div>
              <select name="model" value={complaint.model} onChange={handleChange} required>
                <option value="">Select Model</option>
                {models.map((model, idx) => (
                  <option key={idx} value={model}>{model}</option>
                ))}
              </select>
            </div>

            <label>3. Select the Model Year</label>
            <div>
              <select name="year" value={complaint.year} onChange={handleChange} required>
                <option value="">Select Year</option>
                {years.map((year, idx) => (
                  <option key={idx} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <label>4. What issue did you face with the car?</label>
            <div>
              <input type="text" name="issue" value={complaint.issue} onChange={handleChange} required />
            </div>

            <label>5. Describe what happened with the car below:</label>
            <div>
              <textarea name="description" style = {{width: "42%"}} value={complaint.description} maxLength={DESCRIPTION_MAX_LENGTH} onChange={handleChange} required />
              {charCount}/{DESCRIPTION_MAX_LENGTH}
            </div>

            <label>6. How much did it cost? ($)</label>
            <div>
              <input type="text" name="cost" style = {{width: "22%"}} value={complaint.cost} onChange={handleChange} required />
            </div>

            <button className='add-veh-btn' style={{marginTop: "2%"}} type="submit">Submit Complaint</button>
          </form>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default AddComplaint;
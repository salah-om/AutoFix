import { useEffect, useState } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import http from "../http-common";

const AddComplaint = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);

  const [complaint, setComplaint] = useState({
    make: '',
    model: '',
    year: '',
    issue: '',
    description: '',
    cost: ''
  });

  useEffect(() => {
    fetchMakes();
  }, []);

  useEffect(() => {
    if (complaint.make) {
      fetchModels(complaint.make);
    }
    if (complaint.make && complaint.model) {
      fetchYears(complaint.make, complaint.model);
    }
  }, [complaint.make, complaint.model]);

  const fetchMakes = async () => {
    const res = await http.get('/vehicles/makes');
    setMakes(res.data);
  };

  const fetchModels = async (make) => {
    const res = await http.get(`/vehicles/models/${make}`);
    setModels(res.data);
  };

  const fetchYears = async (make, model) => {
    const res = await http.get(`/vehicles/years/${make}/${model}`);
    setYears(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vehicleRes = await http.get(
        `/vehicles?make=${complaint.make}&model=${complaint.model}&year=${complaint.year}`
      );
      
      if (!vehicleRes.data || !vehicleRes.data[0]) {
        alert("No matching vehicle found.");
        return;
      }

      await http.post('/complaints', {
        vehicleId: vehicleRes.data[0].id,
        issue: complaint.issue,
        description: complaint.description,
        cost: complaint.cost
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      alert("Complaint submitted successfully!");
      setComplaint({
        make: '',
        model: '',
        year: '',
        issue: '',
        description: '',
        cost: ''
      });

    } catch (err) {
      alert("Failed to submit complaint.");
    }
  };

  return (
    <>
      <Menu />
      <div className="complaint-holder" style={{ background: "orange", borderRadius: "12px", width: "65%",  marginLeft: "15%" }}>
        <h2 style={{ color: "black", marginLeft: "37%"  }}>
          Add Complaint
        </h2>

        <div className="complaint-holder2" style={{ background: "wheat", borderRadius: "12px", padding: "3%" }}>
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
              <textarea name="description" value={complaint.description} onChange={handleChange} required />
            </div>

            <label>6. How much did/does it cost to fix?</label>
            <div>
              <input type="text" name="cost" value={complaint.cost} onChange={handleChange} required />
            </div>

            <button type="submit">Submit Complaint</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddComplaint;
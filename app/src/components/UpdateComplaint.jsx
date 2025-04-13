import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";
import http from "../http-common";

const UpdateComplaint = () => {
  const [userComplaints, setUserComplaints] = useState([]);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form state for editing
  const [formData, setFormData] = useState({
    issue: '',
    description: '',
    cost: ''
  });

  useEffect(() => {
    fetchUserComplaints();
  }, []);

  const fetchUserComplaints = async () => {
    try {
      setLoading(true);
      const response = await http.get('/complaints/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setUserComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (complaint) => {
    setEditingComplaint(complaint);
    setFormData({
      issue: complaint.issue,
      description: complaint.description,
      cost: complaint.cost
    });
  };

  const handleCancelEdit = () => {
    setEditingComplaint(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await http.patch(`/complaints/${editingComplaint.id}`,
        {
          issue: formData.issue,
          description: formData.description,
          cost: formData.cost
        }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      setUserComplaints(userComplaints.map(complaint => 
        complaint.id === editingComplaint.id 
          ? { ...complaint, ...formData } 
          : complaint
      ));

      alert("Complaint updated successfully!");
      setEditingComplaint(null);
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert("Failed to update complaint.");
    }
  };

  const handleDelete = async (complaintId) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        await http.delete(`/complaints/${complaintId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });

        setUserComplaints(userComplaints.filter(c => c.id !== complaintId));
        alert("Complaint deleted successfully!");
      } catch (error) {
        console.error("Error deleting complaint:", error);
        alert("Failed to delete complaint.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Menu />
      <div className="fixes-container">
      <div className="complaint-holder" style={{ background: "orange", borderRadius: "12px", width: "65%", marginLeft: "15%" }}>
        <h2 style={{ color: "black", marginLeft: "37%" }}>
          Your Complaints
        </h2>

        <div className="complaint-holder2" style={{ background: "wheat", borderRadius: "12px", padding: "3%" }}>
          {userComplaints.length === 0 ? (
            <div>
              <p>No complaints made yet.</p>
              <button 
                onClick={() => navigate('/add-complaint')}
                style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
              >
                Add a Complaint
              </button>
            </div>
          ) : (
            <div>
              {editingComplaint ? (
                <form onSubmit={handleUpdateSubmit}>
                  <h3>Editing: {editingComplaint.vehicle.make} {editingComplaint.vehicle.model} ({editingComplaint.vehicle.year})</h3>
                  
                  <label>Issue:</label>
                  <input
                    type="text"
                    name="issue"
                    value={formData.issue}
                    onChange={handleInputChange}
                    required
                  />

                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />

                  <label>Cost:</label>
                  <input
                    type="text"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    required
                  />

                  <div style={{ marginTop: '1rem' }}>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '1rem' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="complaints-list">
                  {userComplaints.map(complaint => (
                    <div key={complaint.id} className="complaint-card">
                      <div className="complaint-header">
                        <h3>{complaint.vehicle.make} {complaint.vehicle.model} ({complaint.vehicle.year})</h3>
                        <span className="date">
                          {new Date(complaint.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="complaint-body">
                        <h4>Issue: {complaint.issue}</h4>
                        <p style={{color: "black"}}>Description: {complaint.description}</p>
                        <p style={{color: "black"}}>Cost: ${complaint.cost}</p>
                      </div>
                      <div className="complaint-actions">
                        <button onClick={() => handleEditClick(complaint)}>Edit</button>
                        <button 
                          onClick={() => handleDelete(complaint.id)}
                          style={{ marginLeft: '0.5rem', backgroundColor: '#ff6b6b' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateComplaint;
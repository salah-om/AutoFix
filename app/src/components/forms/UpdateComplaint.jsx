import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../sidebars/Menu";
import Footer from "../sidebars/Footer";
import { fetchUserComplaints, updateComplaint, deleteComplaint } from "../../services/ComplaintService";

const UpdateComplaint = () => {
  const [userComplaints, setUserComplaints] = useState([]);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const DESCRIPTION_MAX_LENGTH = 255;

  const [formData, setFormData] = useState({
    issue: '',
    description: '',
    cost: ''
  });

  const charCount = formData.description.length;

  useEffect(() => {
    getUserComplaints();
  }, []);

  /*
  -----------------------------------------------------------------------
    Purpose: Fetches all complaints for the current user.
    Parameters: None.
    Postcondition: Updates userComplaints state with fetched data.
  -----------------------------------------------------------------------
  */
  const getUserComplaints = async () => {
    try {
      setLoading(true);
      const complaints = await fetchUserComplaints();
      setUserComplaints(complaints);
    } catch (error) {
      console.error("Complaints fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
  -----------------------------------------------------------------------
    Purpose: Handles edit button click.
    Parameters: complaint (object) - The complaint to edit.
    Postcondition: Sets up form with complaint data for editing.
  -----------------------------------------------------------------------
  */
  const handleEditClick = (complaint) => {
    setEditingComplaint(complaint);
    setFormData({
      issue: complaint.issue,
      description: complaint.description,
      cost: complaint.cost
    });
  };

  /*
  -----------------------------------------------------------------------
    Purpose: Cancels the editing mode.
    Parameters: None.
    Postcondition: Resets editing state.
  -----------------------------------------------------------------------
  */
  const handleCancelEdit = () => {
    setEditingComplaint(null);
  };

  /*
  -----------------------------------------------------------------------
    Purpose: Handles form input changes.
    Parameters: e (event) - The input change event.
    Postcondition: Updates formData state with new values.
  -----------------------------------------------------------------------
  */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /*
  -----------------------------------------------------------------------
    Purpose: Handles complaint update submission.
    Parameters: e (event) - The form submission event.
    Postcondition: Updates complaint and refreshes the list.
  -----------------------------------------------------------------------
  */
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedComplaint = await updateComplaint(
        editingComplaint.id,
        formData
      );

      setUserComplaints(userComplaints.map(complaint => 
        complaint.id === editingComplaint.id 
          ? { ...complaint, ...updatedComplaint } 
          : complaint
      ));

      alert("Complaint updated successfully!");
      setEditingComplaint(null);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update complaint.");
    }
  };

  /*
  -----------------------------------------------------------------------
    Purpose: Handles complaint deletion.
    Parameters: complaintId (string/number) - ID of complaint to delete.
    Postcondition: Removes complaint from list after confirmation.
  -----------------------------------------------------------------------
  */
  const handleDelete = async (complaintId) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        await deleteComplaint(complaintId);
        setUserComplaints(userComplaints.filter(c => c.id !== complaintId));
        alert("Complaint deleted successfully!");
      } catch (error) {
        console.error("Deletion error:", error);
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
        <div className="complaint-holder" style={{ background: "#ca0000", borderRadius: "12px", width: "65%", marginLeft: "15%" }}>
          <h2 style={{ color: '#e2e2e2', marginLeft: "37%" }}>
            Your Complaints
          </h2>

          <div className="complaint-holder2" style={{ background: "#e2e2e2", borderRadius: "12px", padding: "3%" }}>
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
                    <div>
                      <input
                        type="text"
                        name="issue"
                        value={formData.issue}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <label>Description:</label>
                    <div>
                      <textarea
                        style={{width: "42%"}}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        maxLength={DESCRIPTION_MAX_LENGTH}
                        required
                      />
                      {charCount}/{DESCRIPTION_MAX_LENGTH}
                    </div>

                    <label>Cost ($):</label>
                    <div>
                      <input
                        type="text"
                        name="cost"
                        value={formData.cost}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <button className='add-veh-btn' type="submit">Save Changes</button>
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
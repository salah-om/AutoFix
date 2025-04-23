import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";
import { createFix, getFixById, updateFix } from "../../services/FixService";

const FixesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [fix, setFix] = useState({
    issue: '',
    description: '',
    videourl: ''
  });

  useEffect(() => {
    if (id) {
      fetchFixById(id);
    }
  }, [id]);

  /*
  -----------------------------------------------------------------------
    Purpose: Fetches fix by id.
    Parameters: fix id.
    Postcondition: Sets the JSON data to setFix.
  -----------------------------------------------------------------------
  */
  const fetchFixById = async (fixId) => {
    try {
      setLoading(true);
      const response = await getFixById(fixId);
      const fixData = response.data || response;
      
      setFix({
        issue: fixData.issue || '',
        description: fixData.description || '',
        videourl: fixData.videourl || ''
      });
      
    } catch (e) {
      console.error("Error fetching fix data:", e);
    } finally {
      setLoading(false);
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
    const { name, value } = event.target;
    setFix((prevFix) => ({ ...prevFix, [name]: value }));
  };

  /*
  -----------------------------------------------------------------------
    Purpose: Handles file input changes.
    Parameters: Event.
    Postcondition: Updates component state with file name.
  -----------------------------------------------------------------------
  */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFix((prevFix) => ({ ...prevFix, videourl: file.name }));
    }
  };

  /*
  -----------------------------------------------------------------------
    Purpose: Updates Fix Data user is editing.
    Parameters: Event.
    Postcondition: Updates fix and navigates to list view.
  -----------------------------------------------------------------------
  */
  const saveFix = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await updateFix(id, fix);
      } else {
        await createFix(fix);
      }
      navigate('/mechanic/fixes');
    } catch(error) {
      console.error("Error updating fix:", error);
    }
  };

  if (loading) {
    return <div>Loading fix details...</div>;
  }

  return (
    <>
      <div className="container-veh-form">
        <div className="card-veh">
          <nav className="back">
            <IoCaretBackCircle />
            <Link to="/mechanic/fixes">Back</Link>
          </nav>
          <h2>{id ? "Edit Fix" : "Add Fix"}</h2>

          <form onSubmit={saveFix}>
            <div className="form-group">
              <label style={{color: "#fc9c00"}}> Issue</label>
              <input 
                onChange={handleChange} 
                type="text" 
                className="form-control" 
                placeholder="Issue" 
                name="issue" 
                value={fix.issue}
                required
              />
            </div>
            <div className="form-group">
              <label style={{color: "#fc9c00"}}>Description</label>
              <input 
                onChange={handleChange} 
                type="text" 
                className="form-control" 
                placeholder="Description" 
                name="description" 
                value={fix.description}
                required
              />
            </div>
            <div className="form-check">
              <label style={{color: "#fc9c00"}}>Video Url</label>
              <input 
                type="file" 
                id="videourl"  
                name="videourl"  
                className="form-control" 
                style={{marginLeft: "-7%", width: "107%"}}
                onChange={handleFileChange}
              />
              {fix.videourl && <p>Current: {fix.videourl}</p>}
            </div>
            
            <button type="submit" className="add-veh-btn">
              {id ? "Update Fix" : "Add Fix"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FixesForm;
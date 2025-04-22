import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";
import { createFix, getFixById, updateFix } from "../../services/FixService";

const FixesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fix, setFix]= useState({
    issue:'',
    description:'',
    videourl:''
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
            const response = await getFixById(fixId);
            setFix({
                issue: response.data?.issue || '',
                description: response.data?.description || '',
                videourl: response.data?.videourl || ''
            }); 
        } catch (e) {
            console.error("Error fetching fix data:", e);
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
      Purpose: Updates Fix Data user is editing.
      Parameters: Event.
      Postcondition: Updates fix.
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
                        <input onChange={handleChange} type="text" className="form-control" placeholder="Issue" name ="issue" value={fix.issue}/>
                        </div>
                    <div className="form-group">
                        <label style={{color: "#fc9c00"}}>Description</label>
                        <input onChange={handleChange} type="text" className="form-control" placeholder="Description" name ="description" value={fix.description}/>
                    </div>
                    <div className="form-check">
                        <label style={{color: "#fc9c00"}}>Video Url</label>
                        <input type="file" id="videourl"  name="videourl"  className="form-control" style={{marginLeft: "-7%", width: "107%"}} required>
                        </input>
                    </div>
                    
                    <button type="submit" className="add-veh-btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FixesForm;
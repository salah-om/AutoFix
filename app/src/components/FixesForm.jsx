import http from "../http-common";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";

const FixesForm = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [fix,setFix]= useState({
         issue:'',
         description:'',
         videourl:''
        }
    )

    useEffect(() => {
        if (id) {
            fetchFixById(id);
        }
    }, [id]);

    const fetchFixById = async (fixId) => {
        try {
            const response = await http.get(`/fixes/${fixId}`);
            setFix(response.data); 
        } catch (e) {
            console.error("Error fetching fix data:", e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFix((prevFix) => ({ ...prevFix, [name]: value }));
    };
    

    const saveFix = async (event) => {
        event.preventDefault();

        try {
            if (id) {
            await http.patch(`/fixes/${id}`, fix);
            } else {
                await http.post('/fixes', fix);
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
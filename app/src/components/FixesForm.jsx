import http from "../http-common";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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
            <nav><Link to ='/mechanic/fixes'>Back</Link></nav>
            <form onSubmit={saveFix}>
                <div className="form-group">
                    <label style={{color: "white"}}> Issue</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Issue" name ="issue" value={fix.issue}/>
                </div>
                <div className="form-group">
                    <label style={{color: "white"}}>Description</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Description" name ="description" value={fix.description}/>
                </div>

                <div className="form-check">
                    <label style={{color: "white"}}>Video Url</label>
                    <input type="file"
                        id="videourl" 
                        name="videourl" 
                        className="form-control"  
                        onChange={handleChange} 
                        required
                   ></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default FixesForm;
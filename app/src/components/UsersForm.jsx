import http from "../http-common";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const UsersForm = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [user,setUser]= useState({
         username:'',
         email:'',
         role:''
        }
    )

    useEffect(() => {
        if (id) {
            fetchUserById(id);
        }
    }, [id]);

    const fetchUserById = async (userId) => {
        try {
            const response = await http.get(`/users/${userId}`);
            setUser(response.data); 
        } catch (e) {
            console.error("Error fetching user data:", e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    

    const saveUser = async (event) => {
        event.preventDefault();

        try {
            if (id) {
            await http.patch(`/users/${id}`, user);
            }

            navigate('/admin/users');
        } catch(error) {
            console.error("Error updating user:", error);
        }
    };


    return (
        <>
            <nav><Link to ='/admin/users'>Back</Link></nav>
            <form onSubmit={saveUser}>
                <div className="form-group">
                    <label style={{color: "white"}}> Username</label>
                    <input onChange={(event) => handleChange('username', event.target.value)} type="text" className="form-control" placeholder="Username" name ="username" value={user.username}/>
                </div>
                <div className="form-group">
                    <label style={{color: "white"}}>Email</label>
                    <input onChange={(event) => handleChange('email', event.target.value)} type="text" className="form-control" placeholder="Email" name ="email" value={user.email}/>
                </div>

                <div className="form-check">
                    <label style={{color: "white"}}>Role</label>
                    <select 
                        id="role" 
                        name="role" 
                        className="form-control" 
                        value={user.role} 
                        onChange={handleChange} 
                        required
                    >

                        {["Admin", "Mechanic", "Visitor"].map((role) => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default UsersForm;
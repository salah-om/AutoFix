import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";
import { getUserById, updateUser } from "../../services/UserService";

const UsersForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser]= useState({
      username:'',
      email:'',
      role:''
    });

    useEffect(() => {
        if (id) {
            fetchUserById(id);
        }
    }, [id]);

    /*
    -----------------------------------------------------------------------
      Purpose: Fetches user by id.
      Parameters: user id.
      Postcondition: Sets the JSON data to setUser.
    -----------------------------------------------------------------------
    */
    const fetchUserById = async (userId) => {
        try {
          const userData = await getUserById(userId);
          console.log('User data:', userData); 
          
          if (!userData) {
            throw new Error('No user data received');
          }
      
          setUser({
            username: userData.username || '',
            email: userData.email || '',
            role: userData.role || 'Visitor'
          });
        } catch (e) {
          console.error("Error fetching user:", e);
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
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    
    /*
    -----------------------------------------------------------------------
      Purpose: Updates User Data user is editing.
      Parameters: Event.
      Postcondition: Updates user.
    -----------------------------------------------------------------------
    */
    const saveUser = async (event) => {
        event.preventDefault();

        try {
            if (id) {
              await updateUser(id, user);
            }
            navigate('/admin/users');
        } catch(error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <>
            <div className="container-veh-form">
            <div className="card-veh" style={{height: "362px"}}>
            <nav className="back">
                          <IoCaretBackCircle />
                          <Link to="/admin/users">Back</Link></nav>
            <h2>Edit User</h2>
            <form onSubmit={saveUser}>
                <div className="form-group">
                    <label style={{color: "#fc9c00"}}> Username</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Username" name ="username" value={user.username}/>
                </div>
                <div className="form-group">
                    <label style={{color: "#fc9c00"}}>Email</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Email" name ="email" value={user.email}/>
                </div>

                <div className="form-check">
                    <label style={{color: "#fc9c00"}}>Role</label>
                    <select id="role" name="role" className="form-control"style={{marginLeft: "-7%", width: "43%"}}value={user.role} onChange={handleChange} required>
                        {["Admin", "Mechanic", "Visitor"].map((role) => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="add-veh-btn">Submit</button>
            </form>
            </div>
            </div>
        </>
    )
}

export default UsersForm;
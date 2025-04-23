import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RespSidebar from "../sidebars/RespSidebar";
import { getAllUsers, deleteUser } from "../../services/UserService";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
    }, []);

    /*
    -----------------------------------------------------------------------
      Purpose: Fetches users from API
      Parameters: None.
      Return: Sets the JSON data receieved to setUsers
    -----------------------------------------------------------------------
    */
    const loadUsers = async () => {
        try {
            setLoading(true);
            const usersData = await getAllUsers();
            setUsers(usersData);
        } catch (err) {
            console.error("User fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    /*
    -----------------------------------------------------------------------
      Purpose: Handles user edit navigation
      Parameters: id - User ID to edit
      Side Effects: Navigates to edit form
    -----------------------------------------------------------------------
    */
    const handleEdit = (id) => {
        navigate(`/admin/users/edit-form/${id}`);
    };

    /*
    -----------------------------------------------------------------------
      Purpose: Handles user deletion with confirmation
      Parameters: id - User ID to delete
      Side Effects: Updates local state on success
    -----------------------------------------------------------------------
    */
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        
        try {
            await deleteUser(id);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (err) {
            console.error("Delete user error:", err);
            alert(err.response?.data?.message || "Failed to delete user");
        }
    };

    /*
    -----------------------------------------------------------------------
      Purpose: Determines role display color
      Parameters: role - User role string
      Returns: Color code for styling
    -----------------------------------------------------------------------
    */
    const convertColor = (role) => {
        if (role === "Visitor") return "green";
        if (role === "Mechanic") return "orange";
        return "red";
    };

    if (loading) return <div>Loading users...</div>;

    return (
        <>
        <RespSidebar />
        <div className="container-for-users" style={{maxWidth: "965px"}}>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user)=>{
                            return(
                                <tr key={user.id}>
                                    
                                    <td>{user?.id}</td>
                                    <td>{user?.username}</td>
                                    <td>{user?.email}</td>
                                    <td style={{color: convertColor(user?.role)}}>{user?.role}</td>
                                    <td> 
                                        <button onClick={() => handleEdit(user.id)} className="btn btn-primary btn-sm">
                                        <i className="bx bxs-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm mx-2">
                                        <i className="bx bxs-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            </div>
        </>
    );
};

export default Users;
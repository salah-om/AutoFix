import { useEffect, useState } from "react";
import RespSidebar from "./RespSidebar";
import http from "../http-common";


const Users = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await http.get("/users");
            setUsers(response?.data);
        } catch (e) {
            alert('Route not found'+e);
        }
    }

    const handleEdit = (id) => {
        window.location.href = `/admin/users/edit-form/${id}`;
    };

    const handleDelete = async (id) => {
        try {
            await http.delete(`/users/${id}`);
            setUsers(users.filter(user => user.id !== id)); 
        } catch (e) {
            alert('Error deleting user: ' + e);
        }
    };

    const convertColor = (role) => {
        if(role === "Visitor") return "green";
        if (role === "Mechanic") return "orange";
        return "red";
    }

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
    )
}

export default Users;
import { useEffect, useState } from "react";
import axios from "axios";
import UsersForm from "./UsersForm";


const Users = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
        fetchUsers();
    }, users);

    const fetchUsers = async () => {
        try {
            const URL = 'http://localhost:3000/users';
            const response = await axios.get(URL);
            console.log(response.data);
            setUsers(response?.data);
        } catch (e) {
            alert('Route not found'+e);
        }finally{
            
        }
    }

    const convertColor = (status) => {
        if(status === "Visitor"){
            return "green";
        } else if (status === "Mechanic"){
            return "gray";
        }
        return "red";
    }

    return (
        <>
        <div className="container">
        <button style={{backgroundColor: 'green'}}><span style={{color: '#FFFFFF'}}>+</span></button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user)=>{
                            return(
                                <tr>
                                    <td>{user?.id}</td>
                                    <td>{user?.username}</td>
                                    <td>{user?.email}</td>
                                    <td style={{color: convertColor(user?.status)}}>{user?.status}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>

            </table>
            <UsersForm fetchUser={fetchUsers} />
            </div>
        </>
    )
}

export default Users;
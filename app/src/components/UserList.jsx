import {useState, useMemo} from "react";
import {useUsers} from "../context/UserContext";

const UserList = () =>{
    const {users} = useUsers();
    const [search, setSearch] = useState("");

    const filteredUsers = useMemo(() =>{
        return users.filter((user) =>{
            user.name.toLowerCase().includes(search.toLowerCase());
        });
    }, [users, search]);

    return (
        <div>
            <input type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            className="border p-2 mb-4"
            />
            <ul>
                {
                    filteredUsers.map((user)=>{
                        <li key={user.id} className="p-2 border-b">
                            {user.name} ({user.email})
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default UserList;
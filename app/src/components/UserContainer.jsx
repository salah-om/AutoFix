
import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useUsers } from "../context/UserContext";
import UserList from "./UserList";

const UserContainer = () =>{
    const {data, loading, error} = useFetch("https://jsonplaceholder.typicode.com/users");
    const {setUsers} = useUsers;

    useEffect(()=>{
        if(data){
            // I am setting the context, it will reflected in other components
            setUsers(data);
        }
    }, [data, setUsers]);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error}</p>;

    return(
        <UserList />
    );
};

export default UserContainer;
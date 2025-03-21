import { UserProvider } from "../context/UserContext";
import UserContainer from "./UserContainer";

const UserManagement = () =>{

    return (
        <UserProvider>
        <div className="container mx-auto p-4">
            <h1> User Management</h1>
            <UserContainer />
        </div>
        </UserProvider>
    );
}

export default UserManagement;
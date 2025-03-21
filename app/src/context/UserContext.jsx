import {createContext, useContext, useState} from "react";

const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [users, setUsers] = useState([]);
    
    return(
        <UserContext.Provider value={{users, setUsers}}>
            {children}
        </UserContext.Provider>
    )
};

export const useUsers = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error("use Users must be used within a userProvider")
    }
    return context;
};
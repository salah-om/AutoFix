import axios from "axios";
import { useState } from "react";


const UsersForm = (fetchUsers) => {

    const [user,setUser]= useState({
         firstName:'',
         lastName:'',
         isActive:false
        }
    )

    const handleChange = (name, value) =>{
        setUser({...user,[name]:value});
    }

    const saveUser = async(event) =>{
        event.preventDefault();
        const URL = 'http://localhost:3000/users';
        const result = await axios.post(URL, user);
        console.log(result);
        fetchUsers();
    }


    return (
        <>
            <form>
                <div className="form-group">
                    <label >First Name</label>
                    <input onChange={(event) => handleChange('firstName', event.target.value)} type="text" className="form-control" placeholder="First Name" />
                </div>
                <div className="form-group">
                    <label >Last Name</label>
                    <input onChange={(event) => handleChange('lastName', event.target.value)} type="text" className="form-control" placeholder="Last Name" />
                </div>
                <div className="form-check">
                    <input onChange={(event) => handleChange('isActive', event.target.checked)} type="checkbox" className="form-check-input" />
                    <label className="form-check-label" >is Active</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event)=>saveUser(event)}>Submit</button>
            </form>
        </>
    )
}

export default UsersForm;
import { useState } from "react";
import { getAll, authenticate, signUp } from "../services/UserService";
import {setToken} from "../utility/Utility";

const Registration = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signUp(
                formData.username,
                formData.email,
                formData.password
            );
            setToken(result.data.token);
            const users = await getAll();
            console.log(users);
            
            alert("Registration successful!");
        } catch (err) {
            console.log(err);
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px", background: "#000", color: "#fff" }}>
                <h2 className="text-center mb-4">Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-light w-100">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
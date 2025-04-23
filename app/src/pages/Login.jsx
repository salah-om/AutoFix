import { useState } from "react";
import { authenticate, signUp } from "../services/UserService";
import { setRole, setToken } from "../utility/Utility";
import { useNavigate } from "react-router-dom";

/*
----------------------------------------------------------------------------------
  Purpose: Login page allows user to navigate to each view based on role
  Return:  - Validation of user credentials 
           - Navigation to specific views
----------------------------------------------------------------------------------
*/
const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true); 

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

  /*
  -----------------------------------------------------------------------
    Purpose: Handles change in data.
    Parameters: Event.
    Postcondition: Updates component state from input values.
  -----------------------------------------------------------------------
  */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /*
    -------------------------------------------------------------------------
      Purpose: Handle submission of login.
      Parameters: Event.
      Postcondition: Submits user credentials for validation and navigation.
    -------------------------------------------------------------------------
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                if (!formData.email || !formData.password) {
                    alert("Email/password cannot be empty.");
                    return;
                }
                const response = await authenticate(formData.email, formData.password);
                setToken(response.data.access_token);
                setRole(response.data.user.role);

                const role = response.data.user.role;
                if (role === "Admin") navigate("/admin");
                else if (role === "Mechanic") navigate("/mechanic");
                else navigate("/home");
            } else {
                await signUp(formData.username, formData.email, formData.password);
                alert("Registration successful!");
                setIsLogin(true); 
            }
        } catch (err) {
            setError(isLogin ? "Incorrect email or password." : "Registration failed.");
        }
    };

    return (
        <div className="login-page">
            <div className="wrapper">
                <img src='/autofixlogoo.png' alt="Logo" className="logo" />
                <h1>{isLogin ? "Login" : "Register"}</h1>
                
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-box">
                            <input
                                type="text" 
                                name="username" 
                                value={formData.username}
                                placeholder="Username" 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    )}

                    <div className="input-box">
                        <input
                            type="email" 
                            name="email" 
                            value={formData.email}
                            placeholder="Email" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="password" 
                            name="password" 
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-login">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>

                    <div className="register-link">
                        <p>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                setIsLogin(!isLogin);
                            }}>
                                {isLogin ? "Register" : "Login"}
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
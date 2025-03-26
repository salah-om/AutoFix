import { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { authenticate, signUp } from "../services/UserService";
import { setRole, setToken } from "../utility/Utility";
import { useNavigate } from "react-router-dom";
import '../styles/index.css';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true); 

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
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg border-0" style={{ width: "400px", borderRadius: "10px" }}>
                <Card.Body>
                    <img src='/autologos.png'></img>
                    <h2 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="text" 
                                    name="username" 
                                    value={formData.username}
                                    placeholder="Username" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </Form.Group>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="email" 
                                name="email" 
                                value={formData.email}
                                placeholder="Email" 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="password" 
                                name="password" 
                                value={formData.password}
                                placeholder="Password"
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
                            <p className="text-center mt-3">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                <span 
                                    className="text-primary fw-bold text-decoration-none" 
                                    style={{ cursor: "pointer" }} 
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? "Register" : "Login"}
                                </span>
                            </p>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
 
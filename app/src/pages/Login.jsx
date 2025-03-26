import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { authenticate } from "../services/UserService"; 
import { setRole, setToken } from "../utility/Utility"; 
import { Link, useNavigate } from "react-router-dom";
import '../styles/index.css';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (!user.email || !user.password) {
                alert("Email/password cannot be empty.");
                return;
            }
            const response = await authenticate(user.email, user.password);
            const data = response?.data;
            setToken(data?.access_token);
            setRole(data?.user?.role);

            const role = data?.user?.role;
            if (role === "Admin") {
                navigate("/admin");
            } else if (role === "Mechanic") {
                navigate("/mechanic");
            } else if (role === "Visitor"){
                navigate("/home");
            }
        } catch (e) {
            alert("Incorrect email or password.");
        }
    };

    return (
        <div className ='cont'>
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg border-0" style={{ width: "400px", borderRadius: "10px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">Login</Button>
                            <p className="text-center mt-3">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-primary fw-bold text-decoration-none">
                                 Register
                                </Link>
                            </p>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
};

export default Login;

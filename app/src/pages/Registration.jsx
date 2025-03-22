import { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAll, signUp } from "../services/UserService";
import { setToken } from "../utility/Utility";

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
            await getAll();
            
            alert("Registration successful!");
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg border-0" style={{ width: "400px", borderRadius: "10px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" type="submit">Sign Up</Button>
                        </div>

                        <p className="text-center mt-3">
                            Already have an account?{" "}
                            <Link to="/" className="text-primary fw-bold text-decoration-none">
                                Login
                            </Link>
                        </p>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Registration;

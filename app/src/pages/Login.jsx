import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { authenticate } from "../services/UserService"; 
import { setToken } from "../utility/Utility"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (user.email === '' || user.password === '') {
                alert('Email/password cannot be empty.');
                return;
            }
            const response = await authenticate(user.email, user.password);
            const data = response?.data;
            setToken(data?.access_token);

            if (data?.user) {
                alert('You are logged in.');
                navigate('/'); 
            } else {
                alert('Incorrect email or password.');
            }
        } catch (e) {
            alert('Incorrect email or password.');
        }
    };

    return (
        <Container className="w-50">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
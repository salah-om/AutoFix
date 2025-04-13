import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>

      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            
            <Nav className="nav-left">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/common-fixes">Common Fixes</Nav.Link>
              <Nav.Link as={Link} to="/news">News</Nav.Link>
            </Nav>

            <Navbar.Brand className="logo">
              <img src="/autofixlogoo.png" alt="Logo" height="40" />
            </Navbar.Brand>

            <Nav className="nav-right">
              <Nav.Link as={Link} to="/add-complaint">Add Complaint</Nav.Link>
              <Nav.Link as={Link} to="/update-complaint">Update Complaint</Nav.Link>
              <Nav.Link as={Link} to="/chat">Chat with a Mechanic</Nav.Link>
              <Nav.Link as={Link} to="/"><span>Sign Out&nbsp;&nbsp;</span><FaSignOutAlt /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;

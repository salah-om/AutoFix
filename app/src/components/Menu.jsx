import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      {/* Search Bar */}
      <div className="search-bar-container">
        <Form className="d-flex search-bar">
          <FormControl type="search" placeholder="Search..." className="me-2" />
          <Button>
            <FaSearch />
          </Button>
        </Form>
      </div>

      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            
            {/* Left Menu */}
            <Nav className="nav-left">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/tutorials">Common Fixes</Nav.Link>
              <Nav.Link as={Link} to="/api">News</Nav.Link>
            </Nav>

            {/* Logo in Center */}
            <Navbar.Brand className="logo">
              <img src="/aautologos.png" alt="Logo" height="40" />
            </Navbar.Brand>

            {/* Right Menu */}
            <Nav className="nav-right">
              <Nav.Link as={Link} to="/add/complaint">Add Complaint</Nav.Link>
              <Nav.Link as={Link} to="/update/complaint">Update Complaint</Nav.Link>
              <Nav.Link as={Link} to="/chat">Chat with a Mechanic</Nav.Link>
              <Nav.Link as={Link} to="/">Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;

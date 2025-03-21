import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";

const Menu = () =>{
    return(
        <Navbar bg="dark" variant='dark' expand='lg' className='mb-4'>
        <Container>
          <Nav as={Link} to="/">User Management</Nav>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/registration">Registration</Nav.Link>
              <Nav.Link as={Link} to="/users">Users</Nav.Link>
              <Nav.Link as={Link} to="/user-context">Users Context</Nav.Link>
            </Nav>
          </Navbar.Collapse>


        </Container>
      </Navbar>
    )
}

export default Menu;
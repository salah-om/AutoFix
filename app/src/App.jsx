import { Container } from 'react-bootstrap';
import Users from './components/Users';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Menu from './components/Menu';
import UserManagement from './components/UserManagement';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <Router>
      <Menu />
      <Container>
        <Routes>
          <Route
            path="/" element={<h1 className='text-center'>
              Welcome to user management</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user-context" element={<UserManagement />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App;
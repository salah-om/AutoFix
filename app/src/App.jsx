import { Container } from 'react-bootstrap';
import Users from './components/Users';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Admin from './pages/Admin';
import Mechanic from './pages/Mechanic';
import Menu from './components/Menu';
import UserManagement from './components/UserManagement';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/home" element={<Home />} />

          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Mechanic"]} />}>
          <Route path="/mechanic" element={<Mechanic />} />
          </Route>

          <Route path="/users" element={<Users />} />
          <Route path="/user-context" element={<UserManagement />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App;
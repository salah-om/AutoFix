import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Users from './components/Users';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Admin from './pages/Admin';
import Mechanic from './pages/Mechanic';
import UsersForm from './components/UsersForm';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Vehicles from './components/Vehicles';
import VehiclesForm from './components/VehiclesForm';
import Unauthorized from './pages/Unauthorized';

function App() {

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/unauth" element={<Unauthorized />} />
          <Route path="/signup" element={<Registration />} />

          <Route element={<PrivateRoute allowedRoles={["Visitor"]} />}>
          <Route path="/home" element={<Home />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Mechanic"]} />}>
          <Route path="/mechanic" element={<Mechanic />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/users" element={<Users />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/users/edit-form/:id" element={<UsersForm />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/vehicles" element={<Vehicles />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/vehicles/edit-form/:id" element={<VehiclesForm />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/vehicles/add" element={<VehiclesForm />} />
          </Route>

        </Routes>
      </Container>
    </Router>
  )
}

export default App;
import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Users from './components/tables/Users';
import Complaints from './components/tables/Complaints';
import Fixes from './components/tables/Fixes';
import Vehicles from './components/tables/Vehicles';
import Mechanic from './pages/Mechanic';
import UsersForm from './components/forms/UsersForm';
import VehiclesForm from './components/forms/VehiclesForm';
import FixesForm from './components/forms/FixesForm';
import AddComplaint from './components/forms/AddComplaint';
import UpdateComplaint from './components/forms/UpdateComplaint';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './pages/Unauthorized';
import Models from './components/Models';
import ModelSummary from './components/ModelSummary';
import CommonFixes from './components/CommonFixes';
import News from './components/News';
import SearchComplaints from './components/SearchComplaints';
import FixesDetails from './components/FixesDetails';

function App() {

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/unauth" element={<Unauthorized />} />

          <Route element={<PrivateRoute allowedRoles={["Visitor"]} />}>
          <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Visitor"]} />}>
          <Route path="/common-fixes" element={<CommonFixes />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Visitor"]} />}>
          <Route path="/common-fixes/:issue" element={<FixesDetails />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Visitor"]} />}>
          <Route path="/news" element={<News />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Visitor"]} />}>
          <Route path="/cars/:make" element={<Models />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Visitor"]} />}>
          <Route path="/cars/:make/:model" element={<ModelSummary />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Visitor"]} />}>
          <Route path="/add-complaint" element={<AddComplaint />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Visitor"]} />}>
          <Route path="/update-complaint" element={<UpdateComplaint />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Visitor"]} />}>
          <Route path="/search-complaints" element={<SearchComplaints />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Mechanic"]} />}>
          <Route path="/mechanic" element={<Mechanic />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin/users" element={<Users />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin/users/edit-form/:id" element={<UsersForm />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin/vehicles" element={<Vehicles />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin/vehicles/edit-form/:id" element={<VehiclesForm />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin/vehicles/add" element={<VehiclesForm />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["Mechanic"]} />}>
          <Route path="/mechanic" element={<Mechanic />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Mechanic"]} />}>
          <Route path="/mechanic/fixes" element={<Fixes />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Mechanic"]} />}>
          <Route path="/mechanic/fixes/edit-form/:id" element={<FixesForm />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Mechanic"]} />}>
          <Route path="/mechanic/fixes/add" element={<FixesForm />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Mechanic"]} />}>
          <Route path="/mechanic/complaints" element={<Complaints />} />
          </Route>


        </Routes>
      </Container>
    </Router>
  )
}

export default App;
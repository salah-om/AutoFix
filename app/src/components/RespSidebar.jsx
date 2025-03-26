import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaUser, FaCar, FaPlus, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import "../styles/index.css"; 

const RespSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Sidebar Header with Toggle Button */}
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </button>
        {isOpen && <span className="menu-title">Welcome, Admin</span>}
      </div>

      {/* Sidebar Menu */}
      <nav>
        <NavLink to="/admin" className="menu-item">
          <FaTachometerAlt /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/users" className="menu-item">
          <FaUser /> <span>Users</span>
        </NavLink>
        <NavLink to="/vehicles" className="menu-item">
          <FaCar /> <span>Vehicles</span>
        </NavLink>
        <NavLink to="/vehicles/add" className="menu-item">
          <FaPlus /> <span>Add Vehicle</span>
        </NavLink>
        <NavLink to="/" className="menu-item">
          <FaSignOutAlt /> <span>Sign Out</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default RespSidebar;

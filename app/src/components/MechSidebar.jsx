import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaUser, FaCar, FaPlus, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import "../styles/index.css"; 

const MechSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Sidebar Header with Toggle Button */}
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </button>
        {isOpen && <span className="menu-title">Welcome, Mechanics</span>}
      </div>

      {/* Sidebar Menu */}
      <nav>
        <NavLink to="/mechanic" className="menu-item">
          <FaTachometerAlt /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/mechanic/fixes" className="menu-item">
          <FaUser /> <span>Fixes</span>
        </NavLink>
        <NavLink to="/mechanic/complaints" className="menu-item">
          <FaCar /> <span>Complaints</span>
        </NavLink>
        <NavLink to="/mechanic/chat" className="menu-item">
          <FaPlus /> <span>Chat</span>
        </NavLink>
        <NavLink to="/" className="menu-item">
          <FaSignOutAlt /> <span>Sign Out</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default MechSidebar;

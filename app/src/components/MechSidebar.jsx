import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaAngry, FaHammer, FaSignOutAlt, FaTachometerAlt, FaHeadset } from "react-icons/fa";
import "../styles/index.css"; 

const MechSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebarM ${isOpen ? "open" : "closed"}`}>
      {/* Sidebar Header with Toggle Button */}
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </button>
        {isOpen && <span className="menu-title">Welcome, Mechanics</span>}
      </div>

      {/* Sidebar Menu */}
      <nav>
        <NavLink to="/mechanic" className="menuM-item">
          <FaTachometerAlt /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/mechanic/fixes" className="menuM-item">
          <FaHammer /> <span>Fixes</span>
        </NavLink>
        <NavLink to="/mechanic/complaints" className="menuM-item">
          <FaAngry /> <span>Complaints</span>
        </NavLink>
        <NavLink to="/mechanic/chat" className="menuM-item">
          <FaHeadset /> <span>Chat</span>
        </NavLink>
        <NavLink to="/" className="menuM-item">
          <FaSignOutAlt /> <span>Sign Out</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default MechSidebar;

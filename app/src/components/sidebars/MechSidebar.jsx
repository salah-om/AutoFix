import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaAngry, FaHammer, FaSignOutAlt, FaTachometerAlt, FaHeadset, FaPlus } from "react-icons/fa";

const MechSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebarM ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </button>
        {isOpen && <span className="menu-title">Welcome, Mechanics</span>}
      </div>

      <nav>
        <NavLink to="/mechanic" className="menuM-item">
          <FaTachometerAlt /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/mechanic/fixes" className="menuM-item">
          <FaHammer /> <span>Fixes</span>
        </NavLink>
        <NavLink to="/mechanic/fixes/add" className="menuM-item">
          <FaPlus /> <span>Add Fix</span>
        </NavLink>
        <NavLink to="/mechanic/complaints" className="menuM-item">
          <FaAngry /> <span>Complaints</span>
        </NavLink>
        <NavLink to="/mechanic" className="menuM-item">
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

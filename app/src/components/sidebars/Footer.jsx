import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-row">

          <div className="footer-column">
            <img className="footer-logo" src="/autofixlogoo.png" alt="AutoFix Logo" />
          </div>

          <div className="footer-column">
            <h4>Follow us</h4>
            <div className="footer-social-links">
              <a href="https://www.instagram.com/accounts/login/?hl=en"><i className="bx bxl-instagram-alt"></i></a>
              <a href="https://www.facebook.com/reg/"><i className="bx bxl-facebook-circle"></i></a>
              <a href="https://x.com/?lang=en"><i className="bx bxl-twitter"></i></a>
              <a href="https://www.whatsapp.com/"><i className="bx bxl-whatsapp-square"></i></a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/aboutus">About us</Link></li>
              <li><Link to="#">Our Services</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Affiliate Program</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Help</h4>
            <ul>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Customer Services</Link></li>
              <li><Link to="#">Terms & Conditions</Link></li>
              <li><Link to="#">Store Finder</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

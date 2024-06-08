import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">BFP</a>
        <ul className="navbar-menu">
            <li className="navbar-item"><Link to="/dentalhealthrecord" className="navbar-link">Dental Health Records</Link></li>
            <li className="navbar-item"><Link to="/consent" className="navbar-link">Consent Form</Link></li>
            <li className="navbar-item"><Link to="/referral" className="navbar-link">Referral Form</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the corresponding CSS file

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <nav className="navbar">
      <div className="brand-logo">
        <Link to="/">Stock Dashboard</Link>
      </div>
      <div className={`nav-links ${showNavLinks ? 'show' : ''}`}>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
      <div className="nav-toggle" onClick={toggleNavLinks}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;

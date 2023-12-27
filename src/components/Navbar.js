import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ email, onThemeToggle }) => {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    onThemeToggle(!isDarkTheme);
  };

  return (
    <nav className={`navbar ${isDarkTheme ? 'dark-theme' : ''}`}>
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
          {/* Add your other navigation links here */}
        </ul>
        {email && <p className="greeting">Hi, {email}!</p>}
      </div>
      <div className="brand-logo">
        <Link to="/">Stock Dashboard</Link>
      </div>
      <div className="nav-toggle" onClick={toggleNavLinks}>
        ☰
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </nav>
  );
};

export default Navbar;

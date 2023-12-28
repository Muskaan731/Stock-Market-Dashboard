import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ email, onThemeToggle, onCheckboxChange  }) => {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(true);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    onThemeToggle(!isDarkTheme);
  };

  const toggleEditDropdown = () => {
    setShowEditDropdown(!showEditDropdown);
  };

  const handleCheckboxChange = (feature) => {
    switch (feature) {
      case 'searchInput':
        setShowSearchInput(!showSearchInput);
        onCheckboxChange('searchInput', !showSearchInput);
        break;
      default:
        break;
    }
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
      <button className="edit-toggle" onClick={toggleEditDropdown}>
        Edit
      </button>
      {showEditDropdown && (
        <div className="edit-dropdown">
          <label>
            <input
              type="checkbox"
              checked={showSearchInput}
              onChange={() => handleCheckboxChange('searchInput')}
            />
            Search Stocks
          </label>
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;

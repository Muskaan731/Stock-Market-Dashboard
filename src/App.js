// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const handleThemeToggle = (theme) => {
    setIsDarkTheme(theme);
  };
  return (
    <Router>
      <Navbar name={name}  email={email} onThemeToggle={handleThemeToggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard isDarkTheme={isDarkTheme}/> } />
        <Route path="/login" element={<Login setEmail={setEmail}/>} />
        <Route path="/register" element={<Register setName={setName} />}/>
      </Routes>
    </Router>
  );
}

export default App;

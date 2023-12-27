// src/components/Register.js
import React, { useState } from 'react';
import './AuthForm.css'; // Import the common authentication form styles

const Register = ({ setName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password: '',
    confirmPassword: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const { name, password, confirmPassword } = formData;

    // Password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setName(name);
    setIsRegistered(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-form">
      {!isRegistered ? (
        <>
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleRegister}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            /> 

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit">Register</button>
          </form>
        </>
      ) : (
        <p>Hi, {formData.name}! You are registered.</p>
      )}
    </div>
  );
};

export default Register;

import React from 'react';
import './AuthForm.css';

const Login = ({ setEmail }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    
    const email = e.target.elements.email.value;
    setEmail(email);
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

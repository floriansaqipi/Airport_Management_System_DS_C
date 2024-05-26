import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const isEmpty = (value) => value.trim() === '';

const Login = () => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    username: true,
    password: true,
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess(''); 
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredUsernameIsValid = !isEmpty(enteredUsername);
    const enteredPasswordIsValid = !isEmpty(enteredPassword);

    setFormInputsValidity({
      username: enteredUsernameIsValid,
      password: enteredPasswordIsValid
    });

    const formIsValid =
      enteredUsernameIsValid &&
      enteredPasswordIsValid;

    if (!formIsValid) {
      return;
    }
    try {
      const response = await fetch('/api/public/auth/users/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid username or password!');
        }
        throw new Error('Login failed!');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setSuccess('Login successful! Redirecting...');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Login to Airport Management System</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-container">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} ref={usernameInputRef} />
            </div>
            {!formInputsValidity.username && <p style={{ color: 'red' }}>Username field is empty!</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordInputRef}/>
            </div>
            {!formInputsValidity.password && <p style={{ color: 'red' }}>Password field is empty!</p>}
          </div>
          <button type="submit" className="login-button">Login</button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

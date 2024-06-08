import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault(); 
    try {
        const url = new URL('http://localhost:8080/login');
        url.searchParams.append('identifier', identifier);
        url.searchParams.append('password', password);

        const response = await fetch(url, {
            method: 'POST',
        });

        if (response.ok) {
            // Login successful
            const responseData = await response.text(); // Get response as text
            const [userType, userId] = responseData.split(',');
            console.log('Login successful');
            navigate(`/profile/${userType}/${userId}`);            
        } else {
            // Login failed
            const errorMessage = await response.text();
            setError(errorMessage);
            console.log('Login failed:', errorMessage);
        }
    } catch (error) {
        console.error('Error during login:', error);
        setError('An error occurred during login');
    }
};

  return (
    <div className="container">
      <div className="image-container"></div>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="login" onSubmit={handleLogin}>
            <h1 className="title">Sign in</h1>
            <div className="input-field">
              <label htmlFor="email-address">Email Address</label>
              <input
                // type="email"
                name="email-address"
                id="email-address"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

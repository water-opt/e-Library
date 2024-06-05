import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/userManageStyles.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const role = 'user';
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !address) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          address,
          role, 
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      } else {
        const data = await response.json();
        console.log('Registration successful:', data);
        navigate('/user/login'); 
      }
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="login-form">
      <p1>Sign up</p1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="name">Name:</label> */}
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        {/* <label htmlFor="email">Email:</label> */}
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        {/* <label htmlFor="password">Password:</label> */}
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        {/* <label htmlFor="address">Address:</label> */}
        <input
          type="text"
          id="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="login-input"
        />
        <p>*fill all the required fields.</p>
     
        <input
          type="hidden"
          id="role"
          value={role}
          readOnly 
        />
        <button type="submit" className="login-button">
          Register
        </button>
        <div>
            <p2>already have an account?</p2>
            <Link to="/user/login"><p3>login</p3></Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/userManageStyles.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('/api/user/recovery', { email });

      if (response.status === 404) {
        setError('User not found ..'); 
      } else if (response.status === 500) {
        setError('Internal server error ..');
      } else {
        alert('Email Sent. Please check the Email.')
        navigate('/user/login')
      }

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-form">
      <p1>Account Recovery</p1>
      {error && <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px', width: '465px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <p>*fill all the required fields.</p>
        <button type='submit' className="login-button">Next</button>
      </form>
 
    </div>
  );
};

export default LoginPage;


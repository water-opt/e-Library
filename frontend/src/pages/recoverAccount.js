import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles/userManageStyles.css';
import RoleContext from '../components/RoleContext';
import IsLoginCotext from '../components/IsLoginContext'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setRole } = useContext(RoleContext);
  const { setLogin } = useContext(IsLoginCotext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('/api/user/recovery', { email });

      if (response.status === 404) {
        throw new Error('User not found ..'); 
      } else if (response.status == 500) {
        throw new Error('Internal server error ..');
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


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/userManageStyles.css'; 

const LoginPage = () => {
  const { userid } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('/api/user/password-reset', { password, userid });

      if (response.status === 200) {
        alert('Password Successfully Recovered')
        navigate('/user/login');
      } else if (response.status === 500) {
        throw new Error('Internal server error ..');
      } else if (response.status === 404) {
        setError('email not found')
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
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <p>*fill all the required fields.</p>
        <button type="submit" className="login-button">Submit</button>
      </form>
 
    </div>
  );
};

export default LoginPage;


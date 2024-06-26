import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/userManageStyles.css';
import { login } from '../services/auth';
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
      await login( navigate, setLogin, setRole, { email, password } );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-form">
      <p1>Login</p1>
      {error && <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px', width: '410px' }}>{error}</p>}
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
        
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <p>forgot password? <Link to="/user/recover">recover</Link></p>
        <button type="submit" className="login-button">Login</button>
        <div>
            <p2>Don't have an account?</p2>
            <Link to="/user/register"><p3>Register</p3></Link>
        </div>
      </form>
 
    </div>
  );
};

export default LoginPage;


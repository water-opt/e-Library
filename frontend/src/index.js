import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RoleProvider } from './components/RoleContext';
import { IsLoginProvider } from './components/IsLoginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoleProvider>
      <IsLoginProvider>
        <App />
      </IsLoginProvider>
    </RoleProvider>
  </React.StrictMode>
);

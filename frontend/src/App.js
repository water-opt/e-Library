import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/homePage'
import Store from './pages/storePage'
import LoginU from './pages/loginPage'
import RegisterU from './pages/registerPage'
import BookView from './pages/productViewPage'
import RecoverAccount from './pages/recoverAccount'
import RecoverAccountPassword from './pages/recoverAccountPassword'


function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>

          {/* user homepage */}
          <Route path="/user/home" element={<Home/>}/>
          <Route path="/user/bookstore" element={<BookView/>}/>

          {/* user store */}
          <Route path="/user/store" element={<Store/>}/>

          {/* user login and registration */}
          <Route path="/user/login" element={<LoginU/>}/>
          <Route path="/user/register" element={<RegisterU/>}/>
          <Route path="/user/recover" element={<RecoverAccount/>}/>
          <Route path="/user/recover/:userid" element={<RecoverAccountPassword/>}/>

        </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLogin } from './IsLoginContext';
import '../pages/styles/header.css';
import useLogout from './useLogout';

const Header = () => {
  const logout = useLogout();
  const { isLogin } = useLogin();

  return (
    <header className="header bg-white text-dark p-3 shadow">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/user/home">
            Library
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/user/bookstore">
                  Books
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav" id="right-top">
              {isLogin === false && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/register">
                      Signup
                    </Link>
                  </li>
                </>
              )}
              {isLogin === true && (
                <li className="nav-item">
                  <Link className="nav-link" onClick={logout}>
                    Log out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

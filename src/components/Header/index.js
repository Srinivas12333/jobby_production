import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { MdHome, MdWork } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

import './index.css';

const Header = () => {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <nav className="main-header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
      <div className="lg-container">
        <ul className="lg-list">
          <li className="header-item">
            <Link to="/" className="link">
              Home
            </Link>
          </li>

          <li className="header-item">
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="header-logout-button"
          onClick={onClickLogOut}
        >
          Logout
        </button>
      </div>
      <ul className="sm-container">
        <li className="sm-list-item">
          <Link to="/" className="sm-link">
            <MdHome className="icons" />
          </Link>
        </li>
        <li className="sm-list-item">
          <Link to="/jobs" className="sm-link">
            <MdWork className="icons" />
          </Link>
        </li>
        <li className="sm-list-item">
          <button
            type="button"
            className="button-icon"
            onClick={onClickLogOut}
          >
            <FiLogOut className="icons" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

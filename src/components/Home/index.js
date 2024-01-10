import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';

import './index.css';

const Home = () => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get('jwt_token');

  useEffect(() => {
    if (!jwtToken) {
      // If there's no token, navigate to the login page
      navigate('/login');
    }
  }, [jwtToken, navigate]);

  if (!jwtToken) {
    // If there's no token, return null to avoid rendering anything in this case
    return null;
  }

  return (
    <div className="main-home-container">
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <button type="button" className="home-button">
            <Link to="/jobs" className="job-link">
              Find Jobs
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

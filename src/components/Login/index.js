import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const jwtToken = Cookies.get('jwt_token');
    console.log(jwtToken)
    if (jwtToken) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const userDetails = { username, password };
    const url = 'https://apis.ccbp.in/login';

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      const jwtToken = data.jwt_token;
      Cookies.set('jwt_token', jwtToken, { expires: 30 });
      navigate('/', { replace: true });
    } else {
      const message = data.error_msg;
      setShowErrorMessage(true);
      setErrorMsg(message);
    }
  };

  return (
    <div className='main-login-container'>
      <div className='login-container'>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className='websitelogo'
        />

        <form className='login-form' onSubmit={onFormSubmit}>
          <label className='label' htmlFor='username'>
            USERNAME
          </label>
          <input
            className='input-element'
            type='text'
            id='username'
            placeholder='Username'
            value={username}
            onChange={onChangeUsername}
          />
          <label className='label' htmlFor='password'>
            PASSWORD
          </label>
          <input
            className='input-element'
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={onChangePassword}
          />
          <button type='submit' className='login-button'>
            Login
          </button>
          {showErrorMessage && <p className='error-display'>{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

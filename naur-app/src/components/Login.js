/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import React, { useState, useRef } from 'react';

import { postLogin } from '../modules/loginApi';
import RegLock from './regLock';
import '../assets/Login.css';

// Returns error if the given string is not a valid username
function usernameError(str) {
  if (!str.match(/^[A-Za-z0-9_]*$/)) {
    return 'Username must be made up of letters, numbers, or underscores';
  }
  if (!str.match(/^[A-Za-z_][A-Za-z0-9_]*$/)) {
    return 'Username must start with a letter or underscore';
  }
  if (!str.match(/[A-Za-z0-9]/)) {
    return 'Username must contain contain at least one letter or number';
  }
  if (!(str.length >= 3)) {
    return 'Username must be at least 3 characters long';
  }
  return '';
}

// Returns error if the given string is not a valid password
function passwordError(str) {
  if (!str.match(/^[A-Za-z0-9\\!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+$/)) {
    return 'Password contains illegal character';
  }
  if (!(str.length >= 6)) {
    return 'Password must be at least 6 characters long';
  }
  return '';
}

// Input: a state setter used to set the username of the current user and reload
function Login({ setUsername, setNewUserState }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [lockout, setLockout] = useState(false);
  const lockoutname = useRef('');

  function handleUsernameInput(e) {
    const name = e.target.value;
    if (name === '') {
      setErrorMessage('');
    } else {
      setErrorMessage(usernameError(name));
    }
  }

  function handlePasswordInput(e) {
    const pword = e.target.value;
    if (pword === '') {
      setErrorMessage('');
    } else {
      setErrorMessage(passwordError(pword));
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const pword = document.getElementById('password').value;
    const nameErr = usernameError(name);
    const pwordErr = passwordError(pword);
    if (nameErr) {
      setErrorMessage(nameErr);
      return;
    }
    if (pwordErr) {
      setErrorMessage(pwordErr);
      return;
    }

    (async function handleLoginAsync() {
      const status = await postLogin(name, pword);
      lockoutname.current = name;
      if (status === 401) {
        setErrorMessage('Password is incorrect');
        return;
      }
      if (status === 403) {
        setErrorMessage('');
        setLockout(true);
        return;
      }
      if (status === 404) {
        setErrorMessage('User does not exist');
        return;
      }
      if ((status < 200) || (status >= 300)) {
        setErrorMessage('An unknown error occured');
        return;
      }
      // eslint-disable-next-line no-param-reassign
      setNewUserState(false);
      setUsername(name);
    }());
    // after successful login, reset error count to zero
    // errCount.current = 0;
  }

  function handleRegister() {
    setNewUserState(true);
  }

  return (
    <div className="regLoginWrapper">
      {lockout && (
        <div className="regLock">
          <RegLock setLockout={setLockout} username={lockoutname.current} />
        </div>
      )}
      {!lockout && (
        <div className="loginWrapper">
          <div className="loginWelcome">
            <h1>
              Breathe,
            </h1>
            <h1>
              work,
            </h1>
            <h1>
              play,
            </h1>
            <h1>
              sleep,
            </h1>
            <h1>
              repeat.
            </h1>
          </div>
          <div className="loginInputs">
            <div className="lMessage">
              <p>
                stay well & get productive, all in one place
              </p>
            </div>
            <div className="error">
          &nbsp;
              {errorMessage}
            </div>
            <form onSubmit={handleLogin}>
              <input className="lInputs" type="text" id="username" placeholder="username" onChange={handleUsernameInput} />
              <br />
              <input className="lInputs" type="password" id="password" placeholder="password" onChange={handlePasswordInput} />
            </form>
            <button className="lButtons" type="submit" onClick={handleLogin}>Login</button>
            <button className="lButtons" type="submit" onClick={handleRegister}>Create Account</button>
          </div>
        </div>
      )}

    </div>

  );
}

export default Login;

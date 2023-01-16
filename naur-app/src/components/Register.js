import { React, useState } from 'react';
import '../assets/Register.css';
// import { postMessagingUser } from '../modules/messageApi';
import { postRegister } from '../modules/loginApi';

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

function Register({ setUsername, setNewUserState }) {
  const [errorMessage, setErrorMessage] = useState('');

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

  function handleRegister(e) {
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

    (async function handleRegisterAsync() {
      const status = await postRegister(name, pword);
      if (status === 403) {
        setErrorMessage('User already exists');
        return;
      }
      if ((status < 200) || (status >= 300)) {
        setErrorMessage('An unknown error occured');
        return;
      }
      // eslint-disable-next-line no-param-reassign
      setUsername(name);
    }());
  }

  function handleBack() {
    setNewUserState(false);
  }

  return (
    <div className="registrationWrapper">
      <div>
        <h1>Welcome!</h1>
      </div>
      <div id="sec1">
        tell us a little about yourself
      </div>
      <div>
        <div className="error">
          &nbsp;
          {errorMessage}
        </div>
        <form onSubmit={handleRegister}>
          <text>CONFIRM USERNAME*</text>
          <input className="lInputs" type="text" id="username" placeholder="Johndoe" onChange={handleUsernameInput} />
          <br />
          <text>CONFIRM PASSWORD*</text>
          <input className="lInputs" type="password" id="password" placeholder="password123" onChange={handlePasswordInput} />
        </form>
        <button className="lButtons" type="submit" onClick={handleRegister}>Register</button>
        <button className="lButtons" type="submit" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default Register;

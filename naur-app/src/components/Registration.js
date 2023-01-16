import { React, useState } from 'react';
// import '../assets/Registration.css';
import Register from './Register';
import SecurityQuestions from './securityQuestions';

function Registration({ setNewUserState }) {
  const [username, setUsername] = useState(null);

  return (
    <div className="registrationWrapper">
      {!username && (
        <Register setUsername={setUsername} setNewUserState={setNewUserState} />
      )}
      {username && (
        <SecurityQuestions username={username} setNewUserState={setNewUserState} />
      )}
    </div>
  );
}

export default Registration;

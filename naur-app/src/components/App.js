/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import {
  React, useState, useEffect,
} from 'react';
import Homepage from './Homepage';
import Login from './Login';
import Registration from './Registration';
import '../assets/App.css';

function App() {
  const [username, setUsername] = useState('');
  const [time, setTime] = useState(Date.now());
  const [isNewUser, setNewUserState] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      {!username && !isNewUser && (
        <header className="App-header">
          <Login setUsername={setUsername} setNewUserState={setNewUserState} />
        </header>
      )}
      {!username && isNewUser && (
        <header className="App-header">
          <Registration setNewUserState={setNewUserState} />
        </header>
      )}
      {username && (
        <div id="HomepageBox">
          <Homepage namestring={username} time={time} />
        </div>
      )}
    </div>
  );
}

export default App;

import { React, useState } from 'react';
import '../assets/Register.css';
import { postSecurityQuestions } from '../modules/loginApi';

function SecurityQuestions({ username, setNewUserState }) {
  const [errorMessage, setErrorMessage] = useState('');

  function handleSetSQ(e) {
    e.preventDefault();
    const sq1 = document.getElementById('sq1')?.value;
    const sqList1 = document.getElementById('sqList1')?.value;
    if (!sq1 || !sqList1) {
      setErrorMessage('You must include at least 1 security question.');
      return;
    }
    const sq2 = document.getElementById('sq2')?.value;
    const sqList2 = document.getElementById('sqList2')?.value;
    const sq3 = document.getElementById('sq3')?.value;
    const sqList3 = document.getElementById('sqList3')?.value;

    const securityQuestions = [];

    if (sq1 && sqList1) {
      securityQuestions.push({ question: sqList1, answer: sq1 });
    }
    if (sq2 && sqList2) {
      securityQuestions.push({ question: sqList2, answer: sq2 });
    }
    if (sq3 && sqList3) {
      securityQuestions.push({ question: sqList3, answer: sq3 });
    }
    postSecurityQuestions(username, securityQuestions);
    setNewUserState(false);
  }

  return (
    <div className="registrationWrapper">
      <div>
        <h1>Welcome!</h1>
      </div>
      <div id="sec1">
        Security questions will be used for validation, should you need to reset your password.
      </div>
      <div className="error">
        &nbsp;
        {errorMessage}
      </div>
      <div>
        <select className="dropdown" name="sqList" id="sqList1" required>
          <option value="What is your mother's maiden name?">What is your mother&apos;s maiden name?</option>
          <option value="What was the name of your first pet?">What was the name of your first pet?</option>
          <option value="What city were you born in">What city were you born in?</option>
          <option value="What is your oldest cousin's first name?">What is your oldest cousin&apos;s first name?</option>
          <option value="What is your the middle name of your oldest child?">What is your the middle name of your oldest child?</option>
        </select>
        <input className="Inputs" type="sq1" id="sq1" placeholder="Security Question 1" />
      </div>
      <div>
        <select className="dropdown" name="sqList" id="sqList2">
          <option value="None">None</option>
          <option value="What is your mother's maiden name?">What is your mother&apos;s maiden name?</option>
          <option value="What was the name of your first pet?">What was the name of your first pet?</option>
          <option value="What city were you born in">What city were you born in?</option>
          <option value="What is your oldest cousin's first name?">What is your oldest cousin&apos;s first name?</option>
          <option value="What is your the middle name of your oldest child?">What is your the middle name of your oldest child?</option>
        </select>
        <input className="Inputs" type="sq2" id="sq2" placeholder="Security Question 2" />
      </div>
      <div>
        <select className="dropdown" name="sqList" id="sqList3">
          <option value="None">None</option>
          <option value="What is your mother's maiden name?">What is your mother&apos;s maiden name?</option>
          <option value="What was the name of your first pet?">What was the name of your first pet?</option>
          <option value="What city were you born in">What city were you born in?</option>
          <option value="What is your oldest cousin's first name?">What is your oldest cousin&apos;s first name?</option>
          <option value="What is your the middle name of your oldest child?">What is your the middle name of your oldest child?</option>
        </select>
        <input className="Inputs" type="sq1" id="sq3" placeholder="Security Question 3" />
      </div>
      <div>
        <button className="lButtons" type="submit" onClick={handleSetSQ}>Set</button>
      </div>
    </div>
  );
}

export default SecurityQuestions;

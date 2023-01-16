import { React, useState, useRef } from 'react';
import { getSecurityQuestions, postResetPassword } from '../modules/loginApi';

function RegLock({ setLockout, username }) {
  const [questions, setQuestions] = useState([]);
  const gotQuestions = useRef(false);

  if (!gotQuestions.current) {
    gotQuestions.current = true;
    (async () => {
      setQuestions(await getSecurityQuestions(username));
    })();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const questionsAndAnswers = questions.map((q, i) => (
      {
        question: q,
        answer: document.getElementById(`answer${i}`)?.value,
      }
    ));
    const newpass = document.getElementById('newpass')?.value;

    (async () => {
      try {
        const status = await postResetPassword(username, newpass, questionsAndAnswers);
        if (status === 200) {
          setLockout(false);
        }
      } catch (err) {
        //
      }
    })();
  }

  return (
    <div>
      <p>Too many password attempts! Choose a new password</p>
      <div className="newPasswordWrapper">
        <input id="newpass" className="newpass" type="text" placeholder="New Password" />
      </div>
      <div className="securityQs">
        {/* <p>
          $
          {userObj.securityQuestions.first}
        </p> */}
        {questions.map((question, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${i}: ${question}`} id={`questionholder${i}`}>
            <p id={`question${i}`}>
              {question}
            </p>
            <input id={`answer${i}`} type="text" placeholder={`Question ${i + 1}`} />
          </div>
        ))}
        <button type="submit" onClick={handleSubmit}>OK</button>
      </div>
    </div>
  );
}

export default RegLock;

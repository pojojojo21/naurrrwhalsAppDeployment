/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import Priority from './Priority';
import {
  PUT_sleepSat, PUT_workSat, PUT_relaxSat,
  PUT_mood, PUT_priority,
} from '../modules/wellnessApi';
import '../assets/Survey.css';

function Survey({ username }) {
  const [selected, setSelect] = useState('');
  const [sleepSat, setSleepSat] = useState(5);
  const [workSat, setWorkSat] = useState(5);
  const [relaxSat, setRelaxSat] = useState(5);
  const [mood, setMood] = useState(5);
  const [isSubmit, setIsSubmit] = useState(false);
  const [priority, setPriority] = useState('Relaxation');

  // defaults in case user doesn't change the survey answers
  PUT_sleepSat(username, sleepSat);
  PUT_workSat(username, workSat);
  PUT_relaxSat(username, relaxSat);
  PUT_mood(username, mood);
  PUT_priority(username, priority);

  function handleSubmit() {
    if (selected !== '') {
      setPriority(selected);
      PUT_priority(username, priority);
      setIsSubmit(true);
    } else {
      // eslint-disable-next-line no-alert
      alert('Must choose a priority for today');
    }
  }

  function handleSleepSat(e) {
    setSleepSat(e.target.value);
    PUT_sleepSat(username, sleepSat);
  }

  function handleWorkSat(e) {
    setWorkSat(e.target.value);
    PUT_workSat(username, workSat);
  }

  function handleRelaxSat(e) {
    setRelaxSat(e.target.value);
    PUT_relaxSat(username, relaxSat);
  }

  function handleMood(e) {
    setMood(e.target.value);
    PUT_mood(username, mood);
  }

  if (isSubmit) {
    return (
      <div>
        <Priority data={[priority]} username={username} />
      </div>
    );
  }

  return (
    <div className="survey">
      <h2> Rate your day yesterday </h2>
      <h4> How was your sleep? </h4>
      <select className="dropdown" name="sleepList" id="sleepList" onClick={handleSleepSat} required>
        <option value="5">Very Satisfied</option>
        <option value="4">Satisfied</option>
        <option value="3">Neutral</option>
        <option value="2">Not Satisfied</option>
        <option value="1">Extremely Not Satisfied</option>
      </select>
      <h4> How was your work? </h4>
      <select className="dropdown" name="workList" id="workList" onClick={handleWorkSat} required>
        <option value="5">Very Satisfied</option>
        <option value="4">Satisfied</option>
        <option value="3">Neutral</option>
        <option value="2">Not Satisfied</option>
        <option value="1">Extremely Not Satisfied</option>
      </select>
      <h4> How was your relaxation? </h4>
      <select className="dropdown" name="relaxList" id="relaxList" onClick={handleRelaxSat} required>
        <option value="5">Very Satisfied</option>
        <option value="4">Satisfied</option>
        <option value="3">Neutral</option>
        <option value="2">Not Satisfied</option>
        <option value="1">Extremely Not Satisfied</option>
      </select>
      <h2> Start your day today </h2>
      <h4> How do you feel today? </h4>
      <select className="dropdown" name="moodList" id="moodList" onClick={handleMood} required>
        <option value="5">Amazing</option>
        <option value="4">Great</option>
        <option value="3">Good</option>
        <option value="2">Okay</option>
        <option value="1">Not Good</option>
        <option value="0">Terrible</option>
      </select>
      <h1> What is most important to you today </h1>
      <form onSubmit={handleSubmit}>
        <label className="goals">
          <input
            type="radio"
            id="sleep"
            name="sleep"
            value="Sleep"
            checked={selected === 'Sleep'}
            onChange={(e) => setSelect(e.currentTarget.value)}
          />
          {' '}
          Sleep
        </label>
        <label className="goals">
          <input
            type="radio"
            id="work"
            name="work"
            value="Work"
            checked={selected === 'Work'}
            onChange={(e) => setSelect(e.currentTarget.value)}
          />
          {' '}
          Work
        </label>
        <label className="goals">
          <input
            type="radio"
            id="relax"
            name="relax"
            value="Relaxation"
            checked={selected === 'Relaxation'}
            onChange={(e) => setSelect(e.currentTarget.value)}
          />
          {' '}
          Relaxation
        </label>
        <button className="goalButton" type="submit" onClick={handleSubmit}>
          Set Specific Goal
        </button>
      </form>
    </div>
  );
}

export default Survey;

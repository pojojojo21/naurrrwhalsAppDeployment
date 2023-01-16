/* eslint-disable camelcase */

import React, { useState } from 'react';
import {
  PUT_desiredHoursRelax, PUT_desiredHoursSleep, PUT_desiredHoursWork,
  PUT_desiredRelaxActivity, PUT_desiredWorkBlock, PUT_desiredWorkEndTime,
  PUT_desiredTimeSleep,
} from '../modules/wellnessApi';

function Priority({ data, username }) {
  const [sleepGoalHr, setSleepGoalHr] = useState(8);
  const [sleepGoalTime, setSleepGoalTime] = useState(2200);
  const [workGoalHr, setWorkGoalHr] = useState(8);
  const [workBlock, setWorkBlock] = useState(45);
  const [workEndTime, setWorkEndTime] = useState(2200);
  const [relaxGoalHr, setRelaxGoalHr] = useState(8);
  const [relaxActivity, setRelaxActivity] = useState('Ride a bike');
  const [isSub, setIsSub] = useState(0);

  // defaults in case user doesn't change selections
  PUT_desiredTimeSleep(username, sleepGoalTime);
  PUT_desiredHoursSleep(username, sleepGoalHr);
  PUT_desiredHoursWork(username, workGoalHr);
  PUT_desiredWorkBlock(username, workBlock);
  PUT_desiredWorkEndTime(username, workEndTime);
  PUT_desiredHoursRelax(username, relaxGoalHr);
  PUT_desiredRelaxActivity(username, relaxActivity);

  function handleSleepHours(e) {
    setSleepGoalHr(e.target.value);
    PUT_desiredHoursSleep(username, sleepGoalHr);
  }

  function handleSleepTimeHr(e) {
    setSleepGoalTime(e.target.value * 100);
    PUT_desiredTimeSleep(username, sleepGoalTime);
  }

  function handleSleepTimeMin(e) {
    setSleepGoalTime(sleepGoalTime + e.target.value);
    PUT_desiredTimeSleep(username, sleepGoalTime);
  }

  function handleSleepTimeM(e) {
    if (e.target.value === 'PM') {
      setSleepGoalTime(sleepGoalTime + 1200);
      PUT_desiredTimeSleep(username, sleepGoalTime);
    }
  }

  function handleWorkHours(e) {
    setWorkGoalHr(e.target.value);
    PUT_desiredHoursWork(username, workGoalHr);
  }

  function handleWorkBlock(e) {
    setWorkBlock(e.target.value);
    PUT_desiredWorkBlock(username, workBlock);
  }

  function handleWorkTimeHr(e) {
    setWorkEndTime(e.target.value * 100);
    PUT_desiredWorkEndTime(username, workEndTime);
  }

  function handleWorkTimeMin(e) {
    setWorkEndTime(workEndTime + e.target.value);
    PUT_desiredWorkEndTime(username, workEndTime);
  }

  function handleWorkTimeM(e) {
    if (e.target.value === 'PM') {
      setWorkEndTime(workEndTime + 1200);
      PUT_desiredWorkEndTime(username, workEndTime);
    }
  }

  function handleRelaxHours(e) {
    setRelaxGoalHr(e.target.value);
    PUT_desiredHoursRelax(username, relaxGoalHr);
  }

  function handleRelaxActivity(e) {
    setRelaxActivity(e.target.value);
    PUT_desiredRelaxActivity(username, relaxActivity);
  }

  if (isSub === 1) {
    return (
      <div>
        <h1>
          {' '}
          Welcome back,
          {' '}
          {username}
        </h1>
        <h2> Curating an amazing day for you </h2>
      </div>
    );
  }

  if (data[0] === 'Sleep') {
    return (
      <div>
        <h2>Let&apos;s optimize sleep for today</h2>
        <form>
          <h4>Desired Sleep (Hours)</h4>
          <input type="number" id="desiredHoursSleep" placeholder="8" min="0" max="24" step="1" onChange={handleSleepHours} />
          <h4>Desired Bedtime</h4>
          <input type="number" id="desiredTimeSleepHr" placeholder="10" min="1" max="12" step="1" onChange={handleSleepTimeHr} />
          <input type="number" id="desiredTimeSleepMin" placeholder="00" min="00" max="59" step="1" onChange={handleSleepTimeMin} />
          <select onClick={handleSleepTimeM}>
            <option value="PM">PM</option>
            <option value="AM">AM</option>
          </select>
        </form>
        <button type="submit" onClick={() => setIsSub(1)}>Start your day</button>
      </div>
    );
  }

  if (data[0] === 'Work') {
    return (
      <div>
        <h2>Let&apos;s optimize work for today</h2>
        <form>
          <h4>Desired Work (Hours)</h4>
          <input type="number" id="desiredHoursWork" placeholder="8" min="0" max="24" step="1" onChange={handleWorkHours} />
          <h4>Desired Work Block (Minutes)</h4>
          <input type="number" id="desiredWorkBlock" placeholder="45" min="0" step="1" onChange={handleWorkBlock} />
          <h4>Desired Endtime</h4>
          <input type="number" id="desiredTimeWorkHr" placeholder="10" min="1" max="12" step="1" onChange={handleWorkTimeHr} />
          <input type="number" id="desiredTimeWorkMin" placeholder="00" min="00" max="59" step="1" onChange={handleWorkTimeMin} />
          <select onClick={handleWorkTimeM}>
            <option value="PM">PM</option>
            <option value="AM">AM</option>
          </select>
        </form>
        <button type="submit" onClick={() => setIsSub(1)}>Start your day</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Let&apos;s optimize relaxation for today</h2>
      <form>
        <h4>Desired Relaxation (Hours)</h4>
        <input type="number" id="desiredHoursRelax" placeholder="8" min="0" max="24" step="1" onChange={handleRelaxHours} />
        <h4>Desired Activity for Today</h4>
        <input type="text" id="desiredRelaxActivity" placeholder="Ride a bike" onChange={handleRelaxActivity} />
      </form>
      <button type="submit" onClick={() => setIsSub(1)}>Start your day</button>
    </div>
  );
}

export default Priority;

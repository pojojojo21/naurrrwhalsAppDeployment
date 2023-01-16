/* eslint-disable camelcase */

import React, { useState } from 'react';
import {
  GET_desiredHoursSleep, GET_desiredTimeSleep,
  GET_desiredHoursWork, GET_desiredWorkBlock,
  GET_desiredWorkEndTime, GET_desiredHoursRelax,
  GET_desiredRelaxActivity,
} from '../modules/wellnessApi';

function Recommendations({ username }) {
  // allow form inputs
  const [currHrSleep, setCurrHoursSleep] = useState(8);
  const [currTSleep, setCurrTimeSleep] = useState(2200);
  const [currHrWork, setCurrHoursWork] = useState(8);
  const [currWkBlock, setCurrWorkBlock] = useState(45);
  const [currWkEndTime, setCurrWorkEndTime] = useState(2200);
  const [currHrRelax, setCurrHourRelax] = useState(8);

  // allow rec outputs
  const [sleepSugg, setSleepSugg] = useState([]);
  const [workSugg, setWorkSugg] = useState([]);
  const [relaxSugg, setRelaxSugg] = useState('');

  // recommendation functions - computes & interprets
  async function computeSleepSuggestions(currHoursSleep, currTimeSleep) {
    const desiredHoursSleep = (await GET_desiredHoursSleep(username)) || 0;
    const desiredTimeSleep = (await GET_desiredTimeSleep(username)) || Infinity;

    const hoursRec = Math.max(desiredHoursSleep, 6) - currHoursSleep;
    const timeRec = desiredTimeSleep - currTimeSleep;

    return [hoursRec, timeRec];
  }

  function interpretSleepSuggestions([hoursRec, timeRec]) {
    let sleepHr = '';
    let sleepTime = '';
    if (hoursRec > 0) {
      sleepHr = 'Need to sleep more hours';
    } else {
      sleepHr = 'Good job! You are sleeping enough hours';
    }

    if (timeRec < 0) {
      sleepTime = 'Need to sleep earlier';
    } else {
      sleepTime = 'Good job! You are sleeping on time';
    }

    return [sleepHr, sleepTime];
  }

  async function computeWorkSuggestions(currHoursWork, currWorkBlock, currWorkEndTime) {
    const desiredHoursWork = (await GET_desiredHoursWork(username)) || Infinity;
    const desiredWorkBlock = (await GET_desiredWorkBlock(username)) || Infinity;
    const desiredWorkEndTime = (await GET_desiredWorkEndTime(username)) || Infinity;

    const hoursRec = desiredHoursWork - currHoursWork;
    const blockRec = desiredWorkBlock - currWorkBlock;
    const timeRec = desiredWorkEndTime - currWorkEndTime;

    return [hoursRec, blockRec, timeRec];
  }

  function interpretWorkSuggestions([hoursRec, blockRec, timeRec]) {
    let workHr = '';
    let workBlock = '';
    let workTime = '';
    if (hoursRec < 0) {
      workHr = 'Need to work fewer hours';
    } else {
      workHr = 'Good job! You are working enough hours';
    }

    if (blockRec < 0) {
      workBlock = 'Need to work for less time at a stretch';
    } else {
      workBlock = 'Good job! You are working for a healthy amount of time at a stretch';
    }

    if (timeRec < 0) {
      workTime = 'Need to end work earlier';
    } else {
      workTime = 'Good job! You are ending work at a good time';
    }

    return [workHr, workBlock, workTime];
  }

  async function computeRelaxSuggestions(currHoursRelax) {
    const desiredHoursRelax = (await GET_desiredHoursRelax(username)) || 0;
    const desiredRelaxActivity = await GET_desiredRelaxActivity(username) || 'Riding a bike';

    const hoursRec = desiredHoursRelax - currHoursRelax;

    return [hoursRec, desiredRelaxActivity];
  }

  function interpretRelaxSuggestions([hoursRec, desiredRelaxActivity]) {
    let relaxHr = '';
    if (hoursRec > 0) {
      relaxHr = 'Need to relax more hours. Try: ';
      relaxHr += desiredRelaxActivity;
    } else {
      relaxHr = 'Good job! You are relaxing enough hours';
    }

    return relaxHr;
  }

  // trigger computations
  function handleRec(e) {
    e.preventDefault();
    (async () => {
      setSleepSugg(interpretSleepSuggestions(
        await computeSleepSuggestions(currHrSleep, currTSleep),
      ));

      setWorkSugg(interpretWorkSuggestions(
        await computeWorkSuggestions(currHrWork, currWkBlock, currWkEndTime),
      ));

      setRelaxSugg(interpretRelaxSuggestions(
        await computeRelaxSuggestions(currHrRelax),
      ));
    })();
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <form>
        <h4>Actual Sleep (Hours)</h4>
        <input type="number" id="hoursSleep" placeholder="8" min="0" max="24" step="1" onChange={(e) => setCurrHoursSleep(e.target.value)} />
        <h4>Actual Bedtime [24h format]</h4>
        <input type="number" id="sleepBedtime" placeholder="2200" min="0000" max="2359" step="1" onChange={(e) => setCurrTimeSleep(e.target.value)} />
        <h4>Actual Work (Hours)</h4>
        <input type="number" id="hoursWork" placeholder="8" min="0" max="24" step="1" onChange={(e) => setCurrHoursWork(e.target.value)} />
        <h4>Actual Work Block (Minutes)</h4>
        <input type="number" id="workBlock" placeholder="45" min="0" step="1" onChange={(e) => setCurrWorkBlock(e.target.value)} />
        <h4>Actual Endtime [24h format]</h4>
        <input type="number" id="workEndtime" placeholder="2200" min="0000" max="2359" step="1" onChange={(e) => setCurrWorkEndTime(e.target.value)} />
        <h4>Actual Relaxation (Hours)</h4>
        <input type="number" id="hoursRelax" placeholder="8" min="0" max="24" step="1" onChange={(e) => setCurrHourRelax(e.target.value)} />
        <button type="submit" onClick={handleRec}>Compute Recommendations</button>
      </form>
      <h4>
        {sleepSugg[0]}
      </h4>
      <h4>
        {sleepSugg[1]}
      </h4>
      <h4>
        {workSugg[0]}
      </h4>
      <h4>
        {workSugg[1]}
      </h4>
      <h4>
        {workSugg[2]}
      </h4>
      <h4>
        {relaxSugg}
      </h4>
    </div>
  );
}

export default Recommendations;

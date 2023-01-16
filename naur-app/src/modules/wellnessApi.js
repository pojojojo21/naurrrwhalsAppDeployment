/* eslint-disable object-property-newline */
/* eslint-disable camelcase */
import axios from 'axios';

import rootURL from './url';

// =====================================================
// === The functions corresponding to the actual API ===
// =====================================================

// GET /wellness/survey/user
async function getWellnessSurvey(user) {
  const url = `${rootURL}/wellness/survey/${user}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// PUT /wellness/survey/user
async function putWellnessSurvey(user, survey) {
  const url = `${rootURL}/wellness/survey/${user}`;
  try {
    const response = await axios.put(url, survey);
    return response.data;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// POST /wellness/survey/user
async function postWellnessSurvey(user, survey) {
  const url = `${rootURL}/wellness/survey/${user}`;
  try {
    const response = await axios.post(url, survey);
    return response.data;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}
// Exactly the same as PUT, added for compatibility

// =========================================
// === Functions added for compatability ===
// =========================================

function propertyGetter(property) {
  return async (username) => {
    try {
      return (await getWellnessSurvey(username))[property];
    } catch (err) {
      return null;
    }
  };
}

function propertyPutter(property) {
  return async (username, v) => {
    try {
      return (await putWellnessSurvey(username, { [property]: v }))[property];
    } catch (err) {
      return null;
    }
  };
}

// SURVEY.js API - update respective inputs as user fills out the survey

const PUT_sleepSat = propertyPutter('sleepSat');
const PUT_workSat = propertyPutter('workSat');
const PUT_relaxSat = propertyPutter('relaxSat');
const PUT_mood = propertyPutter('mood');
const PUT_priority = propertyPutter('priority');

// PRIORITY.js API - update respective inputs as user fills out their priority

const PUT_desiredHoursSleep = propertyPutter('desired_hours_sleep');
const PUT_desiredTimeSleep = propertyPutter('desired_time_sleep');
const PUT_desiredHoursWork = propertyPutter('desired_hours_work');
const PUT_desiredWorkBlock = propertyPutter('desired_block_work');
const PUT_desiredWorkEndTime = propertyPutter('desired_time_work');
const PUT_desiredHoursRelax = propertyPutter('desired_hours_relax');
const PUT_desiredRelaxActivity = propertyPutter('desired_activity');

// RECOMMENDATIONS.js API

const GET_desiredHoursSleep = propertyGetter('desired_hours_sleep');
const GET_desiredTimeSleep = propertyGetter('desired_time_sleep');
const GET_desiredHoursWork = propertyGetter('desired_hours_work');
const GET_desiredWorkBlock = propertyGetter('desired_block_work');
const GET_desiredWorkEndTime = propertyGetter('desired_time_work');
const GET_desiredHoursRelax = propertyGetter('desired_hours_relax');
const GET_desiredRelaxActivity = propertyGetter('desired_activity');

// ALL TOGETHER - After updating all survey inputs from defaults, post the latest survey to the db
const POST_dailySurvey = postWellnessSurvey;

export {
  PUT_sleepSat, PUT_workSat, PUT_relaxSat, PUT_mood, PUT_priority,
  PUT_desiredHoursSleep, PUT_desiredTimeSleep, PUT_desiredHoursWork,
  PUT_desiredWorkBlock, PUT_desiredWorkEndTime, PUT_desiredHoursRelax, PUT_desiredRelaxActivity,
  GET_desiredHoursSleep, GET_desiredTimeSleep, GET_desiredHoursWork,
  GET_desiredWorkBlock, GET_desiredWorkEndTime, GET_desiredHoursRelax, GET_desiredRelaxActivity,
  POST_dailySurvey,
};

import axios from 'axios';
import { stringToDatetimeLocal, extractDateString } from './utils';

import rootURL from './url';

// GET /calendar/event/list/{user}
async function getCalendarEventList(user) {
  const url = `${rootURL}/calendar/event/list/${user}`;
  try {
    const response = await axios.get(url);
    const rtnArr = Array.isArray(response?.data) ? response?.data : [];
    return rtnArr;
  } catch (err) {
    // throw new Error(`Error when calling ${url}`);
    return [];
  }
}

// POST /calendar/event/create/{user}
async function postCalendarEventCreate(user, eventName, eventColor) {
  const url = `${rootURL}/calendar/event/create/${user}`;
  try {
    const sendEvent = { color: eventColor, name: eventName };
    const response = await axios.post(url, sendEvent);
    const recEvent = response.data;
    return recEvent;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// GET /calendar/event/{event_id}/{user}
async function getCalendarEventEventID(eventID, user) {
  const url = `${rootURL}/calendar/event/${eventID}/${user}`;
  try {
    const response = await axios.get(url);
    const eventObj = response.data;
    return eventObj;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// PUT /calendar/event/{event_id}/{user}
// Function is called "post" for legacy reasons
async function postCalendarEventEventID(eventID, user, eventName, eventColor) {
  const url = `${rootURL}/calendar/event/${eventID}/${user}`;
  try {
    const sendEvent = { color: eventColor, name: eventName };
    const response = await axios.put(url, sendEvent);
    const recEvent = response.data;
    return recEvent;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// DELETE /calendar/event/{event_id}/{user}
async function deleteCalendarEventEventID(eventID, user) {
  const url = `${rootURL}/calendar/event/${eventID}/${user}`;
  try {
    const response = await axios.delete(url);
    return response.data || response.status;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// GET /calendar/blob/list/{date}/{user}
async function getCalendarBlobList(date, user) {
  // console.log(date);
  const url = `${rootURL}/calendar/blob/list/${extractDateString(date)}/${user}`;
  try {
    const response = await axios.get(url);
    let rtnArr = response?.data || [];
    // console.log(rtnArr);
    rtnArr = rtnArr.sort((a, b) => (
      stringToDatetimeLocal(a.time.start).valueOf()
      - stringToDatetimeLocal(b.time.start).valueOf()
    ));
    return rtnArr;
  } catch (err) {
    // throw new Error(`Error when calling ${url}`);
    // console.log(err);
    return [];
  }
}

// POST /calendar/blob/create/{event_id}/{user}
async function postCalendarBlobCreate(eventID, user, startDateTime, endDateTime) {
  const url = `${rootURL}/calendar/blob/create/${eventID}/${user}`;
  try {
    const sendBlob = { time: { start: startDateTime, end: endDateTime } };
    const response = await axios.post(url, sendBlob);
    const recBlob = response.data;
    return recBlob;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// GET /calendar/blob/{blob_id}/{event_id}/{user}
async function getCalendarBlobBlobID(blobID, eventID, user) {
  const url = `${rootURL}/calendar/blob/${blobID}/${eventID}/${user}`;
  try {
    const response = await axios.get(url);
    const blobObj = response.data;
    return blobObj;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// PUT /calendar/blob/{blob_id}/{event_id}/{user}
// Function is called "post" for legacy reasons
async function postCalendarBlobBlobID(blobID, eventID, user, startDateTime, endDateTime) {
  const url = `${rootURL}/calendar/blob/${blobID}/${eventID}/${user}`;
  try {
    const sendBlob = { time: { start: startDateTime, end: endDateTime } };
    const response = await axios.put(url, sendBlob);
    const recBlob = response.data;
    return recBlob;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// DELETE /calendar/blob/{blob_id}/{event_id}/{user}
async function deleteCalendarBlobBlobID(blobID, eventID, user) {
  const url = `${rootURL}/calendar/blob/${blobID}/${eventID}/${user}`;
  try {
    const response = await axios.delete(url);
    return response.data || response.status;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

export {
  getCalendarEventList, postCalendarEventCreate,
  getCalendarEventEventID, postCalendarEventEventID,
  deleteCalendarEventEventID, getCalendarBlobList,
  postCalendarBlobCreate, getCalendarBlobBlobID,
  postCalendarBlobBlobID, deleteCalendarBlobBlobID,
};

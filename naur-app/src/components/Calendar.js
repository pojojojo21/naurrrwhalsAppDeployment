import React, { useRef, useState } from 'react';
import '../assets/Calendar.css';
import { FaCalendarAlt } from 'react-icons/fa';

import {
  getCalendarEventList, postCalendarEventCreate,
  deleteCalendarEventEventID,
  getCalendarBlobList, postCalendarBlobCreate,
  postCalendarBlobBlobID, deleteCalendarBlobBlobID,
} from '../modules/calendarApi';

import {
  dateToStringLocal, combineDateTimeString, extractTimeString,
  stringToDatetimeLocal, stringToDateLocal, extractDateString,
} from '../modules/utils';

function Calendar({ username }) {
  const [date, setDate] = useState(dateToStringLocal(new Date()));

  // eslint-disable-next-line no-unused-vars
  const [_updateListValue, updateLists] = useState(0);

  return (
    <CalendarContainer
      username={username}
      date={date}
      setDate={setDate}
      eventListPromise={getCalendarEventList(username)}
      blobListPromise={getCalendarBlobList(date, username)}
      updateLists={updateLists}
    />
  );
}

function CalendarContainer({
  username, date, setDate, eventListPromise, blobListPromise, updateLists,
}) {
  const [eventList, setEventList] = useState([]);
  eventListPromise.then((value) => { setEventList(value); });
  const [blobList, setBlobList] = useState([]);
  blobListPromise.then((value) => { setBlobList(value); });

  const [selectedBlob, setSelectedBlob] = useState('');

  // console.log('CalendarContainer rerendered');
  // console.log('eventList value:');
  // console.log(eventList);

  return (
    <div id="calendar">
      <div id="editBar">
        <div id="topBar">
          <FaCalendarAlt id="top" />
          { ' ' }
          <DatePicker date={date} setDate={setDate} setSelectedBlob={setSelectedBlob} />
          <br />
        </div>
        <EventAdder username={username} updateLists={updateLists} />
        <br />
        <BlobAdder
          username={username}
          eventList={eventList}
          date={date}
          updateLists={updateLists}
        />
        <br />
      </div>
      <CalendarView
        blobList={blobList}
        selectedBlob={selectedBlob}
        setSelectedBlob={setSelectedBlob}
      />
      <BlobEditor
        username={username}
        date={date}
        selectedBlob={selectedBlob}
        setSelectedBlob={setSelectedBlob}
        updateLists={updateLists}
      />
    </div>
  );
}

function EventAdder({ username, updateLists }) {
  function createEvent() {
    const eventNameInput = document.getElementById('eventnameinput');
    const eventColorPicker = document.getElementById('eventcolorpicker');
    const eventName = eventNameInput.value;
    const eventColor = eventColorPicker.value;
    eventNameInput.value = 'Default Event Name';
    eventColorPicker.value = '#888888';
    // eslint-disable-next-line max-len
    (async function anon1BlobAdder() {
      await postCalendarEventCreate(username, eventName, eventColor);
      updateLists((val) => (!val));
    }());
  }

  // console.log('EventAdder rerendered');

  return (
    <div id="eventadder">
      <div>
        <h3>Create New Event</h3>
      </div>
      <div>
        <label htmlFor="eventnameinput">
          Event Name:&nbsp;
          <input type="text" id="eventnameinput" className="calLabel" defaultValue="Default Event Name" />
        </label>
      </div>
      <div>
        <label htmlFor="eventcolorpicker">
          Event Color:&nbsp;
          <input type="color" id="eventcolorpicker" className="calLabel" defaultValue="#888888" />
        </label>
      </div>
      <div>
        <input type="button" value="Create New Event" className="calLabel" onClick={createEvent} />
      </div>
    </div>
  );
}

function BlobAdder({
  username, eventList, updateLists, date,
}) {
  // console.log('BlobAdder rerendered');
  // console.log('eventList value:');
  // console.log(eventList);

  function createBlob() {
    const eventPicker = document.getElementById('eventpicker');
    const startTimePicker = document.getElementById('starttimepicker');
    const endTimePicker = document.getElementById('endtimepicker');
    const eventID = eventPicker.value;
    const startDateTime = combineDateTimeString(date, startTimePicker.value);
    const endDateTime = combineDateTimeString(date, endTimePicker.value);
    startTimePicker.value = '';
    endTimePicker.value = '';
    (async function anon1BlobAdder() {
      await postCalendarBlobCreate(eventID, username, startDateTime, endDateTime);
      updateLists((val) => (!val));
    }());
  }

  function deleteEvent() {
    const eventPicker = document.getElementById('eventpicker');
    const eventID = eventPicker.value;
    const startTimePicker = document.getElementById('starttimepicker');
    const endTimePicker = document.getElementById('endtimepicker');
    startTimePicker.value = '';
    endTimePicker.value = '';
    (async function anon2BlobAdder() {
      await deleteCalendarEventEventID(eventID, username);
      updateLists((val) => (!val));
    }());
  }

  return (
    <div id="blobadder">
      <div>
        <h3>Add Events to Calendar</h3>
      </div>
      <div>
        <label htmlFor="eventpicker">
          Event:&nbsp;
          <select id="eventpicker" className="calLabel">
            {eventList.map((event) => (
              <option key={event.event_id} value={event.event_id}>{event.name}</option>
            ))}
          </select>
        </label>
      </div>
      &nbsp;
      <div>
        <label htmlFor="starttimepicker">
          Start time:&nbsp;
          <input type="time" className="calLabel" id="starttimepicker" />
        </label>
      </div>
      <div>
        <label htmlFor="endtimepicker">
          End time:&nbsp;
          <input type="time" className="calLabel" id="endtimepicker" />
        </label>
      </div>
      <br />
      <div>
        <input type="button" value="Delete Event" className="calLabel" onClick={deleteEvent} />
        <input type="button" value="Create New Blob" className="calLabel" onClick={createBlob} />
      </div>
    </div>
  );
}

function BlobEditor({
  username, date, updateLists, selectedBlob, setSelectedBlob,
}) {
  function editBlob() {
    const startTimePicker = document.getElementById('starttimepickermodify');
    const endTimePicker = document.getElementById('endtimepickermodify');
    const startDateTime = combineDateTimeString(date, startTimePicker.value);
    const endDateTime = combineDateTimeString(date, endTimePicker.value);
    startTimePicker.value = '';
    endTimePicker.value = '';
    setSelectedBlob(null);
    (async function anon1BlobEditor() {
      await postCalendarBlobBlobID(
        selectedBlob.blob_id,
        selectedBlob.event.event_id,
        username,
        startDateTime,
        endDateTime,
      );
      updateLists((val) => (!val));
    }());
  }

  function deleteBlob() {
    const startTimePicker = document.getElementById('starttimepickermodify');
    const endTimePicker = document.getElementById('endtimepickermodify');
    startTimePicker.value = '';
    endTimePicker.value = '';
    setSelectedBlob(null);
    (async function anonwBlobEditor() {
      await deleteCalendarBlobBlobID(
        selectedBlob.blob_id,
        selectedBlob.event.event_id,
        username,
      );
      updateLists((val) => (!val));
    }());
  }

  const prevBlob = useRef(null);

  const startTimePicker = document.getElementById('starttimepickermodify');
  const endTimePicker = document.getElementById('endtimepickermodify');
  if (!selectedBlob) {
    if (startTimePicker) {
      startTimePicker.value = '';
    }
    if (endTimePicker) {
      endTimePicker.value = '';
    }
  } else {
    if (startTimePicker && (!startTimePicker.value || (prevBlob.current !== selectedBlob))) {
      startTimePicker.value = extractTimeString(selectedBlob.time.start);
    }
    if (endTimePicker && (!endTimePicker.value || (prevBlob.current !== selectedBlob))) {
      endTimePicker.value = extractTimeString(selectedBlob.time.end);
    }
  }

  prevBlob.current = selectedBlob;

  // console.log('BlobEditor rerendered');

  return (
    <div id="blobeditor">
      <div>
        <h3>Edit Event on Calendar</h3>
      </div>
      <div>
        <label htmlFor="starttimepickermodify">
          Start time:&nbsp;
          <input type="time" className="calLabel" id="starttimepickermodify" />
        </label>
      </div>
      &nbsp;
      <div>
        <label htmlFor="endtimepickermodify">
          End time:&nbsp;
          <input type="time" className="calLabel" id="endtimepickermodify" />
        </label>
      </div>
      <br />
      <input type="button" value="Edit Blob Time" className="calLabel" onClick={editBlob} />
      <input type="button" value="Delete Blob" className="calLabel" onClick={deleteBlob} />
    </div>
  );
}

function DatePicker({ date, setDate, setSelectedBlob }) {
  function dateChanged(e) {
    if (e.target.value) {
      setSelectedBlob(null);
      setDate(e.target.value);
    }
  }

  return (
    <label htmlFor="datepicker">
      Choose date:&nbsp;
      <input type="date" id="datepicker" defaultValue={date} onChange={dateChanged} />
    </label>
  );
}

const calendarWidth = 400;
const calendarHeight = 1000;
const calendarPadL = 50;
const calendarPadR = 10;
const calendarPadU = 10;
const calendarPadD = 10;

function CalendarView({ blobList, selectedBlob, setSelectedBlob }) {
  const hourList = Array.from({ length: 24 }, (_x, i) => i);
  // console.log('CalendarView rerendered');
  // console.log(blobList);
  return (
    <div className="calendarview">
      <svg
        width={calendarPadL + calendarWidth + calendarPadR}
        height={calendarPadU + calendarHeight + calendarPadD}
      >
        <rect x={calendarPadL} y={calendarPadU} width={calendarWidth} height={calendarHeight} stroke="black" strokeWidth="0.4%" />
        {hourList.map((hour) => <HourBox key={hour} hour={hour} />)}
        {blobList.map((blob) => (
          <CalendarBlob key={`${blob.event.event_id}_${blob.blob_id}`} selectedBlob={selectedBlob} setSelectedBlob={setSelectedBlob} blob={blob} />
        ))}
      </svg>
    </div>
  );
}

function CalendarBlob({ blob, selectedBlob, setSelectedBlob }) {
  const millisAtMidnight = stringToDateLocal(extractDateString(blob.time.start)).getTime();
  const millisAtStart = stringToDatetimeLocal(blob.time.start).getTime() - millisAtMidnight;
  const millisAtEnd = stringToDatetimeLocal(blob.time.end).getTime() - millisAtMidnight;
  const millisDay = 86400000; // Milliseconds in a day

  const x = calendarPadL;
  const y = calendarPadU + (calendarHeight * millisAtStart) / millisDay;
  const height = (calendarHeight * (millisAtEnd - millisAtStart)) / millisDay;
  const width = calendarWidth;

  const label = blob.event.name;

  // eslint-disable-next-line prefer-destructuring
  const color = blob.event.color;

  return (
    <g onClick={() => (setSelectedBlob(blob))}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        stroke="black"
        strokeWidth={(selectedBlob === blob) ? '1%' : '0.2%'}
        opacity="0.7"
      />
      <text
        x={x + width / 2}
        y={y + height / 3}
        dominantBaseline="middle"
        textAnchor="middle"
      >
        <tspan textAnchor="middle" x={x + width / 2}>
          {label}
        </tspan>
        <tspan textAnchor="middle" x={x + width / 2} dy="1.2em">
          {extractTimeString(blob.time.start)}
          -
          {extractTimeString(blob.time.end)}
        </tspan>
      </text>
    </g>
  );
}

function HourBox({ hour }) {
  const height = calendarHeight / 24;
  const width = calendarWidth;
  const x = calendarPadL;
  const y = calendarPadU + (hour * height);
  const color = (hour % 2) ? 'white' : '#cccccc';

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={color} />
      <text x={0} y={y + height / 4} dominantBaseline="middle">
        {hour.toString().padStart(2, '0')}
        :00
      </text>
    </g>
  );
}

export default Calendar;

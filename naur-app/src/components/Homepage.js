/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FaCalendarAlt, FaList, FaEnvelope, FaArrowCircleRight, FaChartLine,
} from 'react-icons/fa';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { getMessageCount } from '../modules/messageApi';

import TaskHolder from './TaskHolder';
import MessagingView from './MessagingView';
import Survey from './Survey';
import Calendar from './Calendar';
import '../assets/Homepage.css';
import Recommendations from './Recommendations';

import { getCurrentTimeString, getCurrentDateString } from '../modules/timeFuncs';

function Homepage({ namestring, time }) {
  const [page, setPage] = useState('wellness');
  const [notifCount, setNotifCount] = useState(0);
  const [messageCount, setMessageCount] = useState(-1);

  function handleLogout() {
    window.location.reload(false);
  }

  function handleCalendar() {
    setPage('calendar');
  }

  function handleTasks() {
    setPage('task');
  }

  function handleMessaging() {
    setPage('message');
  }

  function handleRec() {
    setPage('rec');
  }

  useEffect(() => {
    getMessageCount(namestring).then((newCount) => {
      if (messageCount >= 0 && newCount !== messageCount) {
        setNotifCount(notifCount + 1);
      }
      setMessageCount(newCount);
    });
  }, [time]);

  return (
    <div className="homepageWrapper">
      <div>
        {page === 'wellness' && (
        <div id="SurveyBox">
          <Survey username={namestring} />
        </div>
        )}
        {page === 'calendar' && (
        <div id="CalendarBox">
          <Calendar username={namestring} />
        </div>
        )}
        {page === 'task' && (
        <div id="TaskBox">
          <TaskHolder username={namestring} />
        </div>
        )}
        {page === 'message' && (
        <div id="MessagingBox">
          <MessagingView username={namestring} time={time} setNotifCount={setNotifCount} />
        </div>
        )}
        {page === 'rec' && (
        <div id="RecBox">
          <Recommendations username={namestring} />
        </div>
        )}
      </div>
      <div className="Navigation">
        <h1>{namestring}</h1>
        <button type="submit" className="navButton" id="Calendar" aria-label="Calendar" onClick={handleCalendar}><FaCalendarAlt /></button>
        <button type="submit" className="navButton" id="Tasks" aria-label="Tasks" onClick={handleTasks}><FaList /></button>
        <button type="submit" className="navButton" id="Messaging" aria-label="messaging" onClick={handleMessaging}>
          {(notifCount > 0) && (page !== 'message') && (<NotificationBadge count={notifCount} effect={Effect.SCALE} />)}
          <FaEnvelope />
        </button>
        <button type="submit" className="navButton" id="Logout" aria-label="logout" onClick={handleLogout}><FaArrowCircleRight /></button>
        <button type="submit" className="navButton" id="Analytics" aria-label="Analytics" onClick={handleRec}><FaChartLine /></button>
        <div id="date_box">
          {' '}
          {getCurrentDateString()}
          {' '}
          {getCurrentTimeString()}
        </div>
      </div>
    </div>
  );
}

Homepage.propTypes = {
  namestring: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default Homepage;

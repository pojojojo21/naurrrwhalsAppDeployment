/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  React, useEffect, useState,
} from 'react';
import '../assets/SingleUser.css';
import PropTypes from 'prop-types';
import { FaEllipsisH } from 'react-icons/fa';

// import {
//   // eslint-disable-next-line no-unused-vars
//   initLocalStorage,
//   // eslint-disable-next-line no-unused-vars
//   addUser, addFriend, addPending, addRequested,
//   // eslint-disable-next-line no-unused-vars
//   hasFriend, hasPending, hasRequested,
//   // eslint-disable-next-line no-unused-vars
//   printUsers, printFriendList, printPendingList, printRequestedList,
// } from '../modules/storage';

function SingleUser({
  username, selected, setSelected, setActionOne, actionTextOne, setActionTwo, actionTextTwo,
}) {
  const [style, setStyle] = useState('unclicked');
  function handleSetSelected() {
    setSelected(username);
  }
  function handleActionOne() {
    setSelected(username);
    setActionOne(true);
  }
  function handleActionTwo() {
    setSelected(username);
    setActionTwo(true);
  }
  useEffect(() => {
    if (username === selected) {
      setStyle('clicked');
    } else {
      setStyle('unclicked');
    }
  }, [selected]);

  return (
    <div id="single_user">
      <div role="button" tabIndex={0} className={style} id="usernamebar" onClick={handleSetSelected}>{username}</div>
      {(actionTextOne === 'Options') && (
        <button type="button" className="userButton" aria-label={actionTextOne} onClick={handleActionOne}><FaEllipsisH /></button>
      )}
      {(actionTextOne === 'Remove') && (
        <button type="button" className="removebtn" aria-label={actionTextOne} onClick={handleActionOne}>{actionTextOne}</button>
      )}
      {(actionTextOne === 'Confirm') && (
        <button type="button" className="removebtn" aria-label={actionTextOne} onClick={handleActionOne}>{actionTextOne}</button>
      )}
      {setActionTwo && <button type="button" className="removebtn" onClick={handleActionTwo}>{actionTextTwo}</button>}
    </div>
  );
}
SingleUser.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  username: PropTypes.string.isRequired,
  selected: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  setActionOne: PropTypes.func.isRequired,
  actionTextOne: PropTypes.string.isRequired,
  setActionTwo: PropTypes.func,
  actionTextTwo: PropTypes.string,
};
SingleUser.defaultProps = {
  selected: undefined,
  setActionTwo: undefined,
  actionTextTwo: undefined,
};

export default SingleUser;

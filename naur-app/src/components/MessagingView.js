import { React, useEffect, useState } from 'react';
import '../assets/MessagingView.css';
import PropTypes from 'prop-types';
import UserControl from './UserControl';
import MessageDisplay from './MessageDisplay';
import { getFriendFirst } from '../modules/messageApi';

function MessagingView({ username, time, setNotifCount }) {
  // eslint-disable-next-line no-unused-vars
  const [loadSelected, setLoad] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);

  useEffect(() => {
    getFriendFirst(username).then((first) => {
      setSelectedUser(first);
    });
  }, [loadSelected]);

  useEffect(() => {
    setNotifCount(0);
  }, [loadSelected, time]);

  return (
    <div className="messagingWrapper">
      <div>
        <UserControl
          username={username}
          selected={selectedUser}
          setSelected={setSelectedUser}
          time={time}
        />
      </div>
      <div>
        <MessageDisplay username={username} selected={selectedUser} time={time} />
      </div>
    </div>
  );
}
MessagingView.propTypes = {
  username: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  setNotifCount: PropTypes.func.isRequired,
};

export default MessagingView;

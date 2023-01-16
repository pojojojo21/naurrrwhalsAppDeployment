import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../assets/MessageDisplay.css';
import MessageList from './MessageList';
import SendMessageBox from './SendMessageBox';
import { getFriendExists, getMessageLog } from '../modules/messageApi';

function MessageDisplay({ username, time, selected }) {
  const [messageLog, setMessageLog] = useState(undefined);

  useEffect(() => {
    if (!selected) {
      return;
    }
    getFriendExists(username, selected).then((hasFriend) => {
      if (!hasFriend) {
        return;
      }
      getMessageLog(username, selected).then((log) => {
        setMessageLog(log);
      });
    });
  }, [selected, time]);

  return (
    <div className="message_disp">
      <div>Messages</div>
      {(selected === undefined) && (<div>You currently have no friends</div>)}
      {!(selected === undefined) && !(messageLog === undefined)
      && (
        <div>
          <MessageList
            username={username}
            list={messageLog}
          />

          <div />
          <SendMessageBox
            username={username}
            friendName={selected}
            setMessageLog={setMessageLog}
          />
        </div>
      )}
    </div>
  );
}
MessageDisplay.propTypes = {
  username: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  selected: PropTypes.string,
};

MessageDisplay.defaultProps = {
  selected: undefined,
};

export default MessageDisplay;

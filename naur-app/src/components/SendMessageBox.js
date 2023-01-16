import { React, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getMessageLog, putMessageLog } from '../modules/messageApi';
import PopUp from './PopUp';
import SendMediaDisplay from './SendMediaDisplay';

// eslint-disable-next-line no-unused-vars
function SendMessageBox({ username, friendName, setMessageLog }) {
  const [isInSendMediaPopUp, setMediaPopUp] = useState(false);
  const message = useRef(undefined);

  const sendMessage = (sender, receiver, msg) => {
    if (msg === undefined) {
      return;
    }
    putMessageLog(sender, receiver, msg).then(() => {
      getMessageLog(sender, receiver).then((log) => {
        setMessageLog(log);
      });
    });
  };

  function handleWriteMsg(e) {
    message.current = { msgText: e.target.value };
  }
  function handleSendMsg() {
    if (message.current === undefined
     || message.current.msgText === undefined
     || message.current.msgText === '') {
      return;
    }
    sendMessage(username, friendName, message.current);
    document.getElementById('enterMessage').value = '';
    // printUsers();
  }

  function handlePressMedia() {
    setMediaPopUp(true);
  }

  const handleCloseMedia = () => {
    setMediaPopUp(false);
  };

  return (
    <div id="messagebox">
      <input type="text" id="enterMessage" placeholder="Message" onChange={handleWriteMsg} />
      <button type="button" className="removebtn" onClick={handleSendMsg}>Send</button>
      <button type="button" className="removebtn" onClick={handlePressMedia}>Media</button>
      {isInSendMediaPopUp && (
      <PopUp
        content={(
          <SendMediaDisplay
            sender={username}
            receiver={friendName}
            sendMessage={sendMessage}
            handleClose={handleCloseMedia}
          />
        )}
        handleClose={handleCloseMedia}
        closetext="Cancel"
      />
      )}
    </div>
  );
}
SendMessageBox.propTypes = {
  username: PropTypes.string.isRequired,
  friendName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  setMessageLog: PropTypes.func.isRequired,
};

export default SendMessageBox;

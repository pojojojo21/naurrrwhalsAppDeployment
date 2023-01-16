import React from 'react';
import PropTypes from 'prop-types';
import '../assets/Message.css';

// eslint-disable-next-line no-unused-vars
function Message({
  message, user, sender, time,
}) {
  let style = 'friend_msg';
  let messageBody;
  if (user === sender) {
    style = 'my_msg';
  }
  if (message.imageURL) {
    messageBody = <img className="img_msg" src={message.imageURL} alt="Invalid URL" />;
  } else {
    messageBody = message.msgText;
  }

  return (
    <div className={style}>
      {messageBody}
      <div id="msg_time">{time}</div>
    </div>
  );
}
Message.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default Message;

import React from 'react';
import PropTypes from 'prop-types';
import '../assets/MessageList.css';
import Message from './Message';

function displayMessageList(username, list) {
  const listArray = [];
  let date;
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    // console.log(date);
    if (date !== item[3]) {
      listArray.push(
        <li className="messagelist_date" key={item[3]}>{item[3]}</li>,
      );
    }
    // eslint-disable-next-line prefer-destructuring
    date = item[3];
    listArray.push(
      <li className="message_wrapper" key={item}>
        <Message user={username} sender={item[0]} message={item[1]} time={item[2]} />
      </li>,
    );
  }
  return listArray;
}

function MessageList({ username, list }) {
  return (
    <div id="messagelist">
      <ul list-style-type="none" id="messagelist">
        {displayMessageList(username, list)}
      </ul>
    </div>
  );
}
MessageList.propTypes = {
  username: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array,
};
MessageList.defaultProps = {
  list: undefined,
};

export default MessageList;

import {
  React, useState, useRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  getUserExists, getFriendExists, getPendingExists, sendFriendRequest,
} from '../modules/messageApi';

function AddFriendDisplay({ username }) {
  const [pressedAdd, setPressedAdd] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [sentRequest, setSentRequest] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [isSelf, setIsSelf] = useState(false);

  const friendName = useRef(undefined);

  function handleInputName(e) {
    e.preventDefault();
    friendName.current = e.target.value;
    setPressedAdd(false);
    setIsUser(false);
    setSentRequest(false);
    setIsSelf(false);
    setAlreadyExists(false);
  }

  function handleSendRequest() {
    setPressedAdd(true);
    if (friendName.current === username) {
      setIsSelf(true);
      return;
    }
    getFriendExists(username, friendName.current).then((friendValue) => {
      if (friendValue) {
        setAlreadyExists(true);
        return;
      }
      getPendingExists(username, friendName.current).then((pendingValue) => {
        if (pendingValue) {
          setAlreadyExists(true);
          return;
        }
        getUserExists(friendName.current).then((userValue) => {
          if (!userValue) {
            return;
          }
          setIsUser(true);
          sendFriendRequest(username, friendName.current).then(() => {
            setSentRequest(true);
          });
        });
      });
    });
  }
  return (
    <div>
      Add Friend
      <div><input type="text" id="enterName" placeholder="Enter name" onChange={handleInputName} /></div>
      <button type="button" className="sendbtn" onClick={handleSendRequest}>Send</button>
      {pressedAdd && !isUser && !isSelf && !alreadyExists
      && (<div>Inexistent user</div>)}
      {sentRequest && (<div>Sent Friend Request</div>)}
      {isSelf && (<div>Cannot send request to self</div>)}
      {alreadyExists && (<div>Already sent request</div>)}
    </div>
  );
}
AddFriendDisplay.propTypes = {
  username: PropTypes.string.isRequired,
};

export default AddFriendDisplay;

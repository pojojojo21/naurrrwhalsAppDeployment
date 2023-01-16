import {
  React, useEffect, useState,
} from 'react';
import '../assets/UserControl.css';
import PropTypes from 'prop-types';
import {
  FaEnvelope,
  FaHourglass, FaPlus, FaRegAddressBook,
} from 'react-icons/fa';

import { getFriendList, getFriendFirst } from '../modules/messageApi';
import PopUp from './PopUp';
import FriendList from './FriendList';
import RemoveFriendDisplay from './RemoveFriendDisplay';
import AddFriendDisplay from './AddFriendDisplay';
import ViewPendingDisplay from './ViewPendingDisplay';
import RequestDisplay from './RequestDisplay';

function UserControl({
  username, selected, setSelected, time,
}) {
  const [loadData, setLoadData] = useState(true);
  const [friendList, setFriends] = useState(undefined);
  const [isInPopUp, setPopUp] = useState('none');
  const [areOptionsOpened, setOptionsOpened] = useState(false);

  function handleAddFriend(e) {
    e.preventDefault();
    setPopUp('add friend');
  }

  function handleViewPending(e) {
    e.preventDefault();
    setPopUp('view pending');
  }

  function handleConfirmRequest(e) {
    e.preventDefault();
    setPopUp('confirm request');
  }

  const handleClose = () => {
    setPopUp('none');
  };

  const handleCloseRemoveFriend = () => {
    setOptionsOpened(false);
  };

  useEffect(() => {
    getFriendList(username).then((list) => {
      setFriends(list);
      if (list.includes(selected)) {
        return;
      }
      getFriendFirst(username).then((first) => {
        setSelected(first);
      });
    });
  }, [loadData, time]);

  useEffect(() => {
  }, [loadData]);

  return (
    <div className="ucWrapper">
      <div className="user_ctl">
        <div id="messageicon">
          <FaEnvelope />
        </div>
        {(friendList !== undefined) && (
        <div>
          <FriendList
            list={friendList}
            selected={selected}
            setSelected={setSelected}
            setActionOne={setOptionsOpened}
            actionTextOne="Options"
          />
        </div>
        )}
        <div id="messageiconWrapper">
          <button type="submit" className="messageButton" aria-label="Send Friend Request" onClick={handleAddFriend}><FaPlus /></button>
          <button type="submit" className="messageButton" aria-label="View Pending Requests" onClick={handleViewPending}><FaHourglass /></button>
          <button type="submit" className="messageButton" aria-label="Confirm Friend Requests" onClick={handleConfirmRequest}><FaRegAddressBook /></button>
        </div>
      </div>
      {(isInPopUp === 'add friend') && (
      <PopUp
        content={(
          <AddFriendDisplay
            username={username}
          />
)}
        handleClose={handleClose}
        closetext="Cancel"
      />
      )}
      {(isInPopUp === 'view pending') && (
      <PopUp
        content={(
          <ViewPendingDisplay
            username={username}
          />
)}
        handleClose={handleClose}
        closetext="Cancel"
      />
      )}
      {(isInPopUp === 'confirm request') && (
      <PopUp
        content={(
          <RequestDisplay
            username={username}
            loadFriendList={loadData}
            setLoadFriendList={setLoadData}
            setSelectedFriend={setSelected}
          />
)}
        handleClose={handleClose}
        closetext="Cancel"
      />
      )}
      {areOptionsOpened && (
      <PopUp
        content={(
          <RemoveFriendDisplay
            username={username}
            toRemove={selected}
            loadData={loadData}
            setLoadData={setLoadData}
          />
        )}
        handleClose={handleCloseRemoveFriend}
        closetext="Cancel"
      />
      )}
    </div>
  );
}

UserControl.propTypes = {
  username: PropTypes.string.isRequired,
  selected: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

UserControl.defaultProps = {
  selected: undefined,
};

export default UserControl;

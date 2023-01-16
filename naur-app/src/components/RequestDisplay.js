import {
  React, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import FriendList from './FriendList';
import {
  getRequestedList, getRequestedFirst, acceptFriendRequest, rejectFriendRequest,
} from '../modules/messageApi';

function RequestDisplay({
  username, loadFriendList, setLoadFriendList, setSelectedFriend,
}) {
  const [loadRequestedList, setLoadRequestedList] = useState(true);
  const [list, setList] = useState(undefined);
  const [selected, setSelected] = useState(undefined);

  const handleAcceptRequest = () => {
    acceptFriendRequest(username, selected).then(() => {
      setLoadFriendList(!loadFriendList);
      setLoadRequestedList(!loadRequestedList);
      setSelectedFriend(selected);
    });
  };

  const handleRejectRequest = () => {
    rejectFriendRequest(username, selected).then(() => {
      setLoadRequestedList(!loadRequestedList);
    });
  };

  useEffect(() => {
    getRequestedList(username).then((requestedlist) => {
      setList(requestedlist);
      getRequestedFirst(username).then((first) => {
        setSelected(first);
      });
    });
  }, [loadRequestedList]);

  return (
    <div>
      <div>Recieved Friend Requests</div>
      {(list !== undefined) && (selected !== undefined) && (
      <FriendList
        list={list}
        selected={selected}
        setSelected={setSelected}
        setActionOne={handleAcceptRequest}
        actionTextOne="Confirm"
        setActionTwo={handleRejectRequest}
        actionTextTwo="Reject"
      />
      )}
    </div>
  );
}
RequestDisplay.propTypes = {
  username: PropTypes.string.isRequired,
  loadFriendList: PropTypes.bool.isRequired,
  setLoadFriendList: PropTypes.func.isRequired,
  setSelectedFriend: PropTypes.func.isRequired,
};

export default RequestDisplay;

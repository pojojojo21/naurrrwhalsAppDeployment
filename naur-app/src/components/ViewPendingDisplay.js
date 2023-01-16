import {
  React, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import FriendList from './FriendList';
import { getPendingList, getPendingFirst, undoFriendRequest } from '../modules/messageApi';

function ViewPendingDisplay({ username }) {
  const [loadPendingList, setLoadPendingList] = useState(true);
  const [list, setList] = useState(undefined);
  const [selected, setSelected] = useState(undefined);

  const handleUndoRequest = () => {
    undoFriendRequest(username, selected).then(() => {
      setLoadPendingList(!loadPendingList);
    });
  };

  useEffect(() => {
    getPendingList(username).then((pendinglist) => {
      setList(pendinglist);
      getPendingFirst(username).then((first) => {
        setSelected(first);
      });
    });
  }, [loadPendingList]);

  return (
    <div>
      <div>Pending Friend Requests</div>
      {(list !== undefined) && (selected !== undefined) && (
      <FriendList
        list={list}
        selected={selected}
        setSelected={setSelected}
        setActionOne={handleUndoRequest}
        actionTextOne="Remove"
      />
      )}
    </div>
  );
}
ViewPendingDisplay.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ViewPendingDisplay;

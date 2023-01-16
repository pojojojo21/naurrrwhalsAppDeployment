import {
  React,
} from 'react';
import PropTypes from 'prop-types';
import { removeFriendfromFriendList } from '../modules/messageApi';

function RemoveFriendDisplay({
  username, toRemove, loadData, setLoadData,
}) {
  function handleRemove() {
    removeFriendfromFriendList(username, toRemove).then(() => {
      setLoadData(!loadData);
    });
  }
  return (
    <div>
      <button type="button" className="removebtn" onClick={handleRemove}>Remove Friend</button>
    </div>
  );
}
RemoveFriendDisplay.propTypes = {
  username: PropTypes.string.isRequired,
  toRemove: PropTypes.string,
  loadData: PropTypes.bool.isRequired,
  setLoadData: PropTypes.func.isRequired,
};
RemoveFriendDisplay.defaultProps = {
  toRemove: undefined,
};

export default RemoveFriendDisplay;

import React from 'react';
import PropTypes from 'prop-types';
import SingleUser from './SingleUser';

function FriendList({
  list, selected, setSelected, setActionOne, actionTextOne, setActionTwo, actionTextTwo,
}) {
  return (
    <ul id="friendlist">
      {list.map((item) => (
        <li key={item}>
          <SingleUser
            username={item}
            selected={selected}
            setSelected={setSelected}
            setActionOne={setActionOne}
            actionTextOne={actionTextOne}
            setActionTwo={setActionTwo}
            actionTextTwo={actionTextTwo}
          />
        </li>
      ))}
    </ul>
  );
}
FriendList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array,
  selected: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  setActionOne: PropTypes.func.isRequired,
  actionTextOne: PropTypes.string.isRequired,
  setActionTwo: PropTypes.func,
  actionTextTwo: PropTypes.string,
};
FriendList.defaultProps = {
  list: undefined,
  selected: undefined,
  setActionTwo: undefined,
  actionTextTwo: undefined,
};

export default FriendList;

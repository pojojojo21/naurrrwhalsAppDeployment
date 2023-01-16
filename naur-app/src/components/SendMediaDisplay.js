import {
  React, useRef,
} from 'react';
import PropTypes from 'prop-types';

function SendMediaDisplay({
  sender, receiver, sendMessage, handleClose,
}) {
  const imageURLObj = useRef('');

  function setCurrentImageURL(e) {
    imageURLObj.current = { imageURL: e.target.value };
  }
  function handleSendMedia() {
    if (imageURLObj.current === undefined
     || imageURLObj.current.imageURL === undefined
     || imageURLObj.current.imageURL === '') {
      return;
    }
    sendMessage(sender, receiver, imageURLObj.current);
    handleClose();
  }
  return (
    <div>
      <div>Send Image</div>
      <input type="text" placeholder="Enter Image URL" onChange={setCurrentImageURL} />
      <button type="button" className="removebtn" onClick={handleSendMedia}>Media</button>
    </div>
  );
}
SendMediaDisplay.propTypes = {
  sender: PropTypes.string.isRequired,
  receiver: PropTypes.string.isRequired,
  sendMessage: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SendMediaDisplay;

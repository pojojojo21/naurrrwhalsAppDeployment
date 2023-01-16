import React from 'react';
import '../assets/popup.css';

function PopUp(props) {
  const prop = props;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <div className="v-popup-box">
        <div className="v-box">
          {prop.content}
          <button data-testid="pop-close-test" type="button" className="v-close-btn" onClick={prop.handleClose}>{prop.closetext}</button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;

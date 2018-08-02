import React from 'react';
import styles from './SuccessMsg.css';

const SuccessMsg = (props) => {
  const { setNextStage } = props;
  return (
    <div className={styles.requestedMessageContainer} id="requested-message-container">
      <h1>
        {'Your request was succesfully submitted!!'}
      </h1>
      <h2>
        The host will contact you shortly
      </h2>
      <button onClick={() => setNextStage(0)} id="close-success-msg-btn" type="button">
        Close
      </button>
    </div>
  );
};

export default SuccessMsg;

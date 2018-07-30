import React from 'react';
import PropTypes from 'prop-types';
import styles from './Price.css';
import question from '../../styles/icons/question.svg';

const Pricing = (props) => {
  const {
    requestedDates,
    price,
    serviceFee,
    cleaningFee,
    toggleInfo,
    showPopUpInfo,
  } = props;
  const nightsRequested = (requestedDates[1].getTime() - requestedDates[0].getTime()) / 86400000;
  const initialPrice = price * nightsRequested;
  const totalServiceFee = serviceFee * nightsRequested;
  const tax = Math.floor((initialPrice + totalServiceFee + cleaningFee) * 0.15);
  const numToString = function (num) {
    const str = num.toString().split('');
    if (str.length > 3) {
      str.splice(str.length - 3, 0, ',');
    }
    return str.join('');
  };

  const renderPopUp = function (popUpId) {
    const text = [
      'One-time fee charged by host to cover the cost of cleaning their space.',
      'This helps us run our platform and offer services like 24/7 support on your trip.',
      'Accommodations Tax (San Francisco)',
    ];

    const classes = [
      styles.cleaningFeePopUp,
      styles.serviceFeePopUp,
      styles.taxesPopUp,
    ];

    return (
      <div className={classes[popUpId - 1]}>
        <p
          className={`${styles.closeBtn} close-btn`} 
          style={{float: 'right', cursor: 'pointer'}}
          onClick={() => toggleInfo(0)}
        >x</p>
        <p className={styles.popUpText} id="pop-up-text" style={{ marginTop: '25px' }}>
          {text[popUpId - 1]}
        </p>
      </div>
    );
  };

  return (
    <div className={`${styles.bookingInfo} booking-info`}>
      <div className={styles.pricingInfoEntry}>
        <p>
          {`$${price} x ${nightsRequested} nights`}
        </p>
        <p>
          {`$${numToString(initialPrice)}`}
        </p>
      </div>
      <hr />
      <div className={styles.pricingInfoEntry}>
        <p>
          Cleaning Fee
          <img 
            className={`${styles.smallIcon} small-icon`} 
            src={question}
            onClick={() => toggleInfo(1)}
            alt="close"
          />
        </p>
        <p>
          {`$${cleaningFee}`}
        </p>
      </div>
      <hr />
      <div className={styles.pricingInfoEntry}>
        <p>
          Service Fee
          <img
          className={`${styles.smallIcon} small-icon`} 
          src={question}
          onClick={() => toggleInfo(2)}/></p>
        <p>
          {`$${totalServiceFee}`}
        </p>
      </div>
      <hr />
      <div className={styles.pricingInfoEntry}>
        <p>
          Occupancy Taxes and Fees
          <img
            className={`${styles.smallIcon} small-icon`} 
            src={question}
            onClick={() => toggleInfo(3)}
          />
        </p>
        <p>
          {`$${tax}`}
        </p>
      </div>
      <hr />
      <div className={styles.pricingInfoEntry}>
        <p className={styles.price}>
          Total
        </p>
        <p className={styles.price}>
          {`$${numToString(initialPrice + totalServiceFee + tax + cleaningFee)}`}
        </p>
      </div>
      {showPopUpInfo === 0 || renderPopUp(showPopUpInfo)}
    </div>
  );
};

Pricing.propTypes = {
  price: PropTypes.number.isRequired,
  serviceFee: PropTypes.number.isRequired,
  cleaningFee: PropTypes.number.isRequired,
  toggleInfo: PropTypes.func.isRequired,
};

export default Pricing;

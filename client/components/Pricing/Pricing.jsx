import React from 'react';
import question from '../../styles/icons/question.svg';

const Pricing = (props) => {
  const nightsRequested = props.requestedDates[1].getDate() - props.requestedDates[0].getDate();
  const initialPrice = props.price * nightsRequested;
  const serviceFee = props.serviceFee * nightsRequested;
  const tax = Math.floor((initialPrice + serviceFee + props.cleaningFee) * 0.15);
  
  const numToString = function (num) {
    num = num.toString().split('');
    if (num.length > 3) {
      num.splice(num.length - 3, 0, ',');
    }
    return num.join('');
  };

  const renderPopUp = function(popUpId) {
    const text = [
      'One-time fee charged by host to cover the cost of cleaning their space.',
      'This helps us run our platform and offer services like 24/7 support on your trip.',
      'Accommodations Tax (San Francisco)',
    ];

    const ids = [
      'cleaning-fee-pop-up',
      'service-fee-pop-up',
      'taxes-pop-up',
    ];

    return (
      <div id={ids[popUpId - 1]}>
        <p 
          id="close-btn" 
          style={{float: 'right', cursor: 'pointer'}}
          onClick={() => props.toggleInfo(0)}
        >x</p>
        <p id="pop-up-text" style={{marginTop: '25px'}}>{text[popUpId - 1]}</p>
      </div>
    );
  };

  return (
    <div id="booking-info">
      <div className="pricing-info-entry">
        <p>{`$${props.price} x ${nightsRequested} nights`}</p>
        <p>{`$${numToString(initialPrice)}`}</p>
      </div>
      <hr />
      <div className="pricing-info-entry">
        <p>Cleaning Fee<img 
          className="small-icon" 
          src={question}
          onClick={() => props.toggleInfo(1)}/></p>
        <p>{`$${props.cleaningFee}`}</p>
      </div>
      <hr />
      <div className="pricing-info-entry">
        <p>Service Fee<img 
          className="small-icon" 
          src={question}
          onClick={() => props.toggleInfo(2)}/></p>
        <p>{`$${serviceFee}`}</p>
      </div>
      <hr />
      <div className="pricing-info-entry">
        <p>Occupancy Taxes and Fees<img 
          className="small-icon" 
          src={question}
          onClick={() => props.toggleInfo(3)}
        /></p>
        <p>{`$${tax}`}</p>
      </div>
      <hr />
      <div className="pricing-info-entry">
        <p>Total</p>
        <p>{`$${numToString(initialPrice + serviceFee + tax + props.cleaningFee)}`}</p>
      </div>
      {props.showPopUpInfo === 0 || renderPopUp(props.showPopUpInfo)}
    </div>
  );
};

export default Pricing;

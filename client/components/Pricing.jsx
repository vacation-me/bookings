import React from 'react';
import question from '../styles/icons/question.svg';

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

  

  return (
    <div id="booking-info">
      <div className="pricing-info-entry">
        <p>{`$${props.price} x ${nightsRequested} nights`}</p>
        <p>{`$${numToString(initialPrice)}`}</p>
      </div>
      <hr />
      <div className="pricing-info-entry">
        <p>Cleaning Fee<img className="small-icon" src={question}/></p>
        <p>{`$${props.cleaningFee}`}</p>
      </div>
      <hr />
      <div className="pricing-info-entry">
        <p>Service Fee<img className="small-icon" src={question}/></p>
        <p>{`$${serviceFee}`}</p>
      </div>
      <hr />
      <div className="pricing-info-entry">
        <p>Occupancy Taxes and Fees<img className="small-icon" src={question}/></p>
        <p>{`$${tax}`}</p>
      </div>
      <hr />
      <div className="pricing-info-entry">
        <p>Total</p>
        <p>{`$${numToString(initialPrice + serviceFee + tax + props.cleaningFee)}`}</p>
      </div>
    </div>
  );
};

export default Pricing;

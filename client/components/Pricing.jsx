import React from 'react';
import question from '../styles/icons/question.svg';


const Pricing = (props) => {
  return (
    <div id="booking-info">
      <p className="info-left">{`$${props.price} x ${props.requestedDates[1].getDate() - props.requestedDates[0].getDate()} nights`}</p>
      <hr />
      <p className="info-left">Service Fee<img className="small-icon" src={question}/></p>
    </div>
  );
};

export default Pricing;

import React from 'react';
import plus from '../styles/icons/plus.svg';
import minus from '../styles/icons/minus.svg';

const Guests = (props) => {
  return (
    <div id="guest-toggle">
      <div id="adult-guest-toggle">
        <h3>Adults</h3>
        <img src={minus} className="icon"/>
        <h3>{props.guestCount.adults}</h3>
        <img src={plus} className="icon"/>
      </div>
      <div id="child-guest-toggle">
        <h3>Children</h3>
        <img src={minus} className="icon"/>
        <h3>{props.guestCount.children}</h3>
        <img src={plus} className="icon"/>
      </div>
      <div id="infant-guest-toggle">
        <h3>Infants</h3>
        <img src={minus} className="icon"/>
        <h3>{props.guestCount.infants}</h3>
        <img src={plus} className="icon"/>
      </div>
      
    </div>
  );
};

export default Guests;
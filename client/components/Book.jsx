import React, { Component } from 'react';
import icon from '../styles/icons/right_arrow.png';

const Book = (props) => {
  
  return (
    <div id="bookings">
      <h3>{`$${props.price} per night`}</h3>
      <hr />
      <div id="select-dates">
        <h3>Check-in</h3>
        <img className="icon" src={icon}/>
        <h3>Check-out</h3>
      </div>
    </div> 
  );
};

export default Book;
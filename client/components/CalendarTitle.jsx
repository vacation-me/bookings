import React from 'react';
import rightArrow from '../styles/icons/right_arrow.svg';


const CalendarTitle = (props) => {
  return (
    <div className="sub-component">
      {props.renderTitle(0)}
      <img className="icon" src={rightArrow} />
      {props.renderTitle(1)}
    </div>
  );
};

export default CalendarTitle;
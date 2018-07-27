import React from 'react';
import rightArrow from '../../styles/icons/right_arrow.svg';


const CalendarTitle = (props) => {
  const { renderTitle } = props;
  return (
    <div className="sub-component">
      {renderTitle(0)}
      <img className="icon" src={rightArrow} alt="arrow-icon" />
      {renderTitle(1)}
    </div>
  );
};

export default CalendarTitle;

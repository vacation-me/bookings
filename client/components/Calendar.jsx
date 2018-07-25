import React from 'react';
import left from '../styles/icons/cal_left.svg';
import right from '../styles/icons/cal_right.svg';


const Calendar = (props) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const baseMatrix = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  const monthFirstDay = new Date(props.year, props.month, 1);
  const monthLastDay = new Date(props.year, props.month + 1, 0);
  const currentMonth = new Date().getMonth();

  const bookingsMonthIndex = props.month < currentMonth ? currentMonth + props.month : props.month - currentMonth;
  let bookedDates = props.bookedDates[bookingsMonthIndex].slice().sort((a, b) => b - a);
  //declare counter to fill table with dates
  let dateCounter = 1;
  
  const renderDateCell = function (currentCell) {
    if (dateCounter > monthLastDay.getDate()) {
      return null;
    }
    const currentCellDate = new Date(props.year, props.month, dateCounter);

    // abstract className conditions to helper function

    let classNames = '';
    let clickHandler = (e) => props.selectDate(+e.target.innerHTML);
    if (currentCell === 0) {
      classNames += 'day ';
    } 
    if ((props.requestedDates[0] !== undefined && props.requestedDates[0].toDateString() === currentCellDate.toDateString()) || (props.requestedDates[1] !== undefined && props.requestedDates[1].toDateString() === currentCellDate.toDateString())) {
      classNames += 'selected-date ';
    } else if (props.requestedDates.length === 2 && currentCellDate > props.requestedDates[0] && currentCellDate < props.requestedDates[1]) {
      classNames += 'range ';
    } 
    if (dateCounter === bookedDates[bookedDates.length - 1]) {
      classNames += 'booked ';
      clickHandler = null; 
      bookedDates.pop();
    }
    return (
      <td 
        className={classNames}
        onClick={clickHandler}>
        {currentCell === '' ? '' : dateCounter++}
      </td>
    );
  };

  //assign first values of matrix to empty value (for proper alignment)
  for (let i = 0; i < monthFirstDay.getDay(); i++) {
    baseMatrix[0][i] = '';
  }

  
  return (
    <div id='cal-container'>
      <div id="calendar-title">
        <img src={left} className='cal-title icon' id="prev-month" onClick={() => props.changeMonth(-1)}/>
        <h3 className='cal-title'>{`${months[monthFirstDay.getMonth()]} ${props.year}`}</h3>
        <img src={right} className='cal-title icon' id="next-month" onClick={() => props.changeMonth(1)}/>
      </div>
      <table id="calendar">
        <tbody>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tues</th>
            <th>Wed</th>
            <th>Thur</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
          {baseMatrix.map((week, idx) => (
            <tr key={`week${idx}`}>
              {week.map(renderDateCell)}
            </tr> 
          ))}
        </tbody>
      </table>
      <p onClick={props.clearDates} style={{color: 'rgb(0, 166, 153)'}}>Clear Dates</p>
    </div>
  );
};

export default Calendar;

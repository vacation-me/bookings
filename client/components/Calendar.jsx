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

  const first = new Date(props.year, props.month, 1);
  const last = new Date(props.year, props.month + 1, 0);
  const currentMonth = props.currentDate.getMonth();
  const bookingsIndex = props.month < currentMonth ? currentMonth + props.month : props.month - currentMonth;
  let bookedDates = props.bookedDates[bookingsIndex].slice().sort((a, b) => b - a);
  //declare counter to fill table with dates
  let dateCounter = 1;
  
  const renderDateCell = function (currentCell) {
    if (dateCounter > last.getDate()) {
      return null;
    }
    const currentCellDate = new Date(props.year, props.month, dateCounter);
    let classNames = '';
    let key = 'dateCell';
    let nullCount = 0;
    let array = [1,2,3,4,5];
    let clickHandler = (e) => props.handleSelect(e, 'click');
    if (currentCell === 0) {
      classNames += 'day ';
      key += dateCounter;
    } else if (currentCell === '') {
      key = `null${nullCount++}`;
    }
    if ((props.range[0] !== undefined && props.range[0].toDateString() === currentCellDate.toDateString()) || (props.range[1] !== undefined && props.range[1].toDateString() === currentCellDate.toDateString())) {
      classNames += 'selected-date ';
    } else if (props.range.length === 2 && currentCellDate > props.range[0] && currentCellDate < props.range[1]) {
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
        onClick={clickHandler}
        onMouseOver={(e) => props.handleMouseOver(e.target.innerHTML, 'mouseOver')}
        key={key}>
        {currentCell === '' ? '' : dateCounter++}
      </td>
    );
  };

  //assign first values of matrix to empty value (for proper alignment)
  for (let i = 0; i < first.getDay(); i++) {
    baseMatrix[0][i] = '';
  }

  
  return (
    <div id='cal-container'>
      <div id="calendar-title">
        <img src={left} className='cal-title icon' onClick={() => props.handleCalendar(-1)}/>
        <h3 className='cal-title'>{`${months[first.getMonth()]} ${props.year}`}</h3>
        <img src={right} className='cal-title icon' onClick={() => props.handleCalendar(1)}/>
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

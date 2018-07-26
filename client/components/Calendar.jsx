import React from 'react';
import left from '../styles/icons/cal_left.svg';
import right from '../styles/icons/cal_right.svg';
import { PromiseProvider } from 'mongoose';


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
  let currentDateNum = 1;

  //return a tuple defining a date cell's attributes >>> [classNames, clickhandler, cellValue]
  const getAttributes = function (currentCellData) {
    //check if date is invalid (cellData = '')
    if (currentCellData === '') {
      return ['', null, ''];
    }
    let isSelectingCheckout = false;
    let minStayDate;

    if (props.requestedDates.length === 1) {
      minStayDate = new Date(props.requestedDates[0].getTime() + (props.minStay * 86400000));
      isSelectingCheckout = true;
    }
    const cellDate = new Date(props.year, props.month, currentDateNum);


    let attributes = [
      //className
      'day',
      //clickHandler
      null,
      //cellValue
      currentDateNum,
    ];

    //check if date is selected
    if ((props.requestedDates.length >= 1 && props.requestedDates[0].getTime() === cellDate.getTime())
      || (props.requestedDates.length === 2 && props.requestedDates[1].getTime() === cellDate.getTime())) {
      attributes[0] += ' selected-date'; 
    //check if date is within range of selected dates
    } else if (props.requestedDates.length === 2 && cellDate > props.requestedDates[0] && cellDate < props.requestedDates[1]) {
      attributes[0] += ' range';
    //check if date is booked
    } else if (isSelectingCheckout && cellDate.getTime() < minStayDate.getTime()) {
      attributes[0] = ' booked';
    } else if (currentDateNum === bookedDates[bookedDates.length - 1] && !isSelectingCheckout) {
      attributes[0] += ' booked';
      bookedDates.pop();
    } else {
      attributes[0] += ' avail';
      attributes[1] = (e) => props.selectDate(+e.target.innerHTML);
    }
    
    currentDateNum++;
    return attributes;




    /* const currentCellDate = new Date(props.year, props.month, dateCounter);

    // abstract className conditions to helper function

    let classNames = '';
    let id = '';
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
    } */
  };
  
  const renderDateCell = function (currentCell) {
    if (currentDateNum > monthLastDay.getDate()) {
      return null;
    }

    const attributes = getAttributes(currentCell);

    return (
      <td 
        className={attributes[0]}
        onClick={attributes[1]}>
        {attributes[2]}
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

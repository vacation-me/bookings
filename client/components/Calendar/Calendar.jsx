import React from 'react';
import PropTypes from 'prop-types';
import left from '../../styles/icons/cal_left.svg';
import right from '../../styles/icons/cal_right.svg';


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

  const {
    year,
    month,
    availableDates,
    minStay,
    selectDate,
    requestedDates,
    clearDates,
  } = props;

  const monthFirstDay = new Date(year, month, 1);
  const monthLastDay = new Date(year, month + 1, 0);
  const currentMonth = new Date().getMonth();

  const bookingsMonthIndex = month < currentMonth ? currentMonth + month : month - currentMonth;
  const currentAvailableDates = [...availableDates[bookingsMonthIndex]];
  // declare counter to fill table with dates
  let currentDateNum = 1;

  // return a tuple defining a date cell's attributes >>> [classNames, clickhandler, cellValue]
  const getAttributes = function (currentCellData) {
    // check if date is invalid (cellData = '')
    if (currentCellData === '') {
      return ['', null, ''];
    }
    let isSelectingCheckout = false;
    let minStayDate;

    if (requestedDates.length === 1) {
      minStayDate = new Date(requestedDates[0].getTime() + (minStay * 86400000));
      isSelectingCheckout = true;
    }
    const cellDate = new Date(year, month, currentDateNum);
    const validDateClickHandler = e => selectDate(+e.target.innerHTML);

    const attributes = [
      // className
      'day',
      // clickHandler
      null,
      // cellValue
      currentDateNum,
    ];

    // check if date is selected
    if ((requestedDates.length >= 1
        && requestedDates[0].getTime() === cellDate.getTime())
      || (requestedDates.length === 2
        && requestedDates[1].getTime() === cellDate.getTime())) {
      attributes[0] += ' selected-date';
    // check if date is within range of selected dates
    } else if (requestedDates.length === 2
      && cellDate > requestedDates[0]
      && cellDate < requestedDates[1]) {
      attributes[0] += ' range';
    // check if date is booked
    } else if (isSelectingCheckout) {
      if (cellDate.getTime() < minStayDate.getTime()) {
        attributes[0] += ' booked';
      } else {
        attributes[0] += ' avail';
        attributes[1] = validDateClickHandler;
      }
    } else if (currentDateNum === currentAvailableDates[currentAvailableDates.length - 1]
      && !isSelectingCheckout) {
      attributes[0] += ' avail';
      attributes[1] = validDateClickHandler;
      currentAvailableDates.pop();
    } else {
      attributes[0] += ' booked';
    }
    currentDateNum += 1;
    return attributes;
  };

  const renderDateCell = function (currentCell) {
    if (currentDateNum > monthLastDay.getDate()) {
      return null;
    }

    const attributes = getAttributes(currentCell);

    return (
      <td 
        key={`cell${cellKeyCount++}`}
        className={attributes[0]}
        onClick={attributes[1]}>
        {attributes[2]}
      </td>
    );
  };

  // assign first values of matrix to empty value (for proper alignment)
  for (let i = 0; i < monthFirstDay.getDay(); i += 1) {
    baseMatrix[0][i] = '';
  }
  let cellKeyCount = 0;
  let weekKeyCount = 0;
  return (
    <div id="cal-container">
      <div id="calendar-title">
        <img src={left} className='cal-title icon' id="prev-month" onClick={() => props.changeMonth(-1)}/>
        <h3 className="cal-title">{`${months[monthFirstDay.getMonth()]} ${props.year}`}</h3>
        <img src={right} className='cal-title icon' id="next-month" onClick={() => props.changeMonth(1)}/>
      </div>
      <table id="calendar">
        <tbody>
          <tr>
            <th>
              Sun
            </th>
            <th>
              Mon
            </th>
            <th>
              Tues
            </th>
            <th>
              Wed
            </th>
            <th>
              Thur
            </th>
            <th>
              Fri
            </th>
            <th>
              Sat
            </th>
          </tr>
          {baseMatrix.map(week => (
            <tr key={`week${weekKeyCount++}`}>
              {week.map(cell => renderDateCell(cell))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={clearDates} style={{ fontFamily: 'Lato-Regular' }} type="button">
        Clear Dates
      </button>
    </div>
  );
};

Calendar.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  availableDates: PropTypes.array,
  minStay: PropTypes.number.isRequired,
  selectDate: PropTypes.func.isRequired,
  clearDates: PropTypes.func.isRequired,
  requestedDates: PropTypes.array,
};

export default Calendar;

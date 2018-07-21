import React from 'react';
import left from '../styles/icons/cal_left.svg';
import right from '../styles/icons/cal_right.svg';


const Calendar = (props) => {
  // store month names for retrieval based on an index
  const months = ['Januray', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // create template for month
  const baseMatrix = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  // get data for first day of current month
  const first = new Date(props.year, props.month, 1);
  
  //get data for last day of current month
  const last = new Date(props.year, props.month + 1, 0);

  //assign first values of matrix to empty value (for proper alignment)
  for (let i = 0; i < first.getDay(); i++) {
    baseMatrix[0][i] = '';
  }

  //declare counter to fill table with dates
  let dateCounter = 1;
  
  return (
    <div id={'cal-container'} className={`${props.checkIn === 'out' ? 'check-out' : ''}`}>
      <div id="calendar-title">
        <img src={left} className='cal-title icon' id="prev" onClick={(e) => props.click(-1)}/>
        <h3 className='cal-title'>{`${months[first.getMonth()]} ${props.year}`}</h3>
        <img src={right} className='cal-title icon' id="next" onClick={(e) => props.click(1)}/>
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
            /// map each week (subArray) to a table row 
            <tr key={`week${idx}`}>
              {week.map((day) => ( dateCounter > last.getDate() ? null : 
                // assign 'day' class to any valid table cell  /  assign selected-date to todays date or selected / render empty cell for invalid dates
                <td className={`${day === '' ? '' : 'day'} ${dateCounter === props.date ? 'selected-date' : ''}`}>
                  {day === '' ? day : dateCounter++}
                </td>
              ))}
            </tr> 
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
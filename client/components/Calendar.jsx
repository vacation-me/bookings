import React from 'react';


const Calendar = (props) => {
  //store month names for retrieval based on an index
  const months = ['Januray', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  //declare base matrix
  let baseMatrix = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  //get date of first of month from current
  let first = selected.getDay();
  for (let i = 0; i < first; i++) {
    baseMatrix[0][i] = '';
  }

  for (let i = baseMatrix[4].length - 1; i >= first; i--) {
    baseMatrix[4][i] = '';
  }
  
  let dateCounter = 1;
  return (
    <div id="cal-container">
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
            <tr>
              {week.map((day) => {
                // map each day (subArray value) to a table cell
                if (dateCounter > last.getDate()) {
                  //return null if current date to be rendered is greater than the last day of the current month
                  return null;
                }
                return ( 
                  // assign 'day' class to any valid table cell  /  assign selected-date to todays date or selected / render empty cell for invalid dates
                  <td className={`${day === '' ? '' : 'day'} ${dateCounter === props.date ? 'selected-date' : ''}`}>{day === '' ? day : dateCounter++}</td>
                );
              })}
            </tr> 
          ))}
        </tbody>
      </table>
      <button id="prev" onClick={(e) => props.click(-1)}>Prev</button>
      <button id="next" onClick={(e) => props.click(1)}>Next</button>
    </div>
  );
};

export default Calendar;
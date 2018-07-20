import React from 'react';


const Calendar = (props) => {
  //store month names for retrieval based on an index
  const months = ['Januray', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  //create template for month
  let baseMatrix = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  //get data for first day of current month
  let first = new Date(props.year, props.month, 1);
  //get data for last day of current month
  let last = new Date(props.year, props.month + 1, 0);

  //assign first values of matrix to empty value (for proper alignment)
  for (let i = 0; i < first.getDay(); i++) {
    baseMatrix[0][i] = '';
  }



  //declare counter to fill table with dates
  let dateCounter = 1;
  
  return (
    <div id="cal-container">
      <div id="calendar-title">
        <button className='cal-title' id="prev" onClick={(e) => props.click(-1)}>Prev</button>
        <h3 className='cal-title'>{`${months[first.getMonth()]} ${props.year}`}</h3>
        <button className='cal-title' id="next" onClick={(e) => props.click(1)}>Next</button>
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
    </div>
  );
};

export default Calendar;
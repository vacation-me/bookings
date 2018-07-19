import React from 'react';


const Calendar = (props) => {
  //create date object based on user selected month
  let selected = new Date(props.year, props.month, 1);
  
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
            <tr className={/* idx === 0 ? 'top-row' :  */''}>
              {week.map((day, i) => {
                if (idx === 0 && i === 0) {
                }
                return ( 
                  <td>{day === '' ? day : dateCounter++}</td>
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
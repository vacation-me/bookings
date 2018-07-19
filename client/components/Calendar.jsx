import React from 'react';


const Calendar = (props) => {
  //create date object based on user selected month
  let months = ['Januray', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  //declare base matrix
  let baseMatrix = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  //get date of first of month from current
  let first = new Date(props.year, props.month, 1);
  let last = new Date(props.year, props.month + 1, 0);
  for (let i = 0; i < first.getDay(); i++) {
    baseMatrix[0][i] = '';
  }



  
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
            <tr>
              {week.map((day) => {
                if (dateCounter > last.getDate()) {
                  return null;
                }
                return ( 
                  <td className={day === '' ? '' : 'day'}>{day === '' ? day : dateCounter++}</td>
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
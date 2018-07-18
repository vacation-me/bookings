const db = require('./index');

/*-------- generates 100 records of dummy calendar availability data--------*/

/* Example:

Each document represents a year of availability data, each sub array of the year property represents a month

year: [
  [jan],  -->  [1, 2, 3, 7, 9, 10, 16, 12]
  [feb],        each month generates a random number of booked dates...
  [mar],        ...based on the number of days in that month
  [apr],  
  [may],
  [june],
  [july],
  [august],
  [sept],
  [oct],
  [nov],
  [dec]
]
*/

//generate a random number between 1 and a given number
const randomNumberGenerator = function(num) {
  return Math.ceil(Math.random() * num);
}

//generates a single month of availability based on that month's length
const generateDates = function(monthLength) {
  //generate a random number between 1 and the length of the month
  let length = randomNumberGenerator(monthLength);
  //declare storage object
  let store = {};
  //declare output array
  let output = [];
  //while output array length is less than determined number of dates to book for the month
  while (output.length < length) {
    //generate a random number (date)
    let newNum = randomNumberGenerator(monthLength);
    //check if number has been used (by checking storage object)
    if (!store[newNum]) {
      //push num to output array
      output.push(newNum);
      //store num in storage object
      store[newNum] = true;
    }
  }
  return output;
}

//stores the length of each month jan-dec
const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//generate a year of calendar data (array of 12 subArrays)
const yearGenerator = function() {
  let output = [];
  for (let i = 0; i < monthLengths.length; i++) {
    output.push(generateDates(monthLengths[i]));
  }
  return output;
}


//generates and saves to db, 100 documents
const calendarGenerator = function(num = 100) {
  for (let j = 0; j <= num; j++) {
    //create record from model defined in index.js 
    var year = new db.Calendar({
      id: j,
      year: yearGenerator()
    });
    //save document to db
    year.save();
  }
}

module.exports = calendarGenerator;

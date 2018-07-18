const db = require('./index');

//create 100 dummy records of availability data

/* 

year: [
  [jan],->[1, 2, 3, 7, 9, 10, 16, 12] -> max days for each month
  [feb],  create array of days for each month
  [mar], [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
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

forEach month
  generate a random number of days to fill for that month
  create an empty array of that length
  generate random, uniq indexes to populate each array index
*/
const randomNumberGenerator = function(num) {
  return Math.ceil(Math.random() * num);
}

const generateDates = function(max) {
  //generate a random number
  let length = randomNumberGenerator(max);
  //declare storage object
  let store = {};
  //declare output array
  let output = [];
  //while output array length is less than random number
  while (output.length < length) {
    //generate a random number
    let newNum = randomNumberGenerator(max);
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

const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const yearGenerator = function() {
  let output = [];
  for (let i = 0; i < monthLengths.length; i++) {
    output.push(generateDates(monthLengths[i]));
  }
  return output;
}

const calendarGenerator = function() {
  for (let j = 0; j <= 100; j++) {
    var year = new db.Calendar({
      year: yearGenerator()
    });

    year.save();
  }
}

yearGenerator();//?

module.exports = calendarGenerator;

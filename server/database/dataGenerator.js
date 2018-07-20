const db = require('./index');

//clear db
db.remove({}, (err) => {
  if (err) {
    throw err;
  }
});

//generate a random number between 0 and a given number
const random = function(num) {
  return Math.ceil(Math.random() * num);
};

//generate a price ($100 - 500)
const price = function() { 
  return 500 - random(400);
};

//generate a cleaning fee [50, 75, 100, 125, 150]
const cleaning = function() {
  let options = [50, 75, 100, 125, 150];
  return options[random(4)];
};

//generate a service fee (0% - 20% of price)
const serviceFee = function(price) {
  let percent = random(20) / 100;
  return Math.ceil(price * percent);
};

//generate a year of availability info based on the current date
const bookingsGen = function() {
  //declare output array
  let bookings = [];
  //store current date info
  let startDate = new Date();
  //declare counter to track the current month through each iteration
  let monthCounter = startDate.getMonth();
  //generate 12 months of availability from the provided start date
  for (let i = 0; i < 12; i++) {
    let year = startDate.getFullYear();
    let last = new Date(year, monthCounter + 1, 0).getDate();
    //declare output array
    let month = [];
    //generate random number of dates to fill (20-70% of month length)
    let dates = Math.ceil(last * random(70) / 100);
    if (dates < 10) {
      dates += 10;
    }
    //declare storage object to ensure no duplicate dates
    let store = {};
    //begin loop using random number create previously
    for (let i = 0; i < dates; i++) {
      let day = random(last);
      //check if number is stored in number store
      if (!store[day]) {
        //push to output
        month.push(day);
        //add to num store
        store[day] = true;
      }
    }
    //push month to output
    bookings.push(month);
    //increment month, checking first to start a new year
    if (monthCounter === 11) {
      monthCounter = 0;
      year++;
    } else {
      monthCounter++;
    }
    //set a new month
    startDate = new Date(year, monthCounter, 1);
  }
  return bookings;
};

const generator = function() { 
  for (let i = 0; i < 100; i++) {
    let nightlyPrice = price();
    new db({
      id: i,
      price: nightlyPrice,
      cleaning: cleaning(),
      serviceFee: serviceFee(nightlyPrice),
      minStay: random(6),
      maxGuests: random(10),
      year: bookingsGen(),
    }).save(process.exit);
  }
};

generator();






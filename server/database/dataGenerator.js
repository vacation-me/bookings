const db = require('./index');

db.remove({}, (err) => {
  if (err) {
    throw err;
  }
});

const random = function(num) {
  return Math.ceil(Math.random() * num);
};

const price = function() { 
  return 500 - random(400);
};

const cleaning = function() {
  let options = [50, 75, 100, 125, 150];
  return options[random(4)];
};

const serviceFee = function(price) {
  let percent = random(20) / 100;
  return Math.ceil(price * percent);
};

//generate a year of availability info based on the current date
const generateBookings = function() {
  let bookings = [];
  let startDate = new Date();
  let currentMonth = startDate.getMonth();
  let year = startDate.getFullYear();

  for (let i = 0; i < 12; i++) {
    let last = new Date(year, currentMonth + 1, 0).getDate();
    let month = [];
    let dateCount = Math.ceil(last * random(70) / 100);
    if (dateCount < 10) {
      dateCount += 10;
    }
    let store = {};
    for (let i = 0; i < dates; i++) {
      let day = random(last);
      if (!store[day]) {
        month.push(day);
        store[day] = true;
      }
    }
    bookings.push(month);
    if (currentMonth === 11) {
      currentMonth = 0;
      year++;
    } else {
      currentMonth++;
    }
    currentDate = new Date(year, currentMonth, 1);
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
      year: generateBookings(),
    }).save(process.exit);
  }
};

generator();






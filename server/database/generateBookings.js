const {
  minStay,
} = require('./calc.js');

const generateBookings = (index) => {
  const start = new Date();
  const end = new Date(2018, 12, 1);
  for (let i = 1; i <= 10; i++) {
    const date = new Date(+start + Math.random() * (end - start));
    console.log(`${((index-1)*10)+i},${index},${date.toJSON()},${minStay()}`);
  }
};

const max = 1000000;

for (let i = 1; i <= max; i++) {
  // generateBookings(i);
  generateBookings((process.argv[2]*max)+i);
}


// const generateBookings = function () {
//     const bookings = [];
//     const startDate = new Date();
//     let currentMonth = startDate.getMonth();
//     let year = startDate.getFullYear();
//     for (let i = 0; i < 12; i++) {
//       const last = new Date(year, currentMonth + 1, 0).getDate();
//       const month = [];
//       const dateCount = 15 - random(10);
//       const store = {};
//       for (let j = 0; j < dateCount; j++) {
//         const day = random(last);
//         if (!store[day]) {
//           month.push(day);
//           store[day] = true;
//         }
//       }
//       month.sort((a, b) => b - a);
//       bookings.push(month);
//       if (currentMonth === 11) {
//         currentMonth = 0;
//         year++;
//       } else {
//         currentMonth++;
//       }
//       currentDate = new Date(year, currentMonth, 1);
//     }
//     return bookings;
//   };
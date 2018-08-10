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

// Shell Script
//  rm bookings.csv | time for i in {0..9}; do node --max-old-space-size=8192 generateBookings ${i} | cat >> bookings.csv; done

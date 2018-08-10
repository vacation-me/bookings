const {
  price,
  cleaningFee,
  serviceFeePercent,
  minStay,
  maxGuests,
} = require('./calc.js');

// console.log('id,price,cleaning_fee,service_fee_percent,min_stay,max_guests');
for (let i = 1; i <= 10000000; i++) console.log(`${i},${price()},${cleaningFee()},${serviceFeePercent()},${minStay()},${maxGuests()}`);

const {
  random,
  price,
  cleaningFee,
  serviceFeePercent,
  minStay,
  maxGuests,
} = require('./calc.js');

const faker = require('faker');


const max = 10000;
const start = new Date();
const end = new Date(2018, 12, 1);

const generateBookings = (mS) => {
  const date = new Date(+start + Math.random() * (end - start));
  // let bookings = '[';
  // for (let j = 1; j <= 10; j++) {
  //   bookings += `['${j}','${date.toJSON()}','${random(mS, mS + 5)}']`;
  //   bookings += (j === 10) ? ']' : ',';
  // }
  // return bookings;
  return `${faker.random.uuid()}|'${date.toJSON()}'|${random(mS, mS + 5)}`;
};

for (let i = 1; i <= max; i++) {
  // generateBookings(i);
  const id = (process.argv[2] * max) + i;
  const mS = minStay();
  for (let j = 1; j <= 10; j++) {
    console.log(`${id}|${price()}|${cleaningFee()}|${serviceFeePercent()}|${mS}|${maxGuests()}|${generateBookings(mS)}`);
  }
}

// Shell Script
// rm ./server/database/cassandraDB.csv; time for i in {0..999}; do node --max-old-space-size=8192 ./server/database/generateCassandraDB.js ${i} | cat >> ./server/database/cassandraDB.csv; done

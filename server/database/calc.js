const random = (start, end) => Math.floor(Math.random() * (end - start + 1)) + start;

const price = () => random(100, 500);

const cleaningFee = () => random(10, 40) * 5;

const serviceFeePercent = () => random(20, 40) / 200;

const minStay = () => random(2, 9);

const maxGuests = () => random(2, 10);


module.exports = {
  random,
  price,
  cleaningFee,
  serviceFeePercent,
  minStay,
  maxGuests,
};

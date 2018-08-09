const random = (start, end) => Math.floor(Math.random() * (end - start + 1)) + start;

const price = () => random(100, 500);

const cleaningFee = () => random(10, 40) * 5;

const serviceFeePercent = () => random(20, 40) / 200;

console.log('id, price, cleaningFee, serviceFeePercent, minStay, maxGuests');

for (let i = 1; i <= 10000000; i++) console.log(`${i},${price()},${cleaningFee()},${serviceFeePercent()},${random(2, 9)},${random(2, 10)}`);

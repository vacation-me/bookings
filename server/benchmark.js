const siege = require('siege');
const { random } = require('./database/calc.js');

const randNums = [];

const arrSize = 150000;
for (let i = 0; i < arrSize; i++) {
  randNums.push(random(1, 10000000));
}

let sieger = siege().on(3004);
for (let i = 0; i < randNums.length; i++) {
  sieger = sieger
    .for(1).times
    .get(`/api/listings/${randNums[i]}`);
}

sieger.attack();

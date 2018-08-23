const pgp = require('pg-promise')({});

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'bookings',
  user: 'root',
  password: 'root',
});

db.connect()
  .then((obj) => {
    obj.done();
  })
  .catch((err) => {
    console.log(err);
  });

const getListing = (id, cb) => {
  db.any('SELECT l.*, b.id, b.starting_date, b.days_booked FROM listings l INNER JOIN bookings b ON (l.id = b.listing_id) WHERE l.id = ${id#}', { id })
    .then((data) => {
      const convertedData = {
        price: data[0].price,
        cleaningFee: data[0].cleaning_fee,
        serviceFee: data[0].price * data[0].service_fee_percent,
        minStay: data[0].min_stay,
        maxGuests: data[0].max_guests,
        bookings: [],
      };
      for (let i = 0; i < data.length; i++) {
        convertedData.bookings.push({
          startingDate: data[i].starting_date,
          daysBooked: data[i].days_booked,
        });
      }
      cb(null, convertedData);
    })
    .catch((err) => {
      cb(err);
    });
};

const addListing = (data, cb) => {

};

const addBooking = (id, data, cb) => {

};

const removeListing = (id, cb) => {

};

module.exports = {
  getListing,
  addListing,
  addBooking,
  removeListing,
};

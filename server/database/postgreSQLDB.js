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
  db.any('SELECT l.*, b.id, b.starting_date, b.days_booked FROM listings l INNER JOIN bookings b ON (l.id = b.listing_id) WHERE l.id = ${id#}', { id:id })
    .then((data) => {
      cb(data);
    })
    .catch((err) => {
      console.log(err);
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

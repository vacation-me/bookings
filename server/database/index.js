const mongoose = require('mongoose');

mongoose.connect('mongodb://database:27017/listings', { useNewUrlParser: true });
const { Schema } = mongoose;

const listingSchema = new Schema({
  id: Number,
  price: Number,
  cleaningFee: Number,
  serviceFee: Number,
  minStay: Number,
  maxGuests: Number,
  availableDates: [[Number]],
});

const Listing = mongoose.model('Listing', listingSchema);

getListing = (id, cb) => {
  const listingId = id;
  // query Model for that index
  Listing.findOne({ id: listingId }).exec((err, data) => {
    if (err) { throw err; }
    cb(data);
  });
};

addListing = (data, cb) => {
  // placeholder
};

addBooking = (data, cb) => {
  const { checkIn, checkOut, id } = data;
  Listing.findOne({ id }).exec((error, doc) => {
    const { availableDates } = doc;
    const newMonth = availableDates[checkIn.index].filter(date => (
      (date < checkIn.date || date > checkOut.date)
    ));
    availableDates[checkIn.index] = newMonth;
    doc.save((err) => {
      if (err) { throw err; }
      cb(doc);
    });
  });
};

removeListing = (data, cb) => {
  // placeholder
};

module.exports = {
  getListing,
  addListing,
  addBooking,
  removeListing,
};

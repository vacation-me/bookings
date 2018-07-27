const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/listings', { useNewUrlParser: true });
const Schema = mongoose.Schema;

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

module.exports = Listing;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookings');
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  year: [[Number]]
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = {
  calendarSchema,
  Calendar
}
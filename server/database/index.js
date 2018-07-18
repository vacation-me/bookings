const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookings', { useNewUrlParser: true });
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  id: Number,
  year: [[Number]]
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = {
  calendarSchema,
  Calendar,
}
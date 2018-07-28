const express = require('express');

const app = express();
const parser = require('body-parser');
const db = require('./database/index');

app.use(express.static('./public'));

app.use(parser.json());
// app.use(parser.urlencoded({ extended: true }));

// app.get('/', (req, res) => console.log('request received'));

// return a random calendar to client
app.get('/api/listing_info', (req, res) => {
  const index = Math.ceil(Math.random() * 99);
  // query db for that index
  db.findOne({ id: index }).exec((err, data) => {
    if (err) { throw err; }
    res.send(data);
  });
});

app.post('/api/submit', (req, res) => {
  const { checkIn, checkOut, id } = req.body;
  db.findOne({ id }).exec((error, doc) => {
    const { availableDates } = doc;
    const newMonth = availableDates[checkIn.index].filter(date => (
      (date < checkIn.date || date > checkOut.date)
    ));
    availableDates[checkIn.index] = newMonth;
    doc.save((err) => {
      if (err) throw err;
      res.send(doc);
    });
  });
});

module.exports = app;

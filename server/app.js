const express = require('express');

const app = express();
const parser = require('body-parser');
const db = require('./database/index');

app.use(express.static('./public'));

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// app.get('/', (req, res) => console.log('request received'));

// return a random calendar to client
app.get('/api/listing_info', (req, res) => {
  // get a random calendar from db
  // get random index between 1 - 100
  const index = Math.ceil(Math.random() * 99);
  // query db for that index
  db.findOne({ id: index }).exec((err, data) => {
    res.writeHead(err ? 400 : 200);
    res.end(err ? {} : JSON.stringify(data));
  });
});

module.exports = app;

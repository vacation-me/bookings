require('newrelic');
const express = require('express');
const redis = require('redis');
const bluebird = require('bluebird');
const parser = require('body-parser');
// const db = require('./database/mongoDB.js');
const db = require('./database/postgreSQLDB.js');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const app = express();
const client = redis.createClient();

client.on('connect', () => {
  console.log('connected to redis');
});
client.on('error', (err) => {
  console.log(`Error: ${err}`);
});

app.use(express.static('./public'));

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/listing/:listingId', express.static(`${__dirname}/../public`));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET');
  next();
});

// return a random calendar to client
app.get('/api/listings/:listingId',
  (req, res) => {
    const { listingId } = req.params;
    client.get(listingId, (err, data) => {
      if (err) throw err;
      if (data !== null) {
        res.status(200).send(JSON.parse(data));
      } else {
        db.getListing(listingId, (dbdata) => {
          client.setex(listingId, 5, JSON.stringify(dbdata));
          res.status(200).send(dbdata);
        });
      }
    });
  });

app.post('/api/listings/', (req, res) => {
  db.addListing(req.body, () => res.status(201).send());
});

app.put('/api/listings/:listingId', (req, res) => {
  db.addBooking(id, req.body, data => res.status(204).send(data));
});

app.delete('/api/listings/:listingId', (req, res) => {
  db.removeListing(req.params.listingId, () => res.status(204).send());
});

module.exports = app;

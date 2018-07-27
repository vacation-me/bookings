const express = require('express');

const app = express();
const parser = require('body-parser');
const db = require('./database/index');

app.use(express.static('./public'));

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// app.get('/', (req, res) => console.log('request received'));

// return a random calendar to client
app.get('/api/listing_info', (req, resp) => {
  //get a random calendar from db
  //get random index between 1 - 100
  let index = Math.ceil(Math.random() * 99);
  //query db for that index
  db.findOne({id: index}).exec((err, data) => {
    if (err) {
      throw err;
    }
    resp.writeHead(200);
    resp.end(JSON.stringify(data));
  });
});

//set port environment variable to prepare for deployment
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
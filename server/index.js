const express = require('express');
const app = express();
const gen = require('./database/dataGenerator');
const db = require('./database/index').Calendar;

app.use(express.static('./public'));

app.get('/', (req, res) => console.log('request received'));

// return a random calendar to client
app.get('/cal', (req, resp) => {
  db.find().exec((err, data) => {
    if (err) throw err;
    console.log(data);
  });
});

//set port environment variable to prepare for deployment
const port = process.env.PORT || 3000;

app.listen(port, () => {
  //clear database on server start
  db.remove({}, (err) => console.log('data removed'));
  //generate data
  gen();  
  console.log(`Database seeded. Server running on port ${port}`);
});
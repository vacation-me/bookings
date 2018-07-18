const express = require('express');
const app = express();
const gen = require('./database/dataGenerator');
gen();

app.use(express.static('./public'));

app.get('/', (req, res) => {console.log('request received');})

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server running on port ${port}`);});
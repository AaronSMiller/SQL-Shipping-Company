const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/database')


const app = express();
const PORT = 5050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

// Check database connection
db.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Successfully connected to the database.');
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

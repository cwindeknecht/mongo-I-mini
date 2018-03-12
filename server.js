const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const bearsRouter = require('./bears/BearRouter');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(200).json({ status: 'API Running' });
});

server.use('/bears', bearsRouter);

mongoose
  .connect('mongodb://localhost/BearKeeper')
  .then(conn => {
    console.log('Successfully Connected to MongoDB');
  })
  .catch(err => {
    console.log('Database Connection Failed');
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
app.use(express.json());
const APP = require('./app');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(APP);
app.listen(process.env.PORT || 4000, () => {
  console.log(`Open cart Server is running `);
});
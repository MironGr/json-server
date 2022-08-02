require('dotenv').config()
const express = require('express');


const db = require('./queries')

const app = express()

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

app.get('/users', db.getAll)

app.listen(process.env.PORT, () => {
  console.log(`Ready server on port ${process.env.PORT}`)
})

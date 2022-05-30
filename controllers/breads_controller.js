const express = require('express')
const Bread = require('../models/breads.js')
const breads = express.Router()

// INDEX
breads.get('/', (req, res) => {
  res.send(Bread)
})


// SHOW   using the value put into the query parameter to decide what to display on webpage
breads.get('/:arrayIndex', (req, res) => {
  res.send(Bread[req.params.arrayIndex])
})


module.exports = breads

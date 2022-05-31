// controllers represent the routes
const express = require('express')
const { append } = require('express/lib/response')
const Bread = require('../models/breads.js')
const breads = express.Router()

// INDEX
// breads.get('/', (req, res) => {
//   res.render('index')
  // we are calling index as it it being exported in the index.jsx
// res.send(Bread)
// })

// INDEX
breads.get('/', (req, res) => {
  res.render('Index',
    {
      breads: Bread,
      title: 'Index Page'
    }
  )
// res.send(Bread)
})

// SHOW   using the value put into the query parameter to decide what to display on webpage
breads.get('/:arrayIndex', (req, res) => {
  res.render('Show', {
    bread: Bread[req.params.arrayIndex]
  })
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.render('Show', {
      bread:Bread[req.params.arrayIndex]
    })
  } else {
    res.send('404')
  }
})

module.exports = breads
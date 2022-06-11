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
  Bread.find()
      .then(foundBreads => {
          res.render('index', {
              breads: foundBreads,
              title: 'Index Page'
          })
      })
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})


// SHOW   using the value put into the query parameter to decide what to display on webpage
// breads.get('/:arrayIndex', (req, res) => {
//   res.render('Show', {
//     bread: Bread[req.params.arrayIndex]
//   })
// })

// had the above code for the show route uncommented and when the new show route was pasted in, it caused a cannot read properties of undefined (reading 'name')

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .then(foundBread => {
          res.render('show', {
              bread: foundBread
          })
      })
})



// CREATE
breads.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

module.exports = breads
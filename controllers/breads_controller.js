// controllers represent the routes
const express = require("express");
const { append } = require("express/lib/response");
const Bread = require("../models/breads.js");
const breads = express.Router();
const Baker = require('../models/baker.js')

// INDEX
// breads.get('/', (req, res) => {
//   res.render('index')
// we are calling index as it it being exported in the index.jsx
// res.send(Bread)
// })

// Index:
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean() 
  const foundBreads = await Bread.find().limit(2).lean() 
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})


// NEW
breads.get('/new', (req, res) => {
  Baker.find()
      .then(foundBakers => {
          res.render('new', {
              bakers: foundBakers
          })
    })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
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
      .populate('baker')
      .then((foundBread) => {
        res.render('show', {
            bread: foundBread
        })
      })
      .catch(err => {
        res.send('404')
      })
})


// CREATE
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.create(req.body);
  res.redirect("/breads");
});

// UPDATE
breads.put("/:id", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedBread) => {
      console.log(updatedBread);
      res.redirect(`/breads/${req.params.id}`);
    }
  );
});

// DELETE
breads.delete("/:id", (req, res) => {
  Bread.findByIdAndDelete(req.params.id).then((deletedBread) => {
    res.status(303).redirect("/breads");
  });
});

module.exports = breads;

const express = require('express')
const actionDB = require('./actionModel.js')
const router = express.Router()

router.get('/', (req, res) => {
     actionDB.get()
     .then(actions => {
          res.status(200).json(actions)
     })
})


router.get('/:id', (req, res) => {
     actionDB.get(req.params.id)
     .then(action => {
          res.status(200).json(action)
     })
})



router.delete('/:id', (req, res) => {
     actionDB.remove(req.params.id)
     .then(deleted => {
          res.status(200).json(deleted)
     })
})

router.put('/:id', (req, res) => {
     actionDB.update(req.params.id, req.body)
          .then(updateAction => {
               res.status(200).json(updateAction)
          })
})








module.exports = router;
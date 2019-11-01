const express = require('express')
const actionDB = require('./actionModel.js')
const router = express.Router()

router.get('/', (req, res) => {
     actionDB.get()
     .then(actions => {
          res.status(200).json(actions)
     })
})















module.exports = router;
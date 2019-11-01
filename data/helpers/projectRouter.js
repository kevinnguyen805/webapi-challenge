const express = require('express')
const db = require('./projectModel.js')
const router = express.Router()

// TODO : GET ALL PROJECTS
router.get('/', (req,res) => {
     db.get()
     .then(project => {
          res.status(200).json(project)
     })
})


// TODO : GET PROJECT BY ID
router.get('/:id',(req,res) => {
     db.get(req.params.id)
     .then(project => {
          res.status(200).json(project)
     })
})


// TODO : GET ACTIONS BY PROJECT ID
router.get('/:id/action',(req,res) => {
     db.getProjectActions(req.params.id)
     .then(actions => {
          res.status(200).json(actions)
     })
})




// TODO: POST NEW PROJET





// TODO : POST NEW ACTION BY USER ID 







// TODO: DELETE USER PROJECT





// TODO: UPDATE USER PROJECT 













module.exports = router
const express = require('express')
const actionDB = require('./actionModel.js')
const router = express.Router()

// TODO GET all actions
router.get('/', (req, res) => {
     actionDB.get()
     .then(actions => {
          res.status(200).json(actions)
     })
     .catch(error => {
          res.status(500).json({message: "Action data was unsuccessfully retrieved"})
     })
})


// TODO GET action by id
router.get('/:id', validateActionId, (req, res) => {
     actionDB.get(req.params.id)
     .then(action => {
          res.status(200).json(action)
     })
     .catch(error => {
          res.status(500).json({message: "Action ID does not exist"})
     })
})


// TODO DELETE action by id
router.delete('/:id', validateActionId, (req, res) => {
     actionDB.remove(req.params.id)
     .then(deleted => {
          if(deleted > 0){
               res.status(200).json(deleted)
          } else{
               res.status(404).json({message: "Action failed to delete"})
          }
     })
     .catch(error => {
          res.status(500).json({message: "Action failed to delete"})
     })
})


// TODO UPDATE action by id
router.put('/:id', validateActionId, (req, res) => {
     actionDB.update(req.params.id, req.body)
     .then(updateAction => {
          if(updatedAction > 0){
               res.status(200).json(updateAction)
          } else {
               res.status(404).json({ message: "Action failed to update" })
          }
     })
     .catch(error => {
          res.status(500).json({message: "Action failed to update"})
     })
})


// Middleware 
// TODO ACTION ID AUTHENTICATOR
function validateActionId(req,res,next){
     const id = req.params.id  

     actionDB.get(id)
     .then(action => {
          if(action){
               next();
          } else {
               res.status(404).json({message: "Action ID is not valid"})
          }
     })
     .catch(error => {
          res.status(500).json({message: "Action ID does not exist"})
     })
}

module.exports = router;
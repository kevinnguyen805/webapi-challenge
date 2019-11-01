const express = require('express')
const db = require('./projectModel.js')
const actionDB = require('./actionModel.js')
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



// TODO: POST NEW PROJECT
     // * requires name - description - completed 
router.post('/', (req,res) => {
     const project = {...req.body, completed: false}

     db.insert(project)
     .then(newProject => {
          res.status(200).json(newProject)
     })
})




// TODO : POST NEW ACTION BY PROJECT ID 
     // * requires notes + description - completed 
router.post('/:id/action', (req, res) => {
     const id = req.params.id 
     const action = {...req.body, project_id: id, completed: false}

     db.get(id)
     .then(project => {
          if(project){
               actionDB.insert(action)
               .then(action => {
                    res.status(200).json(action)
               })
               .catch(error => {
                    res.status(500).json({message: "New action failed to post"})
               })
          } else{
               res.status(404).json({message: "Project with ID not found"})
          }
     })
     .catch(error => {
          res.status(500).json({message: "Project with ID does not exist"})
     })
   

})






// TODO: DELETE USER PROJECT





// TODO: UPDATE USER PROJECT 








// MIDDLEWARE 







module.exports = router
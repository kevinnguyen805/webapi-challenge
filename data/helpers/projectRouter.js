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
     .catch(error => {
          res.status(500).json({message: "Failed to retrieve project data"})
     })
})


// TODO : GET PROJECT BY ID
router.get('/:id', validateProjectId, (req,res) => {
     db.get(req.params.id)
     .then(project => {
          res.status(200).json(project)
     })
     .catch(error => {
          res.status(500).json({message: "Project ID does not exist"})
     })
})


// TODO : GET ACTIONS BY PROJECT ID
router.get('/:id/action',(req,res) => {
     db.getProjectActions(req.params.id)
     .then(actions => {
          res.status(200).json(actions)
     })
     .catch(error => {
          res.status(500).json({message: "Project ID does not exist"})
     })
})



// TODO: POST NEW PROJECT
router.post('/', validateNewProject, (req,res) => {
     const project = {...req.body, completed: false}

     db.insert(project)
     .then(newProject => {
          res.status(200).json(newProject)
     })
     .catch(error => {
          res.status(500).json({message: "Failed to post new project"})
     })
})



// TODO : POST NEW ACTION BY PROJECT ID 
router.post('/:id/action', validateNewAction, (req, res) => {
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
     // * returns # of deleted items
router.delete('/:id', validateProjectId, (req, res)=> {
     db.remove(req.params.id)
     .then(deleted => {
          if(deleted > 0){
               res.status(200).json(deleted)
          } else {
               res.status(500).json({message : "Project failed to delete"})
          }
     })
     .catch(error => {
          res.status(500).json({message: "Project failed to delete"})
     })
})


// TODO: UPDATE USER PROJECT 
router.put('/:id', validateProjectId, (req, res)=> {
     db.update(req.params.id, req.body)
     .then(newPost => {
          if(newPost){
               res.status(200).json(newPost)
          } else {
               res.status(500).json({ message: "Project update invalid" })
          }
     })
     .catch(error => {
          res.status(500).json({message: "Project failed to update"})
     })
})




// MIDDLEWARE 
// TODO POST project authenticator
     // * requires name - description - completed 
function validateNewProject(req, res, next){
     const project = req.body
     if(project){
          if(project.name && project.description){
               next();
          } else {
               res.status(404).json({message: "Post name or description is missing"})
          }
     } else {
          res.status(404).json({message: "Post content not valid"})
     }
}



// TODO POST action authenticator
     // * requires notes + description - completed 
function validateNewAction(req, res, next){
     const action = req.body
     if(action){
          if (action.notes && action.description){
               next();
          } else {
               res.status(404).json({message: "Action notes or description is missing"})
          }
     } else {
          res.status(404).json({message: "Action content not valid"})
     }
}



// TODO Project id authenticator
function validateProjectId(req, res, next){
     const id = req.params.id 

     db.get(id)
     .then(project => {
          if(project){
               next();
          } else {
               res.status(404).json({message: "Invalid project ID"})
          }
     })
     .catch(error => {
          res.status(500).json({message: "Project ID does not exist"})
     })
}

module.exports = router
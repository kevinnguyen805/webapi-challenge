const express = require('express')
const helmet = require('helmet')
const projectRouter = require('./data/helpers/projectRouter.js')
const server = express()



// Middleware






// Middleware <---> Server
server.use(helmet())
server.use(express.json())
server.use('/api/project', projectRouter)

server.get('/', (req, res) => {
     res.send(`<h2> Hello! You're at the root </h2>`)
})

module.exports = server;
const express = require('express')
const route = express.Router()
const containerController = require('../../app/controllers/container')


route.get('/find', containerController.get)
route.post('/create', containerController.create)
route.put('/update', containerController.update)
route.delete('/delete', containerController.delete)

module.exports = route
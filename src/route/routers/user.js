const express = require('express')
const route = express.Router()
const userController = require('../../app/controllers/user')


route.get('/find', userController.get)
route.put('/update', userController.update)
route.delete('/delete', userController.delete)

module.exports = route
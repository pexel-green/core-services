const express = require('express')
const route = express.Router()
const blobController = require('../../app/controllers/blob')


route.post('/', blobController.find)
route.post('/create', blobController.create)
route.put('/update', blobController.update)
route.delete('/delete', blobController.delete)

module.exports = route
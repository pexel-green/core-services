const express = require('express')
const route = express.Router()
const containerTypeController = require('../../app/controllers/containerType')


route.get('/', containerTypeController.get)
route.post('/create', containerTypeController.create)
route.put('/update', containerTypeController.update)
route.delete('/delete', containerTypeController.delete)

module.exports = route
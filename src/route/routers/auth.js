const express = require('express')
const route = express.Router()
const authController = require('../../app/controllers/auth')


route.post('/login', authController.login)
route.post('/register', authController.register)
route.post('/verify', authController.verifyToken)
route.post('/activate', authController.activateAccount)



module.exports = route
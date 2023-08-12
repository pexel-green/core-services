const prisma = require("../../../prisma/index")
const responseHandler = require("../../app/utils/responseHandler")
class UserController {
    get(req, res) {
        prisma.user.findUnique(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }

    create(req, res) {
        prisma.user.create(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }

    update(req, res) {
        prisma.user.update(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }

    delete(req, res) {
        prisma.user.delete(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }
}

module.exports = new UserController();
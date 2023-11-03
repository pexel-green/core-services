const prisma = require("../../../prisma")
const responseHandler = require("../../app/utils/responseHandler")
class UserController {
    get(req, res) {
        prisma.user.findUnique({
            where: req.query
        })
            .then(result => {
                responseHandler.success(res, 200, result)
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
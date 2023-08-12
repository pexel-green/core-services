const prisma = require("../../../prisma/index")
const responseHandler = require("../../app/utils/responseHandler")
class ContainerController {
    get(req, res) {
        prisma.container.findUnique(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }

    create(req, res) {
        prisma.container.create(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }

    update(req, res) {
        prisma.container.update(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }

    delete(req, res) {
        prisma.container.delete(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }
}

module.exports = new ContainerController();
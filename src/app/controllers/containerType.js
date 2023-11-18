const prisma = require("../../../prisma/index")
const responseHandler = require("../utils/responseHandler")

class ContainerTypeController {
    get(req, res) {
        prisma.containerType.findUnique(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error(res, 500, err)
            })
    }

    create(req, res) {
        prisma.containerType.create(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error(res, 500, err)
            })
    }

    update(req, res) {
        prisma.containerType.update(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error(res, 500, err)
            })
    }

    delete(req, res) {
        prisma.containerType.delete(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error(res, 500, err)
            })
    }
}

module.exports = new ContainerTypeController();
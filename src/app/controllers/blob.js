const prisma = require("../../../prisma/index")
const responseHandler = require("../../app/utils/responseHandler")
class BlobController {
    get(req, res) {
        prisma.blob.findUnique(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }

    create(req, res) {
        prisma.blob.create(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }

    update(req, res) {
        prisma.blob.update(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }

    delete(req, res) {
        prisma.blob.delete(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error()
            })
    }
}

module.exports = new BlobController();
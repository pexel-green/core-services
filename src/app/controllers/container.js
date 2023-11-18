const prisma = require("../../../prisma/index")
const responseHandler = require("../../app/utils/responseHandler")
class ContainerController {
    get(req, res) {
        prisma.container.findFirst({
            where: req.query,
            select: {
                User: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
            .then(data => {
                console.log({ data })
                responseHandler.success(res, 200, data)
            }).catch(err => {
                responseHandler.error(res, 500, err)
            })
    }

    create(req, res) {
        prisma.container.create(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error(res, 500, err)
            })
    }

    update(req, res) {
        prisma.container.update(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error(res, 500, err)
            })
    }

    delete(req, res) {
        prisma.container.delete(req.body)
            .then(result => {
                responseHandler.success()
            }).catch(err => {
                responseHandler.error(res, 500, err)
            })
    }
}

module.exports = new ContainerController();
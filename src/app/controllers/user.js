const prisma = require("../../../prisma")
const responseHandler = require("../../app/utils/responseHandler")
class UserController {
    get(req, res) {
        prisma.user.findUnique({
            where: req.query,
            select: {
                id: true,
                name: true,
                email: true,
                type: true,
                containers: {
                    select: {
                        name: true
                    }
                }
            }
        })
            .then(data => {
                if (data) {
                    responseHandler.success(res, 200, { ...data, container: data.containers[0].name })
                } else {
                    responseHandler.error(res, 403, null)
                }
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
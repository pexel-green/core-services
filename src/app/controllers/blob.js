const prisma = require("../../../prisma/index")
const responseHandler = require("../../app/utils/responseHandler")
class BlobController {
    find(req, res) {
        prisma.blob.findMany({
            select: {
                id: true,
                name: true,
                Container: {
                    select: {
                        name: true
                    }
                }
            },
            ...req.body,
        })
            .then(data => {
                return responseHandler.success(res, 200, {
                    message: "",
                    data: data.map(({ id, name, Container }) => ({
                        id,
                        imagePath: `photos/${Container.name}/${name}`
                    }))
                }, {})
            }).catch(err => {
                responseHandler.error()
            })
    }

    create(req, res) {
        prisma.blob.create(req.body)
            .then(data => {
                return responseHandler.success(res, 201, data, {})
            }).catch(err => {
                responseHandler.error(res, 500, err)
            })
    }

    update(req, res) {
        prisma.blob.update(req.body)
            .then(data => {
                return responseHandler.success(res, 200, {
                    message: "",
                    data
                }, {})
            }).catch(err => {
                responseHandler.error()
            })
    }

    delete(req, res) {
        prisma.blob.delete(req.body)
            .then(data => {
                return responseHandler.success(res, 200, {
                    message: "",
                    data
                }, {})
            }).catch(err => {
                responseHandler.error()
            })
    }
}

module.exports = new BlobController();
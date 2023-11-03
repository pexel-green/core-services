
const prisma = require("../../../prisma")
const responseHandler = require("../../app/utils/responseHandler")
const jwtService = require('../services/jwtService');



class AuthController {
    login(req, res) {
        prisma.user.findUnique(req.body)
            .then(result => {
                const token = jwtService.generateAccessToken(result);
                responseHandler.success(res, 200, { token })
            }).catch(err => {
                responseHandler.error(res, 500, {})
            })
    }

    register(req, res) {
        prisma.user.create(req.body)
            .then(result => {
                responseHandler.success(res, 201, result)
            }).catch(err => {
                console.log({ err })
                responseHandler.error(res, 500, {})
            })
    }


    verifyToken(req, res) {
        const data = jwtService.verifyToken(req.body.token);
        data ? responseHandler.success(res, 201, data) : responseHandler.error(res, 403, {})
    }

}

module.exports = new AuthController();
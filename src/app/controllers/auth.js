
const prisma = require("../../../prisma")
const responseHandler = require("../../app/utils/responseHandler")
const jwtService = require('../services/jwtService');
const sendMail = require('../services/mailService');



class AuthController {
    login(req, res) {
        prisma.user.findUnique(req.body)
            .then(result => {
                if (req.type === 1) {
                    responseHandler.error(res, 500, {
                        message: "Account not activate. Try to register again"
                    })
                } else {
                    const token = jwtService.generateAccessToken(result);
                    responseHandler.success(res, 200, { token })
                }
            }).catch(err => {
                responseHandler.error(res, 500, {})
            })
    }

    async register(req, res) {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.data.email
            }
        })
        console.log({ user })

        if (!!user) {
            if (user.type === 0) {
                return prisma.user.update({
                    where: {
                        email: user.email
                    },
                    data: {
                        password: req.body.data.password
                    }
                })
                    .then(result => {
                        const token = jwtService.generateAccessToken(result);
                        sendMail("phamcaosang135@gmail.com", token)
                        responseHandler.success(res, 201, result)
                    }).catch(err => {
                        console.log({ err })
                        responseHandler.error(res, 500, {})
                    })
            }
            return responseHandler.error(res, 500, {
                message: "Email exists"
            })
        } else {
            prisma.user.create(req.body)
                .then(result => {
                    const token = jwtService.generateAccessToken(result);
                    sendMail("phamcaosang135@gmail.com", token)
                    responseHandler.success(res, 201, result)
                }).catch(err => {
                    console.log({ err })
                    responseHandler.error(res, 500, {})
                })
        }
    }


    verifyToken(req, res) {
        const data = jwtService.verifyToken(req.body.token);
        data ? responseHandler.success(res, 201, data) : responseHandler.error(res, 403, {})
    }

    activateAccount(req, res) {
        const data = jwtService.verifyToken(req.body.token);
        if (data) {
            return prisma.user.update({
                where: {
                    email: data.email
                },
                data: {
                    type: 1
                }
            }).then(() => {
                responseHandler.success(res, 201, {})
            }).catch(err => {
                console.log({ err })
                responseHandler.error(res, 500, {})
            })
        }
        return responseHandler.error(res, 500, {})
    }

}

module.exports = new AuthController();
const { default: axios } = require("axios")
const prisma = require("../../../prisma/index")
const responseHandler = require("../../app/utils/responseHandler")
const { deleteDocument } = require("../services/cosmosService")
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
                responseHandler.error(res, 500, err)
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
                responseHandler.error(res, 500, err)
            })
    }

    delete(req, res) {
        prisma.blob.delete({
            ...req.body, select: {
                id: true,
                name: true,
                Container: {
                    select: {
                        name: true
                    }
                }
            }
        })
            .then(async (data) => {

                try {
                    const deletedDocument = await deleteDocument(req.query.documentId);
                    console.log("Document deleted:", deletedDocument);

                    const response = await axios.delete(`https://pexelblobstorage.blob.core.windows.net/photos/${data.Container.name}/${data.name}${process.env.SASTOKENBLOB}`);
                    if (response.status === 204) {
                        console.log('Blob Image deleted successfully.');
                    } else {
                        console.log('Failed to delete the Blob image.');
                    }

                } catch (error) {
                    console.error('An error occurred while deleting the image:', error);
                    return responseHandler.success(res, 500, {
                        message: "",
                        error
                    }, {})
                }

                return responseHandler.success(res, 200, {
                    message: "",
                    data
                }, {})
            }).catch(err => {
                responseHandler.error(res, 500, err)
            })
    }
}

module.exports = new BlobController();
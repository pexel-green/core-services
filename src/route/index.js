const userRoute = require('./routers/user')
const containerTypeRoute = require("./routers/containerType")
const containerRoute = require('./routers/container')
const blobRoute = require('./routers/blob')


module.exports = (app) => {
    app.use('/api/user', userRoute)
    app.use('/api/containertype', containerTypeRoute)
    app.use('/api/user', containerRoute)
    app.use('/api/user', blobRoute)
}
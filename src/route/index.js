const userRoute = require('./routers/user')
const containerTypeRoute = require("./routers/containerType")
const containerRoute = require('./routers/container')
const blobRoute = require('./routers/blob')
const authRoute = require('./routers/auth')


module.exports = (app) => {
    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    app.use('/api/containertype', containerTypeRoute)
    app.use('/api/container', containerRoute)
    app.use('/api/blob', blobRoute)
}
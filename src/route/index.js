const userRoute = require('./routers/user')

module.exports = (app) => {
    app.use('/api/user', userRoute)
}
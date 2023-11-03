const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const CacheService = require('./src/app/services/cacheService');
const app = express();
const route = require('./src/route/index')
const cacheService = new CacheService();
app.use(express.json());
app.use(cors());
dotenv.config()
route(app)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Listening on PORT:", process.env.PORT || 3000);
});


module.exports = {
    cacheService
};
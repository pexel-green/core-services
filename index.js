const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const app = express();
const route = require('./src/routes/index')

app.use(express.json());
app.use(cors());
dotenv.config()
route(app)

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", process.env.PORT || 3000);
});
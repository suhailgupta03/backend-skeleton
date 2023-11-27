const express = require('express');
const initExpressRoutes = require('./routes');
const {logger} = require("./logger");

const app = express();
initExpressRoutes(app);

app.listen(3000, () => {
    logger.info("Server is listening on port 3000");
})
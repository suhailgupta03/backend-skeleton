/**
 * This file initializes the whole application.
 * 
 * For any initialization code, this is the place to put it.
 */

/**
 * https://expressjs.com/
 */
const express = require('express');
const initExpressRoutes = require('./routes');
const {logger} = require("./logger");
const {createDatabaseConnection} = require("./db-connection");

const uri = process.env.MONGODB_URI;
const port = process.env.SERVER_PORT;

async function init() {
    if(!uri) {
        throw new Error("MONGODB_URI environment variable is not set!");
    }

    if(!port) {
        throw new Error("SERVER_PORT environment variable is not set!");
    }
    const client = await createDatabaseConnection(uri, logger);
    const app = express();
    initExpressRoutes(app, client, logger);
    app.listen(port, () => {
        logger.info(`Server is listening on port ${port}`);
    })
}

init()
    .catch(err => {
        logger.error("Error while initializing application: ", err);
    })

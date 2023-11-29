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


async function init() {
    if(!uri) {
        throw new Error("MONGODB_URI environment variable is not set!");
    }
    const client = await createDatabaseConnection(uri, logger);
    const app = express();
    initExpressRoutes(app, client, logger);
    app.listen(3000, () => {
        logger.info("Server is listening on port 3000");
    })
}

init()
    .catch(err => {
        logger.error("Error while initializing application: ", err);
    })

const { MongoClient, ServerApiVersion } = require('mongodb');

async function createDatabaseConnection(mongoDatabaseURL, logger) {
    try {
        logger.info("Attempting to connect to database...")
        /**
         * The following line creates a new MongoClient,
         * which will later be used to connect to a MongoDB server.
         */
        const client = new MongoClient(mongoDatabaseURL, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
          /**
           * The following line connects to the MongoDB server
           */
          await client.connect();
          logger.info("Connection to database established successfully!");
          return client;
    }catch(err) {
        logger.error("Error while connecting to database: ", err);
    }
}

module.exports = {
    createDatabaseConnection
}
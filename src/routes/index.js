const { pingController } = require("../controllers/ping-controller");
const { busCreateController } = require("../controllers/bus-controller");
const bodyParser = require("body-parser");

function initExpressRoutes(app, client, logger) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    /**
     * The following line attaches the MongoDB client to the request object.
     */
    req.client = client;
    req.logger = logger;
    next();
  });

  /**
   * Reference: https://expressjs.com/en/guide/routing.html
   */
  app.get("/ping", pingController);
  app.post("/bus", busCreateController);
  // Add more routes here
}

module.exports = initExpressRoutes;

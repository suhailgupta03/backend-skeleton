const {pingController} = require("../controllers/ping-controller");

function initExpressRoutes(app) {
    /**
     * Reference: https://expressjs.com/en/guide/routing.html 
     */
    app.get("/ping", pingController);
    // Add more routes here
}

module.exports = initExpressRoutes;
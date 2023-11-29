const Bus = require("../data-controllers/Bus");

async function busCreateController(req, resp, next) {
    /**
     * The following line is just an example
     */

    req.logger.info(req.body);
    /**
     * Initalize the Bus data controller
     * and call the createBus method
     */
    const bus = new Bus(req.client);
    const createResponse = await bus.createBus(req.body);
    resp.json({
        message: "Bus created successfully",
        created: createResponse
    });
};

module.exports = {busCreateController}
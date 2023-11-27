function pingController(req, resp, next) {
    resp.json({
        message: "pong"
    })
};

module.exports = {pingController}
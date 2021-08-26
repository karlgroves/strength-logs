/**
 * GET routing.
 */

const defaultResponses = require('../lib/defaultResponses.json');

module.exports = function (app) {

    /**
     * Requires a "thing" for all gets
     */
    app.get('*', async (req, res) => {
        log.info(new Date(), req.method, req.url, req.body);
        defaultResponses.bad_request.info = 'Invalid Route Supplied for GET request';
        res.status(400).json(defaultResponses.bad_request);
    });
};

/**
 * PUT routing
 */

const defaultResponses = require('../lib/defaultResponses.json');
const utils = require('../lib/util');

module.exports = function (app) {

    /**
     * Processes an Update
     */
    app.put('/:thing/:id', function (req, res) {
        log.info(new Date(), req.method, req.url);
        log.info(req.params);

        // UPDATE :thing SET [data] WHERE [id]=:id
    });

    /**
     * Requires a "thing" for all posts
     */
    app.put('*', async (req, res) => {
        log.info(new Date(), req.method, req.url, req.body);
        defaultResponses.bad_request.info = 'Invalid Route Supplied for PUT request';
        res.status(400).json(defaultResponses.bad_request);
    });
};

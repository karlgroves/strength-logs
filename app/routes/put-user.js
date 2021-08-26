/**
 * PUT routing
 */

const defaultResponses = require('../lib/defaultResponses.json');
const dbService = require('../lib/dbService');
const dbConn = dbService.db();

const utils = require('../lib/util');

module.exports = function (app) {

    /**
     * Processes an Update
     */
    app.put('/users/:id', function (req, res) {
        log.info(new Date(), req.method, req.url);
        log.info(req.params);

        //@TODO check to see if the thing exists in the first place

        // UPDATE :thing SET [data] WHERE [id]=:id

    });
};

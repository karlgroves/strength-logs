/**
 * POST routing
 */

const validator = require('validator');
const defaultResponses = require('../lib/defaultResponses.json');
const dbService = require('../lib/dbService');
let dbConn = dbService.db();
const utils = require('../lib/util');

module.exports = function (app) {

    /**
     * Posts a new request to the login
     */
    app.post('/login/', async (req, res) => {
        let valid = true;

        log.info(new Date(), req.method, req.url, req.body);
        if (typeof req.body !== 'object') {
            defaultResponses.bad_request.info = 'request body is malformed';
            res.status(400).json(defaultResponses.bad_request);
        }
        else {
            // Query, SELECT userID FROM users WHERE userEmail='' AND userPassword='' LIMIT 1
        }

    });
};

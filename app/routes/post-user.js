/**
 * POST routing
 */

const validator = require('validator');

const defaultResponses = require('../lib/defaultResponses.json');
const dbService = require('../lib/dbService');
const dbConn = dbService.db();
const utils = require('../lib/util');

module.exports = function (app) {

    /**
     * Posts a new request
     */
    app.post('/users/', async (req, res) => {
        let valid = true;
        let msg = '';

        log.info(new Date(), req.method, req.url, req.body);
        if (typeof req.body !== 'object') {
            defaultResponses.bad_request.info = 'request body is malformed';
            return res.status(400).json(defaultResponses.bad_request);
        }

        //@TODO only Admin users can access this route

        if (validator.isEmail(req.body.userEmail) === false) {
            valid = false;
            msg += 'Supplied email is invalid';
        }
        if (validator.isEmpty(req.body.userPassword)) {
            valid = false;
            msg += 'Supplied password is invalid';
        }

        //@TODO user should not already exist
    });

};
